import { O as ensure_array_like, N as head, P as escape_html, G as attr, M as stringify, Q as bind_props, E as pop, C as push } from "../../../../chunks/index.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  const { post } = data;
  const each_array = ensure_array_like(post.tags);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(post.title)} - vonshlovens</title>`;
    $$payload2.out += `<meta name="description"${attr("content", post.excerpt)}/>`;
  });
  $$payload.out += `<article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><header class="mb-12"><div class="text-center"><h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">${escape_html(post.title)}</h1> <div class="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-6"><time${attr("datetime", post.date)}>${escape_html(new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }))}</time> <span class="mx-3">•</span> <span>${escape_html(post.readTime)}</span></div> <div class="flex flex-wrap justify-center gap-2 mb-8"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tag = each_array[$$index];
    $$payload.out += `<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">${escape_html(tag)}</span>`;
  }
  $$payload.out += `<!--]--></div></div></header> <div class="prose prose-lg prose-blue dark:prose-invert max-w-none">${html(post.content.replace(/\n/g, "<br>").replace(/### /g, "<h3>").replace(/## /g, "<h2>").replace(/# /g, "<h1>"))}</div> <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"><div class="flex justify-between items-center"><a href="/blog" class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Back to Blog</a> <div class="flex items-center space-x-4"><span class="text-gray-600 dark:text-gray-400 text-sm">Share:</span> <a${attr("href", `https://twitter.com/intent/tweet?text=${stringify(encodeURIComponent(post.title))}&url=${stringify(encodeURIComponent(`https://vonshlovens.github.io/vonshlovens/blog/${post.slug}`))}`)} target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Share on Twitter"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a></div></div></footer></article>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
