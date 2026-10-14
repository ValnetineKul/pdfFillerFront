import { Plugin } from "vite";

//#region src/vite-plugin/index.d.ts
type FrontIconsPluginOptions = {
  /** Папка с SVG-файлами и `manifest.json`. По умолчанию — `icons/` из npm-пакета. */iconsDir?: string; /** Путь к `manifest.json`, если он лежит не в `iconsDir`. */
  manifestPath?: string; /** Имя папки в prod-сборке. По умолчанию `icons`. */
  assetsDir?: string;
};
declare const frontIconsPlugin: (options?: FrontIconsPluginOptions) => Plugin;
declare const plugin: (options?: FrontIconsPluginOptions) => Plugin;
//#endregion
export { FrontIconsPluginOptions, frontIconsPlugin, plugin };