import { O as ensure_array_like, N as head, G as attr, P as escape_html, M as stringify, Q as bind_props, E as pop, C as push } from "../../../chunks/index.js";
import { b as base } from "../../../chunks/paths.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  const each_array = ensure_array_like(data.posts);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Blog - vonshlovens</title>`;
    $$payload2.out += `<meta name="description" content="Thoughts on LLMs, health tech, biomechanics, and competitive sprinting"/>`;
  });
  $$payload.out += `<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Blog</h1> <p class="text-xl text-gray-600 dark:text-gray-400">Thoughts on AI, health tech, and the pursuit of speed 🏃‍♂️</p></div> <div class="space-y-8"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let post = each_array[$$index_1];
    const each_array_1 = ensure_array_like(post.tags);
    $$payload.out += `<article class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"><div class="p-6"><div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3"><time${attr("datetime", post.date)}>${escape_html(new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }))}</time> <span class="mx-2">•</span> <span>${escape_html(post.readTime)}</span></div> <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-3"><a${attr("href", `${stringify(base)}/blog/${stringify(post.slug)}`)} class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">${escape_html(post.title)}</a></h2> <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">${escape_html(post.excerpt)}</p> <div class="flex items-center justify-between"><div class="flex flex-wrap gap-2"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let tag = each_array_1[$$index];
      $$payload.out += `<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">${escape_html(tag)}</span>`;
    }
    $$payload.out += `<!--]--></div> <a${attr("href", `/blog/${stringify(post.slug)}`)} class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">Read more →</a></div></div></article>`;
  }
  $$payload.out += `<!--]--> `;
  if (data.posts.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center py-12"><div class="text-6xl mb-4">📝</div> <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">No posts yet</h2> <p class="text-gray-600 dark:text-gray-400">I'm working on some exciting content. Check back soon!</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
