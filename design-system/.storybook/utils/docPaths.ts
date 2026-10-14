/** Storybook docs story id suffix (without `/docs/` prefix). */
export const docsPaths = {
  gettingStarted: 'gettingstarted--docs',
  introIntroduction: 'intro-introduction--docs',
  introDevelopment: 'intro-development--docs',
  introUsage: 'intro-usage--docs',
  introTheme: 'intro-theme--docs',
  introTesting: 'intro-testing--docs',
  introFaq: 'intro-f-a-q--docs',
  foundationAccessibility: 'foundation-accessibility--docs',
  foundation8pxDesign: 'foundation-8px-design--docs',
  foundationResponsive: 'foundation-resposive--docs',
  foundationDesign: 'foundation-design--docs',
  foundationStructure: 'foundation-structure--docs',
} as const;

function normalizeStorySlug(storyId: string): string {
  return storyId.startsWith('/docs/')
    ? storyId.slice('/docs/'.length)
    : storyId;
}

/** Base pathname of Storybook shell (manager), including trailing slash. */
export function getStorybookBasePath(): string {
  if (typeof window === 'undefined') {
    return '/';
  }

  const { pathname } = (window.top ?? window).location;

  if (pathname.endsWith('/iframe.html') || pathname.endsWith('/index.html')) {
    return pathname.replace(/\/[^/]+$/, '/');
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/**
 * Docs URL for Storybook router.
 * Works in dev (manager + iframe) and on GitLab Pages subpaths.
 */
export function toDocsPath(storyId: string): string {
  const slug = normalizeStorySlug(storyId);
  const base = getStorybookBasePath();

  return `${base}?path=/docs/${slug}`;
}
