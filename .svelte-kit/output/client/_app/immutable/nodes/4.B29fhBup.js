import{f as d,a as n}from"../chunks/D1NJyj1o.js";import"../chunks/DNOMOTc6.js";import{p as O,a as U,$,c as a,s as o,r as e,u as r,t as M,q as R}from"../chunks/GTAaRy6U.js";import{s as l}from"../chunks/Bu-B3FWD.js";import{i as F}from"../chunks/4BcCmbNE.js";import{e as T,i as B}from"../chunks/CKU6TQh2.js";import{h as N}from"../chunks/Bw1bz6lE.js";import{s as w}from"../chunks/BAowp6la.js";import{i as G}from"../chunks/Bos9rtOf.js";import{p as K}from"../chunks/u2N9GlbM.js";import{b as V}from"../chunks/D4erDOge.js";const Y=[{slug:"welcome-to-my-blog",title:"Welcome to My Blog!",excerpt:"Starting this journey to share thoughts on AI, health tech, and competitive sprinting. Here's what you can expect.",content:`# Welcome to My Blog!

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

More technical details coming in future posts!`,date:"2025-01-10",readTime:"7 min read",tags:["Azure","LLM","workflows","mapping"],published:!0}];async function J(){return{posts:Y.filter(s=>s.published).sort((s,c)=>new Date(c.date).getTime()-new Date(s.date).getTime())}}const me=Object.freeze(Object.defineProperty({__proto__:null,load:J},Symbol.toStringTag,{value:"Module"}));var Q=d('<meta name="description" content="Thoughts on LLMs, health tech, biomechanics, and competitive sprinting"/>'),X=d('<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"> </span>'),Z=d('<article class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"><div class="p-6"><div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3"><time> </time> <span class="mx-2">•</span> <span> </span></div> <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-3"><a class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"> </a></h2> <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"> </p> <div class="flex items-center justify-between"><div class="flex flex-wrap gap-2"></div> <a class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">Read more →</a></div></div></article>'),ee=d(`<div class="text-center py-12"><div class="text-6xl mb-4">📝</div> <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">No posts yet</h2> <p class="text-gray-600 dark:text-gray-400">I'm working on some exciting content. Check back soon!</p></div>`),te=d('<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Blog</h1> <p class="text-xl text-gray-600 dark:text-gray-400">Thoughts on AI, health tech, and the pursuit of speed 🏃‍♂️</p></div> <div class="space-y-8"><!> <!></div></div>');function ge(_,s){O(s,!1);let c=K(s,"data",8);G();var p=te();N(i=>{var t=Q();$.title="Blog - vonshlovens",n(i,t)});var k=o(a(p),2),L=a(k);T(L,1,()=>c().posts,B,(i,t)=>{var m=Z(),z=a(m),g=a(z),u=a(g),P=a(u,!0);e(u);var A=o(u,4),S=a(A,!0);e(A),e(g);var h=o(g,2),v=a(h),H=a(v,!0);e(v),e(h);var x=o(h,2),q=a(x,!0);e(x);var I=o(x,2),f=a(I);T(f,5,()=>r(t).tags,B,(b,E)=>{var y=X(),j=a(y,!0);e(y),M(()=>l(j,r(E))),n(b,y)}),e(f);var W=o(f,2);e(I),e(z),e(m),M(b=>{w(u,"datetime",r(t).date),l(P,b),l(S,r(t).readTime),w(v,"href",`${V??""}/blog/${r(t).slug??""}`),l(H,r(t).title),l(q,r(t).excerpt),w(W,"href",`/blog/${r(t).slug??""}`)},[()=>new Date(r(t).date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})],R),n(i,m)});var C=o(L,2);{var D=i=>{var t=ee();n(i,t)};F(C,i=>{c().posts.length===0&&i(D)})}e(k),e(p),n(_,p),U()}export{ge as component,me as universal};
