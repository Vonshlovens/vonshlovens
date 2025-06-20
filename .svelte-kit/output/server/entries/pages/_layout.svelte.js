import { F as getContext, G as attr, I as attr_class, J as store_get, K as unsubscribe_stores, E as pop, C as push, M as stringify } from "../../chunks/index.js";
import "../../chunks/client.js";
import { b as base } from "../../chunks/paths.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { children } = $$props;
  $$payload.out += `<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"><nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center"><a${attr("href", `${stringify(base)}/`)} class="text-xl font-bold gradient-text">vonshlovens</a></div> <div class="hidden md:flex items-center space-x-8"><a${attr("href", `${stringify(base)}/`)}${attr_class("text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors", void 0, {
    "text-primary-600": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/",
    "dark:text-primary-400": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/"
  })}>Home</a> <a${attr("href", `${stringify(base)}/blog`)}${attr_class("text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors", void 0, {
    "text-primary-600": store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/blog"),
    "dark:text-primary-400": store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/blog")
  })}>Blog</a> <a${attr("href", `${stringify(base)}/about`)}${attr_class("text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors", void 0, {
    "text-primary-600": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/about",
    "dark:text-primary-400": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/about"
  })}>About</a> <a${attr("href", `${stringify(base)}/contact`)}${attr_class("text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors", void 0, {
    "text-primary-600": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/contact",
    "dark:text-primary-400": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/contact"
  })}>Contact</a></div> <div class="flex items-center space-x-4"><button class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Toggle dark mode">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;
  }
  $$payload.out += `<!--]--></button></div></div></div></nav> <main class="min-h-screen">`;
  children($$payload);
  $$payload.out += `<!----></main> <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex flex-col md:flex-row justify-between items-center"><div class="text-gray-600 dark:text-gray-400 text-sm">© 2025 vonshlovens. Built with Svelte 5 &amp; deployed on GitHub Pages.</div> <div class="flex space-x-6 mt-4 md:mt-0"><a href="mailto:shloov@protonmail.com" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="Email"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg></a> <a href="https://github.com/vonshlovens" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="GitHub"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path></svg></a></div></div></div></footer></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
