import{b as C,c as E,f as z,a as _}from"../chunks/D1NJyj1o.js";import"../chunks/DNOMOTc6.js";import{t as w,h as B,d as S,a3 as $,ax as q,n as D,af as O,au as U,at as W,i as F,Z as x,p as N,a as Y,s as u,q as G,c as a,$ as K,r as t,u as V}from"../chunks/GTAaRy6U.js";import{s as b}from"../chunks/Bu-B3FWD.js";import{e as Z,i as J}from"../chunks/CKU6TQh2.js";import{h as Q}from"../chunks/Bw1bz6lE.js";import{s as k}from"../chunks/BAowp6la.js";import{i as X}from"../chunks/Bos9rtOf.js";import{p as ee}from"../chunks/u2N9GlbM.js";function te(m,l,n=!1,e=!1,v=!1){var d=m,c="";w(()=>{var s=$;if(c===(c=l()??"")){B&&S();return}if(s.nodes_start!==null&&(q(s.nodes_start,s.nodes_end),s.nodes_start=s.nodes_end=null),c!==""){if(B){D.data;for(var r=S(),p=r;r!==null&&(r.nodeType!==8||r.data!=="");)p=r,r=O(r);if(r===null)throw U(),W;C(D,p),d=F(r);return}var o=c+"";n?o=`<svg>${o}</svg>`:e&&(o=`<math>${o}</math>`);var i=E(o);if((n||e)&&(i=x(i)),C(x(i),i.lastChild),n||e)for(;x(i);)d.before(x(i));else d.before(i)}})}const ae=[{slug:"welcome-to-my-blog",title:"Welcome to My Blog!",excerpt:"Starting this journey to share thoughts on AI, health tech, and competitive sprinting. Here's what you can expect.",content:`# Welcome to My Blog!

I'm excited to launch this blog where I'll be sharing my thoughts and experiences at the intersection of technology, health, and athletics.

## What You Can Expect

### 🤖 AI & Technology
- Deep dives into Large Language Models
- Azure workflows and cloud architecture
- DevOps best practices
- Homelab adventures

### 🏃‍♂️ Health & Performance
- Biomechanics insights from competitive sprinting
- Training optimization using data
- The psychology of peak performance

### 🔬 The Intersection
- How AI can revolutionize health and fitness
- Data-driven approaches to athletic performance
- Building tools that matter

Stay tuned for more content, and feel free to reach out if you have questions or want to collaborate!`,date:"2025-01-15",readTime:"3 min read",tags:["introduction","AI","health","sprinting"],published:!0},{slug:"llm-workflows-azure",title:"Building LLM-Powered Workflows in Azure",excerpt:"How I'm connecting real-world field data with interactive maps using Azure services and Large Language Models.",content:`# Building LLM-Powered Workflows in Azure

At work, I've been deep in the trenches building LLM-powered workflows that connect real-world field data with interactive mapping solutions. Here's what I've learned.

## The Challenge

Traditional data processing pipelines often struggle with:
- Unstructured field data
- Complex spatial relationships
- Real-time processing requirements
- User-friendly visualization

## The Solution

Using Azure's suite of AI services, we've built a system that:

### 1. Data Ingestion
- Azure Functions for real-time data processing
- Cosmos DB for flexible document storage
- Event Grid for reliable messaging

### 2. LLM Processing
- Azure OpenAI for text analysis and structuring
- Custom prompts for domain-specific extraction
- Function calling for structured outputs

### 3. Visualization
- Azure Maps for interactive visualization
- Power BI for dashboards
- Custom web apps for specialized views

## Key Learnings

1. **Prompt Engineering is Critical** - The quality of your outputs directly correlates with prompt design
2. **Error Handling** - LLMs can be unpredictable, robust error handling is essential
3. **Cost Management** - Token usage can add up quickly, optimize your prompts
4. **Security** - Always validate and sanitize LLM outputs before using them

## What's Next

I'm excited to explore:
- Multi-modal processing (text + images)
- Real-time streaming analytics
- Edge computing integration

More technical details coming in future posts!`,date:"2025-01-10",readTime:"7 min read",tags:["Azure","LLM","workflows","mapping"],published:!0}],re=async({params:m})=>{const l=ae.find(n=>n.slug===m.slug&&n.published);if(!l)throw new Error("Post not found");return{post:l}},fe=Object.freeze(Object.defineProperty({__proto__:null,load:re},Symbol.toStringTag,{value:"Module"}));var oe=z('<meta name="description"/>'),se=z('<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"> </span>'),ie=z('<article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><header class="mb-12"><div class="text-center"><h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"> </h1> <div class="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-6"><time> </time> <span class="mx-3">•</span> <span> </span></div> <div class="flex flex-wrap justify-center gap-2 mb-8"></div></div></header> <div class="prose prose-lg prose-blue dark:prose-invert max-w-none"><!></div> <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"><div class="flex justify-between items-center"><a href="/blog" class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Back to Blog</a> <div class="flex items-center space-x-4"><span class="text-gray-600 dark:text-gray-400 text-sm">Share:</span> <a target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Share on Twitter"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a></div></div></footer></article>');function ve(m,l){N(l,!1);let n=ee(l,"data",8);const{post:e}=n();X();var v=ie();Q(g=>{var h=oe();w(()=>{K.title=`${e.title??""} - vonshlovens`,k(h,"content",e.excerpt)}),_(g,h)});var d=a(v),c=a(d),s=a(c),r=a(s,!0);t(s);var p=u(s,2),o=a(p),i=a(o,!0);t(o);var L=u(o,4),H=a(L,!0);t(L),t(p);var A=u(p,2);Z(A,5,()=>e.tags,J,(g,h)=>{var f=se(),j=a(f,!0);t(f),w(()=>b(j,V(h))),_(g,f)}),t(A),t(c),t(d);var y=u(d,2),P=a(y);te(P,()=>e.content.replace(/\n/g,"<br>").replace(/### /g,"<h3>").replace(/## /g,"<h2>").replace(/# /g,"<h1>")),t(y);var I=u(y,2),M=a(I),T=u(a(M),2),R=u(a(T),2);t(T),t(M),t(I),t(v),w((g,h,f)=>{b(r,e.title),k(o,"datetime",e.date),b(i,g),b(H,e.readTime),k(R,"href",`https://twitter.com/intent/tweet?text=${h??""}&url=${f??""}`)},[()=>new Date(e.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),()=>encodeURIComponent(e.title),()=>encodeURIComponent(`https://vonshlovens.github.io/vonshlovens/blog/${e.slug}`)],G),_(m,v),Y()}export{ve as component,fe as universal};
