import { N as head, E as pop, C as push } from "../../chunks/index.js";
import "../../chunks/client.js";
function _error($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Page Not Found - vonshlovens</title>`;
    $$payload2.out += `<meta name="description" content="Page not found"/>`;
  });
  $$payload.out += `<div class="min-h-screen flex items-center justify-center px-4"><div class="text-center"><h1 class="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1> <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p> <a href="/" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">Go Home</a></div></div>`;
  pop();
}
export {
  _error as default
};
