import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
//#region package.json
var name = "@front/icons";
//#endregion
//#region src/vite-plugin/index.ts
/**
* Vite-плагин @front/icons
*
* Задачи:
* 1. Dev  — раздавать SVG по URL `/@front-icons/arrows/arrow-left.svg`
* 2. Prod — скопировать SVG в `assets/icons-{hash}/` без хешей в именах файлов
* 3. Оба  — подставить `__FRONT_ICONS_BASE_URL__` через `define` (SSR-safe)
*
* Потребителю достаточно: `frontIconsPlugin()`
*/
/** URL-префикс SVG в dev-режиме */
const DEV_BASE_URL = "/@front-icons";
/** Имя глобала, который Vite подставит в `getIconsBaseUrl()` из `src/icons-base-url.ts` */
const BASE_URL_DEFINE = "__FRONT_ICONS_BASE_URL__";
/** Имя папки в prod: `assets/icons-{hash}/` */
const DEFAULT_ASSETS_DIR = "icons";
/** Имя пакета берём из package.json, чтобы не дублировать его в хуках и ошибках */
const PACKAGE_NAME = name;
/** Плагин лежит в `dist/vite-plugin/index.mjs` → на два уровня вверх корень пакета */
const packageRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
/** Где лежат SVG: переданный путь или `icons/` из пакета */
const resolveIconsDir = (iconsDir) => iconsDir ?? path.join(packageRoot, "svg");
/** Читает manifest.json — в нём hash папки и список всех иконок */
const readManifest = (manifestPath) => {
	if (!existsSync(manifestPath)) throw new Error(`[front-icons] Не найден ${manifestPath}. Запустите pnpm run build в ${PACKAGE_NAME}.`);
	return JSON.parse(readFileSync(manifestPath, "utf-8"));
};
/** Собирает prod-URL: `/assets/icons-b287ba6b` (с учётом `base` приложения) */
const buildProdBaseUrl = (appBase, assetsDir, hash) => {
	const folder = `${assetsDir}-${hash}`;
	const normalizedBase = appBase && appBase !== "/" ? appBase.replace(/\/$/, "") : "";
	return normalizedBase ? `${normalizedBase}/assets/${folder}` : `/assets/${folder}`;
};
/** Чтобы Vite обрабатывал @front/icons при SSR и применил `define` */
const addPackageToNoExternal = (current) => {
	if (current === true) return true;
	if (!current) return [PACKAGE_NAME];
	return [...Array.isArray(current) ? current : [current], PACKAGE_NAME];
};
const frontIconsPlugin = (options = {}) => {
	const assetsDir = options.assetsDir ?? DEFAULT_ASSETS_DIR;
	let iconsDir = "";
	let manifest = null;
	return {
		name: "front-icons",
		config(userConfig, { command }) {
			iconsDir = resolveIconsDir(options.iconsDir);
			manifest = readManifest(options.manifestPath ?? path.join(iconsDir, "manifest.json"));
			const iconsBaseUrl = command === "serve" ? DEV_BASE_URL : buildProdBaseUrl(userConfig.base ?? "/", assetsDir, manifest.hash);
			return {
				define: { [BASE_URL_DEFINE]: JSON.stringify(iconsBaseUrl) },
				ssr: { noExternal: addPackageToNoExternal(userConfig.ssr?.noExternal) }
			};
		},
		configEnvironment(_name, environmentConfig) {
			if (environmentConfig.consumer !== "server") return;
			return { resolve: { noExternal: addPackageToNoExternal(environmentConfig.resolve?.noExternal) } };
		},
		configureServer(server) {
			server.middlewares.use(DEV_BASE_URL, (req, res, next) => {
				const requestPath = req.url?.split("?")[0] ?? "";
				if (!requestPath || requestPath.includes("..")) {
					next();
					return;
				}
				const filePath = path.join(iconsDir, decodeURIComponent(requestPath));
				if (!filePath.startsWith(iconsDir) || !existsSync(filePath)) {
					next();
					return;
				}
				res.setHeader("Content-Type", "image/svg+xml");
				res.setHeader("Cache-Control", "no-cache");
				createReadStream(filePath).pipe(res);
			});
		},
		generateBundle() {
			if (this.environment.config.consumer === "server") return;
			if (!manifest) return;
			const outputFolder = `${assetsDir}-${manifest.hash}`;
			for (const relativePath of new Set(Object.values(manifest.icons))) this.emitFile({
				type: "asset",
				fileName: `assets/${outputFolder}/${relativePath}`,
				source: readFileSync(path.join(iconsDir, relativePath))
			});
		}
	};
};
const plugin = frontIconsPlugin;
//#endregion
export { frontIconsPlugin, plugin };
