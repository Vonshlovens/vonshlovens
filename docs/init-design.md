<!-- Design System -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-background": "#1b1d0e",
                    "on-primary-fixed-variant": "#e5e2e1",
                    "on-error": "#ffffff",
                    "on-tertiary-container": "#ffffff",
                    "on-tertiary-fixed-variant": "#e4e4cc",
                    "primary-fixed": "#5f5e5e",
                    "outline-variant": "#c6c6c6",
                    "on-tertiary": "#e4e4cc",
                    "tertiary-container": "#757662",
                    "surface-variant": "#e4e4cc",
                    "on-primary-container": "#ffffff",
                    "tertiary-fixed": "#5e604d",
                    "inverse-primary": "#c8c6c5",
                    "tertiary-fixed-dim": "#474836",
                    "error-container": "#ffdad6",
                    "inverse-on-surface": "#f2f2d9",
                    "on-error-container": "#410002",
                    "surface-container": "#efefd7",
                    "background": "#fbfbe2",
                    "surface-container-high": "#eaead1",
                    "primary-container": "#3c3b3b",
                    "outline": "#777777",
                    "on-secondary": "#ffffff",
                    "surface-bright": "#fbfbe2",
                    "secondary": "#5f5e5e",
                    "on-primary": "#e5e2e1",
                    "on-secondary-container": "#1c1b1b",
                    "secondary-fixed-dim": "#adabaa",
                    "surface-tint": "#5f5e5e",
                    "surface-container-lowest": "#ffffff",
                    "tertiary": "#3b3d2b",
                    "secondary-container": "#d6d4d3",
                    "on-surface": "#1b1d0e",
                    "on-tertiary-fixed": "#ffffff",
                    "error": "#ba1a1a",
                    "secondary-fixed": "#c8c6c5",
                    "on-surface-variant": "#474747",
                    "on-primary-fixed": "#ffffff",
                    "surface-container-highest": "#e4e4cc",
                    "primary": "#000000",
                    "on-secondary-fixed": "#1c1b1b",
                    "primary-fixed-dim": "#474746",
                    "surface": "#fbfbe2",
                    "surface-container-low": "#f5f5dc",
                    "surface-dim": "#dbdcc3",
                    "inverse-surface": "#303221",
                    "on-secondary-fixed-variant": "#3c3b3b"
            },
            "borderRadius": {
                    "DEFAULT": "0px",
                    "lg": "0px",
                    "xl": "0px",
                    "full": "0px"
            },
            "fontFamily": {
                    "headline": ["Space Grotesk"],
                    "body": ["Inter"],
                    "label": ["Space Grotesk"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #fbfbe2;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body text-on-background selection:bg-primary selection:text-surface-bright">
<!-- TopAppBar -->
<header class="fixed top-0 w-full border-b-4 border-black dark:border-stone-100 bg-[#fbfbe2] dark:bg-stone-900 z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
<div class="flex justify-between items-center w-full px-6 py-4">
<div class="flex items-center gap-4">
<button class="flex items-center justify-center p-2 hover:bg-black hover:text-white transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 class="text-2xl font-black text-black dark:text-white uppercase tracking-tighter font-['Space_Grotesk']">BRUTALIST ARCHIVE</h1>
</div>
<nav class="hidden md:flex items-center gap-8 font-['Space_Grotesk'] font-bold tracking-tighter uppercase">
<a class="text-white bg-black dark:text-black dark:bg-white px-2" href="#">ARCHIVE</a>
<a class="text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-none" href="#">INDEX</a>
<a class="text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-none" href="#">STREAMS</a>
</nav>
<button class="flex items-center justify-center p-2 hover:bg-black hover:text-white transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
<span class="material-symbols-outlined" data-icon="search">search</span>
</button>
</div>
</header>
<main class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
<!-- Hero Section -->
<section class="mb-24">
<h2 class="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] uppercase tracking-tighter font-headline mb-12">
                THE RAW<br/>INTELLECTUAL
            </h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-4 border-black pt-8">
<p class="text-xl md:text-2xl font-medium leading-relaxed max-w-xl">
                    A digital broadsheet cataloging the intersection of structural minimalism, archival research, and brutalist web architecture.
                </p>
<div class="flex flex-col justify-end items-start md:items-end gap-4">
<span class="font-label font-bold text-sm tracking-widest uppercase bg-tertiary-container text-white px-3 py-1">ISSUE NO. 042</span>
<span class="font-label font-bold text-sm tracking-widest uppercase">UPDATED: 24 OCT 2024</span>
</div>
</div>
</section>
<!-- Bento Grid / Recent Posts -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
<!-- Featured Card -->
<article class="md:col-span-8 group border-4 border-black bg-surface p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
<div class="relative aspect-video w-full border-b-4 border-black overflow-hidden">
<img alt="Structural building" class="w-full h-full object-cover grayscale contrast-125" data-alt="Monochrome architectural shot of a brutalist concrete building with sharp angular shadows and high contrast sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY48sSMum3Qg0QZXSUfKF8ZM28ZIreD9WlRsAtS-yr5Cp8yEHxixBcyWyX-0QZEXgTrN-YvFMeo_ux_cnv00sGYB3erc6j75mHB-Fs4bpVJCnCYxWnpJ1iyqZlVUq_EziEkU--vXYtA2vMMFPP9unt5FkH-Pai7aef1-zM6T_w6GEEZQKyw1GVp-EG0gPUf581vtn5FjqhVKaw4LDeu0vNrutHBiQSLnqqPqtjWJjXvhtJ5tSwhB7Zu8UbFOQddM_DTnENYUIs48L6"/>
<div class="absolute top-4 left-4 bg-primary text-on-primary px-4 py-2 font-label font-bold text-lg uppercase">FEATURED</div>
</div>
<div class="p-8">
<div class="flex flex-wrap gap-3 mb-6">
<span class="border-2 border-black px-3 py-1 font-label font-bold text-xs uppercase">ARCHITECTURE</span>
<span class="border-2 border-black px-3 py-1 font-label font-bold text-xs uppercase">MODERNISM</span>
</div>
<h3 class="text-4xl md:text-6xl font-black font-headline uppercase leading-none mb-6 tracking-tighter">THE WEIGHT OF CONCRETE IN THE DIGITAL AGE</h3>
<div class="flex justify-between items-end">
<p class="font-body text-lg max-w-md hidden md:block">An exploration into why heavy, structural aesthetics are making a comeback in the fluid world of web design.</p>
<span class="font-label font-bold text-sm uppercase">READ MORE →</span>
</div>
</div>
</article>
<!-- Secondary Card 1 -->
<article class="md:col-span-4 border-4 border-black bg-surface-container-high p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
<div>
<span class="font-label font-bold text-sm block mb-4 uppercase">18 OCT 2024</span>
<h3 class="text-3xl font-black font-headline uppercase leading-none mb-4 tracking-tighter">TYPOGRAPHY AS INFRASTRUCTURE</h3>
<p class="font-body text-sm mb-6">Using Space Grotesk to define physical boundaries within a 12-column grid system.</p>
</div>
<div class="flex flex-wrap gap-2">
<span class="bg-tertiary text-on-tertiary px-2 py-1 font-label font-bold text-[10px] uppercase tracking-tighter">DESIGN</span>
<span class="bg-tertiary text-on-tertiary px-2 py-1 font-label font-bold text-[10px] uppercase tracking-tighter">TYPE</span>
</div>
</article>
<!-- Secondary Card 2 -->
<article class="md:col-span-4 border-4 border-black bg-primary text-on-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
<div>
<span class="font-label font-bold text-sm block mb-4 uppercase text-on-primary/60">12 OCT 2024</span>
<h3 class="text-3xl font-black font-headline uppercase leading-none mb-4 tracking-tighter">THE DEATH OF THE GRADIENT</h3>
<p class="font-body text-sm mb-6">Why solid color blocks offer more clarity than the skeuomorphism of the early 2010s.</p>
</div>
<div class="flex flex-wrap gap-2">
<span class="border-2 border-on-primary px-2 py-1 font-label font-bold text-[10px] uppercase tracking-tighter">CRITIQUE</span>
</div>
</article>
<!-- Secondary Card 3 -->
<article class="md:col-span-8 border-4 border-black bg-surface p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
<div class="order-2 md:order-1">
<span class="font-label font-bold text-sm block mb-4 uppercase">05 OCT 2024</span>
<h3 class="text-4xl font-black font-headline uppercase leading-none mb-4 tracking-tighter">GRID AS THE ULTIMATE TRUTH</h3>
<p class="font-body text-base mb-6">Everything exists within the lines. If it doesn't align, it doesn't belong in the archive.</p>
<button class="border-4 border-black bg-black text-white px-6 py-3 font-label font-black uppercase tracking-widest hover:bg-white hover:text-black transition-none">ACCESS LOGS</button>
</div>
<div class="order-1 md:order-2 h-full min-h-[200px] border-4 border-black">
<img alt="Grid patterns" class="w-full h-full object-cover grayscale contrast-150" data-alt="Interior of an office with strong vertical and horizontal window frame patterns creating a geometric grid shadow on the floor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FYaU8CLYKAtpvYjIgkzpzgSq9dNCfeCMaWVRVnB49RMfvuE2iSOkE_nYwLJiRWlfEU9I1Mouj4WaU4HpaH5qmOpjpeFjB0E3wiJnH5lwDWD-Nqf3prjTih0FAs7hVO2UJbjbPob1RrZD9hSFQzH6025x62b-Cj_LxAnhuoylR-SmqNYCXMmSVKKLsfNxupKq049PK1B6yhPZ3NvwNwUr5yl0fmSFkxICdsfh59Tadbk0HcBOttNvcuXlmQdkBxgiuqKx5Sna6Ibx"/>
</div>
</article>
</div>
<!-- Section Label -->
<div class="flex items-center gap-4 mb-12">
<div class="h-1 bg-black flex-grow"></div>
<h2 class="font-headline font-black text-2xl uppercase tracking-[0.2em]">COLLECTIONS</h2>
<div class="h-1 bg-black flex-grow"></div>
</div>
<!-- Asymmetric List -->
<div class="space-y-4">
<div class="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-black py-8 group cursor-pointer hover:bg-black hover:text-white transition-none px-4">
<span class="font-label font-bold text-lg">01</span>
<h4 class="text-3xl md:text-5xl font-black font-headline uppercase tracking-tighter flex-grow md:ml-12">SYSTEMIC FAILURE</h4>
<div class="flex items-center gap-8">
<span class="font-label text-sm uppercase hidden md:block">CATEGORIES: ESSAY, WEB</span>
<span class="material-symbols-outlined text-4xl" data-icon="north_east">north_east</span>
</div>
</div>
<div class="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-black py-8 group cursor-pointer hover:bg-black hover:text-white transition-none px-4">
<span class="font-label font-bold text-lg">02</span>
<h4 class="text-3xl md:text-5xl font-black font-headline uppercase tracking-tighter flex-grow md:ml-12">RAW DATA INPUT</h4>
<div class="flex items-center gap-8">
<span class="font-label text-sm uppercase hidden md:block">CATEGORIES: RESEARCH</span>
<span class="material-symbols-outlined text-4xl" data-icon="north_east">north_east</span>
</div>
</div>
<div class="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-black py-8 group cursor-pointer hover:bg-black hover:text-white transition-none px-4">
<span class="font-label font-bold text-lg">03</span>
<h4 class="text-3xl md:text-5xl font-black font-headline uppercase tracking-tighter flex-grow md:ml-12">THE ANTI-FLUID MANIFESTO</h4>
<div class="flex items-center gap-8">
<span class="font-label text-sm uppercase hidden md:block">CATEGORIES: MANIFESTO</span>
<span class="material-symbols-outlined text-4xl" data-icon="north_east">north_east</span>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full border-t-4 border-black dark:border-stone-100 mt-20 bg-[#fbfbe2] dark:bg-stone-900">
<div class="flex flex-col md:flex-row justify-between items-center w-full px-6 py-12 gap-8">
<div class="flex flex-col gap-2">
<span class="font-black text-lg font-['Space_Grotesk'] uppercase tracking-tighter">THE RAW INTELLECTUAL</span>
<p class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase opacity-60">© 2024 THE RAW INTELLECTUAL</p>
</div>
<nav class="flex flex-wrap justify-center gap-8">
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase underline decoration-4 underline-offset-4 hover:line-through transition-none" href="#">ARCHIVE</a>
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase no-underline hover:line-through transition-none" href="#">INDEX</a>
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase no-underline hover:line-through transition-none" href="#">RSS</a>
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase no-underline hover:line-through transition-none" href="#">STREAMS</a>
</nav>
<div class="flex gap-4">
<a class="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-none" href="#">
<span class="material-symbols-outlined" data-icon="share">share</span>
</a>
<a class="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-none" href="#">
<span class="material-symbols-outlined" data-icon="mail">mail</span>
</a>
</div>
</div>
</footer>
</body></html>

<!-- Design System -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>BRUTALIST ARCHIVE - THE STRUCTURAL INERTIA OF MODERN INTERFACES</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed": "#5e5e5e",
                    "secondary-fixed-dim": "#ababab",
                    "surface-container-high": "#eaead1",
                    "surface-container-lowest": "#ffffff",
                    "surface-tint": "#5f5e5e",
                    "secondary-container": "#d4d4d4",
                    "tertiary": "#3b3b3b",
                    "inverse-on-surface": "#f2f2da",
                    "tertiary-container": "#747474",
                    "outline-variant": "#c6c6c6",
                    "error-container": "#ffdad6",
                    "surface-container-low": "#f5f5dc",
                    "on-primary": "#e5e2e1",
                    "on-primary-container": "#ffffff",
                    "secondary-fixed": "#c6c6c6",
                    "inverse-primary": "#c8c6c5",
                    "on-tertiary-container": "#ffffff",
                    "on-surface": "#1b1d0e",
                    "primary-container": "#3c3b3b",
                    "background": "#fbfbe2",
                    "secondary": "#5e5e5e",
                    "surface-variant": "#e4e4cc",
                    "inverse-surface": "#303221",
                    "on-secondary": "#ffffff",
                    "surface-container": "#efefd7",
                    "on-tertiary-fixed-variant": "#e2e2e2",
                    "on-primary-fixed": "#ffffff",
                    "primary": "#000000",
                    "outline": "#777777",
                    "on-secondary-container": "#1b1b1b",
                    "tertiary-fixed-dim": "#474747",
                    "primary-fixed": "#5f5e5e",
                    "on-secondary-fixed": "#1b1b1b",
                    "on-error": "#ffffff",
                    "error": "#ba1a1a",
                    "on-background": "#1b1d0e",
                    "surface-container-highest": "#e4e4cc",
                    "on-tertiary-fixed": "#ffffff",
                    "on-surface-variant": "#474747",
                    "surface-dim": "#dbdcc4",
                    "primary-fixed-dim": "#474746",
                    "on-error-container": "#410002",
                    "surface": "#fbfbe2",
                    "on-primary-fixed-variant": "#e5e2e1",
                    "on-secondary-fixed-variant": "#3b3b3b",
                    "surface-bright": "#fbfbe2",
                    "on-tertiary": "#e2e2e2"
            },
            "borderRadius": {
                    "DEFAULT": "0px",
                    "lg": "0px",
                    "xl": "0px",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["JetBrains Mono"],
                    "body": ["JetBrains Mono"],
                    "label": ["JetBrains Mono"]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'JetBrains Mono', monospace; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        ::selection {
            background-color: #000000;
            color: #fbfbe2;
        }
        .dark ::selection {
            background-color: #f2f2da;
            color: #1A1A1A;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface dark:bg-[#1A1A1A] text-on-surface dark:text-inverse-on-surface min-h-screen">
<!-- TopAppBar -->
<header class="fixed top-0 w-full border-b-4 border-[#1b1d0e] dark:border-[#f2f2da] bg-[#fbfbe2] dark:bg-[#1A1A1A] z-50 flex items-center justify-between px-6 h-20 shadow-[4px_4px_0px_0px_rgba(27,29,14,1)] dark:shadow-[4px_4px_0px_0px_rgba(242,242,218,1)]">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-3xl" data-icon="terminal">terminal</span>
<h1 class="text-3xl font-black tracking-tighter uppercase font-['JetBrains_Mono']">BRUTALIST ARCHIVE</h1>
</div>
<nav class="hidden md:flex gap-8 items-center font-['JetBrains_Mono'] uppercase tracking-tighter">
<a class="text-[#fbfbe2] bg-[#1b1d0e] dark:text-[#1A1A1A] dark:bg-[#f2f2da] px-2 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(27,29,14,1)]" href="#">ARCHIVE</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all" href="#">INDEX</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all" href="#">RSS</a>
</nav>
<button class="material-symbols-outlined text-3xl" data-icon="search">search</button>
</header>
<main class="pt-32 pb-20 px-6 max-w-6xl mx-auto">
<!-- Article Header -->
<section class="mb-16">
<div class="flex items-center gap-2 mb-4">
<span class="text-[0.6875rem] font-bold uppercase tracking-widest bg-primary text-on-primary px-2 py-1">ESSAY_042</span>
<span class="text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">PUBLISHED: 2024.10.24</span>
</div>
<h2 class="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase mb-8">THE STRUCTURAL INERTIA OF MODERN INTERFACES</h2>
<div class="border-y-4 border-primary dark:border-inverse-on-surface py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
<div class="flex items-center gap-4">
<div class="w-12 h-12 border-2 border-primary overflow-hidden">
<img alt="Author Portrait" class="w-full h-full object-cover grayscale" data-alt="high contrast black and white close up portrait of a stern architect with glasses against a grid background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdMrSQq16-IgAqpBai7tqGGw7I5U7LWNdbzpXBeEjmfuLEA8zWRD0Z77dU3SQDEDr032Bpd0dBxkhwaBt5VhLZs-Lm5weSCqMgmfyEEa8jMoeQoNE5k0_Mpa8R0ElKAhtMVf4z15dbSTqLLpRdnXS3OZ83q0TtvssS4PQyzrYM9-WXHzV2YHjl-4ZKClycLIeZ9xUDKBoZ6po8AWn7Rl0a22_Rl75T3MEX6AGs7IoxVkT1rCddUZYQt3titXrBNg9N997WLf-eO7oW"/>
</div>
<div>
<p class="text-[0.6875rem] font-bold uppercase tracking-widest">WRITTEN BY</p>
<p class="font-bold">ARCHITECT_V.01</p>
</div>
</div>
<div class="flex gap-4">
<button class="border-2 border-primary dark:border-inverse-on-surface px-4 py-2 font-bold uppercase tracking-tighter hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(242,242,218,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none">SHARE_PTR</button>
<button class="bg-primary text-on-primary dark:bg-inverse-on-surface dark:text-inverse-surface px-4 py-2 font-bold uppercase tracking-tighter hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all">SAVE_LOCAL</button>
</div>
</div>
</section>
<!-- Featured Image -->
<div class="w-full aspect-video border-4 border-primary dark:border-inverse-on-surface mb-16 relative overflow-hidden group">
<img alt="Brutalist Architecture" class="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" data-alt="monochrome photography of a massive concrete brutalist building with repetitive geometric patterns and sharp shadows under a harsh sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhkzahoBI9T9Fyyj-J5lWTSmZdcNx0J-C3lgKncfQYhQ17f8DIHbIAb0GspcPCqyBT4RjirsBo0xgOlKjkqpTtYD-p1VtoB_CKOB0_X0WGashm-xdCuK67gWz7GJgLvCJW9LH409lAgki7bXH2zd6yWpme9I19koeEdsB1hPOc_jdpgrX8vUMhd56VBYzk-Kk40WUOzXi1JQ-PljKeuqq9kZwo2lQzGDdlRd06O8yLc42Nl0m7UsVAMAZ4o4lKi-lijPRLOif-U_6E"/>
<div class="absolute bottom-4 left-4 bg-primary text-on-primary px-3 py-1 text-xs font-bold uppercase tracking-widest">FIG. 01: MONOLITHIC_STRUCTURE_04</div>
</div>
<!-- Article Content -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-12">
<aside class="md:col-span-3 order-2 md:order-1">
<div class="sticky top-28 space-y-12">
<div>
<h4 class="text-[0.6875rem] font-bold uppercase tracking-widest border-b-2 border-primary dark:border-inverse-on-surface mb-4 pb-1">METADATA</h4>
<ul class="text-xs space-y-2 font-bold">
<li>READ_TIME: 12_MIN</li>
<li>VERSION: 1.0.4</li>
<li>LOC: BERLIN_CORE</li>
<li>ENCODING: UTF-8</li>
</ul>
</div>
<div>
<h4 class="text-[0.6875rem] font-bold uppercase tracking-widest border-b-2 border-primary dark:border-inverse-on-surface mb-4 pb-1">KEYWORDS</h4>
<div class="flex flex-wrap gap-2">
<span class="border border-primary dark:border-inverse-on-surface px-2 py-1 text-[0.6875rem]">BRUTALISM</span>
<span class="border border-primary dark:border-inverse-on-surface px-2 py-1 text-[0.6875rem]">UI_SKEPTIC</span>
<span class="border border-primary dark:border-inverse-on-surface px-2 py-1 text-[0.6875rem]">MONOSPACE</span>
<span class="border border-primary dark:border-inverse-on-surface px-2 py-1 text-[0.6875rem]">GRID_THEORY</span>
</div>
</div>
</div>
</aside>
<article class="md:col-span-9 order-1 md:order-2 space-y-8">
<p class="text-xl md:text-2xl font-bold leading-tight">
                    THE MODERN INTERFACE IS SUFFERING FROM A CRISIS OF SOFTNESS. WE HAVE REPLACED THE RIGID HONESTY OF THE MACHINE WITH THE AMBIENT COMFORT OF CONSUMER ELECTRONICS. THIS ESSAY EXPLORES THE NECESSITY OF REINTRODUCING STRUCTURAL FRICTION INTO OUR DIGITAL LIVES.
                </p>
<div class="space-y-6 text-sm md:text-base leading-relaxed">
<p>
                        Digital brutalism is not merely an aesthetic choice; it is a rejection of the obscured hierarchy found in contemporary design systems. When we round every corner and diffuse every shadow, we are lying to the user about the nature of the medium. Software is a construct of logic and mathematics—it is rigid, binary, and unyielding.
                    </p>
<div class="bg-surface-container dark:bg-inverse-surface border-l-8 border-primary dark:border-inverse-on-surface p-8 my-10">
<span class="material-symbols-outlined text-4xl mb-4" data-icon="format_quote">format_quote</span>
<p class="text-lg font-bold italic tracking-tight uppercase">"WE HAVE TRADED THE CLARITY OF THE MONOLITH FOR THE CONVENIENCE OF THE CLOUD. THE RESULT IS A WEB THAT FEELS LIKE NOTHING AT ALL."</p>
</div>
<p>
                        Consider the grid. In most modern UI, the grid is a ghost—a suggestion that exists only to be broken by "playful" illustrations and "dynamic" layouts. In a brutalist framework, the grid is the hero. It is the skeletal structure that gives meaning to the information it contains. To hide the grid is to hide the truth of the architectural intent.
                    </p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
<div class="border-2 border-primary dark:border-inverse-on-surface p-6 bg-surface-container-high dark:bg-zinc-800">
<h5 class="font-bold uppercase mb-2">01. STATIC_STATE</h5>
<p class="text-xs">Interfaces should not move without purpose. The obsession with micro-interactions has created a digital landscape of constant, exhausting motion.</p>
</div>
<div class="border-2 border-primary dark:border-inverse-on-surface p-6 bg-surface-container-high dark:bg-zinc-800">
<h5 class="font-bold uppercase mb-2">02. RAW_CONTENT</h5>
<p class="text-xs">Information is the priority. Every pixel spent on a gradient is a pixel stolen from the message. Precision over decoration.</p>
</div>
</div>
<p>
                        The "Structural Inertia" we refer to is the resistance of an interface to be anything other than what it is. A button should look like a slab because it is a trigger. A field should look like a box because it is a container. By returning to these primitive forms, we empower the user to interact with the system on its own terms, rather than through a layer of polite metaphors.
                    </p>
</div>
<!-- Article Bottom Actions -->
<div class="pt-12 border-t-4 border-primary dark:border-inverse-on-surface flex flex-wrap gap-4">
<button class="flex items-center gap-2 border-2 border-primary px-4 py-2 font-bold hover:bg-primary hover:text-on-primary transition-colors">
<span class="material-symbols-outlined" data-icon="thumb_up">thumb_up</span>
<span>APPRECIATE_POST</span>
</button>
<button class="flex items-center gap-2 border-2 border-primary px-4 py-2 font-bold hover:bg-primary hover:text-on-primary transition-colors">
<span class="material-symbols-outlined" data-icon="comment">comment</span>
<span>VIEW_COMMENTS(12)</span>
</button>
</div>
</article>
</div>
<!-- Related Posts Bento Grid -->
<section class="mt-32">
<h3 class="text-2xl font-black uppercase tracking-tighter mb-8 bg-primary text-on-primary inline-block px-4 py-1">FURTHER_READING</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Related 1 -->
<div class="border-4 border-primary dark:border-inverse-on-surface p-6 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(27,29,14,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(242,242,218,1)] transition-all cursor-pointer group">
<p class="text-[0.6875rem] font-bold uppercase mb-2 opacity-60">ESSAY_041</p>
<h4 class="text-xl font-bold uppercase leading-none mb-4 group-hover:underline">THE DEATH OF THE BORDER RADIUS</h4>
<div class="w-full h-32 border-2 border-primary mb-4 grayscale overflow-hidden">
<img alt="Related Article" class="w-full h-full object-cover" data-alt="abstract geometric pattern with sharp black and white triangles and squares intersecting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBib8QNkOcDySM1NoaNypOUJ0xaivo7O48CQ3E9j6yiLC2P6Jj2Q0NMRCi1GVWgHj48asG_8gdoKWHsXfKtjIwAM9dNwyO9iPQmravX_6owUrDL2QBuSJd7kFvd1ibGIQwteOz8cZC9nnmQzm-v0CWOd3j3Ni3EsiZYgnwc8w0dHtLIf2uBDpkOuQ8hanSsk8LPjWbVCcgGDyn9jCRjP5-u_pnLswgstqc-QzfKGPcHwJn29yn9c4MyrKHxrWSN9coV7qlul64-daei"/>
</div>
<span class="text-xs font-bold underline">READ_MORE</span>
</div>
<!-- Related 2 -->
<div class="border-4 border-primary dark:border-inverse-on-surface p-6 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(27,29,14,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(242,242,218,1)] transition-all cursor-pointer group">
<p class="text-[0.6875rem] font-bold uppercase mb-2 opacity-60">INDEX_009</p>
<h4 class="text-xl font-bold uppercase leading-none mb-4 group-hover:underline">MONOSPACE AS THE ONLY TRUTH</h4>
<div class="w-full h-32 border-2 border-primary mb-4 grayscale overflow-hidden">
<img alt="Related Article" class="w-full h-full object-cover" data-alt="rows of code and technical text in a monospace font displayed on an old CRT monitor with visible scan lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHyPqme3eLMq_DVT44E51MwZLVqcs5b7BLPL4d7nk9_wyyjIKs_fxPlFCXkwjKJvlbUB6GStA1KIxb26SqsjhPoDFyAL9OZnHMew9Rn1lg21ZPJXIG4xAqpaXRoN9RB0pHJf1TpqIAZLaay85ILYr5uJZ5B54VK7USuyTHiRDtxGgR3gm1tcfHsdvw-EN3HAG8WN4Cv5y2pCPTBdN9csSnyz4bI58ucPLaG67sQYQy1fHBoc_ShDG5nC1wFewYsFZBQ5CEBhsW7dxt"/>
</div>
<span class="text-xs font-bold underline">READ_MORE</span>
</div>
<!-- Related 3 -->
<div class="border-4 border-primary dark:border-inverse-on-surface p-6 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(27,29,14,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(242,242,218,1)] transition-all cursor-pointer group">
<p class="text-[0.6875rem] font-bold uppercase mb-2 opacity-60">ARCHIVE_012</p>
<h4 class="text-xl font-bold uppercase leading-none mb-4 group-hover:underline">GRID_SYSTEMS_IN_PRACTICE</h4>
<div class="w-full h-32 border-2 border-primary mb-4 grayscale overflow-hidden">
<img alt="Related Article" class="w-full h-full object-cover" data-alt="architectural blueprint showing complex structural lines and grid measurements in blue and white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKJL6NUJG2N6kD6VanueSo7s2h7g4yhWwFdiby85iDh-UHd9qk4g3N3sSHKRKWhaLlUt5sN0JayHgY-joUwkmz71MKzlDLGMqAVUj61m1ek-B1J8hbMaxoh7dTmMCAjJxcegotKiWnuBQrcyOf7QpE_3r_AOAF0nnbkv4L-bldTgg92hgzp3xomwbk9f4pTms9MWae4mo61T0xQj6_eJZFgqN6UuUnviONuXnLxST0-7xnJLzuk9y_OcAhxBRjt0WqKL7KirsJ650G"/>
</div>
<span class="text-xs font-bold underline">READ_MORE</span>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full border-t-4 border-[#1b1d0e] dark:border-[#f2f2da] mt-20 bg-[#fbfbe2] dark:bg-[#1A1A1A] flex flex-col md:flex-row justify-between items-center p-8 gap-4 font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest">
<div class="flex items-center gap-2">
<span class="text-lg font-bold">©2024 BRUTALIST_ARCHIVE.v1</span>
</div>
<div class="flex gap-8">
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors underline decoration-4 underline-offset-4" href="#">ARCHIVE</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors" href="#">INDEX</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors" href="#">RSS</a>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-sm" data-icon="terminal">terminal</span>
<span class="opacity-50">SYS_OK</span>
</div>
</footer>
</body></html>

<!-- Blog Homepage -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>THE INDEX | BRUTALIST ARCHIVE</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed": "#5e5e5e",
                    "secondary-fixed-dim": "#ababab",
                    "surface-container-high": "#eaead1",
                    "surface-container-lowest": "#ffffff",
                    "surface-tint": "#5f5e5e",
                    "secondary-container": "#d4d4d4",
                    "tertiary": "#3b3b3b",
                    "inverse-on-surface": "#f2f2da",
                    "tertiary-container": "#747474",
                    "outline-variant": "#c6c6c6",
                    "error-container": "#ffdad6",
                    "surface-container-low": "#f5f5dc",
                    "on-primary": "#e5e2e1",
                    "on-primary-container": "#ffffff",
                    "secondary-fixed": "#c6c6c6",
                    "inverse-primary": "#c8c6c5",
                    "on-tertiary-container": "#ffffff",
                    "on-surface": "#1b1d0e",
                    "primary-container": "#3c3b3b",
                    "background": "#fbfbe2",
                    "secondary": "#5e5e5e",
                    "surface-variant": "#e4e4cc",
                    "inverse-surface": "#303221",
                    "on-secondary": "#ffffff",
                    "surface-container": "#efefd7",
                    "on-tertiary-fixed-variant": "#e2e2e2",
                    "on-primary-fixed": "#ffffff",
                    "primary": "#000000",
                    "outline": "#777777",
                    "on-secondary-container": "#1b1b1b",
                    "tertiary-fixed-dim": "#474747",
                    "primary-fixed": "#5f5e5e",
                    "on-secondary-fixed": "#1b1b1b",
                    "on-error": "#ffffff",
                    "error": "#ba1a1a",
                    "on-background": "#1b1d0e",
                    "surface-container-highest": "#e4e4cc",
                    "on-tertiary-fixed": "#ffffff",
                    "on-surface-variant": "#474747",
                    "surface-dim": "#dbdcc4",
                    "primary-fixed-dim": "#474746",
                    "on-error-container": "#410002",
                    "surface": "#fbfbe2",
                    "on-primary-fixed-variant": "#e5e2e1",
                    "on-secondary-fixed-variant": "#3b3b3b",
                    "surface-bright": "#fbfbe2",
                    "on-tertiary": "#e2e2e2"
            },
            "fontFamily": {
                    "headline": ["JetBrains Mono"],
                    "body": ["JetBrains Mono"],
                    "label": ["JetBrains Mono"]
            }
          },
        },
      }
    </script>
<style>
        body {
            font-family: 'JetBrains Mono', monospace;
            background-color: #fbfbe2;
        }
        .dark body {
            background-color: #1A1A1A;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background transition-colors duration-200">
<!-- TopAppBar -->
<header class="fixed top-0 w-full border-b-4 border-[#1b1d0e] dark:border-[#f2f2da] bg-[#fbfbe2] dark:bg-[#1A1A1A] z-50 flex items-center justify-between px-6 h-20 shadow-[4px_4px_0px_0px_rgba(27,29,14,1)] dark:shadow-[4px_4px_0px_0px_rgba(242,242,218,1)]">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-3xl" data-icon="terminal">terminal</span>
<h1 class="text-3xl font-black text-[#1b1d0e] dark:text-[#f2f2da] tracking-tighter uppercase font-['JetBrains_Mono']">BRUTALIST ARCHIVE</h1>
</div>
<nav class="hidden md:flex items-center gap-6 font-['JetBrains_Mono'] uppercase tracking-tighter">
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all" href="#">ARCHIVE</a>
<a class="text-[#fbfbe2] bg-[#1b1d0e] dark:text-[#1A1A1A] dark:bg-[#f2f2da] px-2 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all" href="#">INDEX</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all" href="#">RSS</a>
<span class="material-symbols-outlined cursor-pointer" data-icon="search">search</span>
</nav>
<div class="md:hidden">
<span class="material-symbols-outlined text-3xl" data-icon="menu">menu</span>
</div>
</header>
<main class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
<!-- Hero Section -->
<section class="mb-20">
<div class="flex flex-col md:flex-row justify-between items-end gap-8">
<div class="max-w-3xl">
<p class="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-tertiary">SYSTEM_LOG_V1.0</p>
<h2 class="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">THE INDEX</h2>
<p class="text-lg md:text-xl font-medium max-w-xl border-l-4 border-primary pl-6 py-2">A CHRONOLOGICAL REPOSITORY OF ARCHITECTURAL OBSERVATIONS, TECHNICAL DISCOURSES, AND BRUTALIST MANIFESTOS.</p>
</div>
<div class="hidden lg:block">
<div class="w-64 h-64 border-4 border-primary dark:border-inverse-on-surface shadow-[8px_8px_0px_0px_rgba(27,29,14,1)] dark:shadow-[8px_8px_0px_0px_rgba(242,242,218,1)] overflow-hidden">
<img class="w-full h-full object-cover grayscale brightness-90 contrast-125" data-alt="monochrome close-up of geometric concrete staircase with sharp shadows and high contrast brutalist architectural details" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZdAUC3qoU7T-34QSp9O72CrFXHHvut4FNEoPQk2RlDIU8XfCIZ_5F985XXrNQjtWSJi-u8w-xbdCt2hcSHS1XDeI0hPvQHG_ToWFQ_20zwxkLppw9hyKM-jQoVutOdNZuPzuYom1r35OYKfAhWncDFvJvhTTp7vznRhsLdVFqi7b7cS8ltU4EFniCebwuFRMu-4oqqjMPcbSOalMkCDg8inw5ON9md1RdH0lxz4Ega4_16TPaI3IzPA8uwlj6p2ke4RjNrguxidoi"/>
</div>
</div>
</div>
</section>
<!-- Archive Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
<!-- Sidebar Navigation/Stats -->
<aside class="md:col-span-3 sticky top-32 space-y-8">
<div class="border-4 border-primary p-6 bg-surface-container shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-inverse-surface">
<h3 class="font-black uppercase tracking-tighter mb-4 text-sm">ARCHIVE_STATS</h3>
<div class="space-y-2 text-xs font-bold">
<div class="flex justify-between border-b border-outline pb-1"><span>TOTAL_ENTRIES</span><span>142</span></div>
<div class="flex justify-between border-b border-outline pb-1"><span>LAST_UPDATE</span><span>2024.05.12</span></div>
<div class="flex justify-between border-b border-outline pb-1"><span>SYSTEM_STATUS</span><span>ONLINE</span></div>
</div>
</div>
<div class="space-y-4">
<h3 class="font-black uppercase tracking-tighter text-sm">FILTER_BY_YEAR</h3>
<div class="flex flex-wrap gap-2">
<button class="px-3 py-1 border-2 border-primary bg-primary text-on-primary font-bold text-xs uppercase tracking-widest">2024</button>
<button class="px-3 py-1 border-2 border-primary hover:bg-surface-container-high transition-colors font-bold text-xs uppercase tracking-widest">2023</button>
<button class="px-3 py-1 border-2 border-primary hover:bg-surface-container-high transition-colors font-bold text-xs uppercase tracking-widest">2022</button>
<button class="px-3 py-1 border-2 border-primary hover:bg-surface-container-high transition-colors font-bold text-xs uppercase tracking-widest">2021</button>
</div>
</div>
</aside>
<!-- Main Content List -->
<div class="md:col-span-9 space-y-16">
<!-- Year Section 2024 -->
<section>
<div class="flex items-center gap-4 mb-8">
<h3 class="text-4xl font-black tracking-tighter bg-primary text-on-primary px-4">2024</h3>
<div class="h-1 flex-grow bg-primary"></div>
</div>
<div class="space-y-0 border-t-2 border-primary">
<!-- Entry 1 -->
<article class="group border-b-2 border-primary py-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-surface-container-high dark:hover:bg-primary/10 transition-colors px-4 cursor-pointer">
<span class="text-xs font-bold tabular-nums opacity-60">05.12</span>
<div class="flex-grow">
<h4 class="text-2xl font-extrabold uppercase tracking-tight group-hover:underline decoration-4 underline-offset-4">The Concrete Monolith: Ethics of Raw Materials</h4>
<p class="text-sm mt-2 opacity-80 line-clamp-1 italic">Examining the intersection of 1950s Soviet architecture and modern digital structuralism.</p>
</div>
<div class="flex gap-2 shrink-0">
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">Theory</span>
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">Concrete</span>
</div>
<span class="material-symbols-outlined transition-transform group-hover:translate-x-2" data-icon="arrow_forward">arrow_forward</span>
</article>
<!-- Entry 2 -->
<article class="group border-b-2 border-primary py-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-surface-container-high dark:hover:bg-primary/10 transition-colors px-4 cursor-pointer">
<span class="text-xs font-bold tabular-nums opacity-60">03.28</span>
<div class="flex-grow">
<h4 class="text-2xl font-extrabold uppercase tracking-tight group-hover:underline decoration-4 underline-offset-4">Unyielding Grids and Monospace Layouts</h4>
<p class="text-sm mt-2 opacity-80 line-clamp-1 italic">The psychology of rigid typography in a fluid web ecosystem.</p>
</div>
<div class="flex gap-2 shrink-0">
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">Design</span>
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">Tech</span>
</div>
<span class="material-symbols-outlined transition-transform group-hover:translate-x-2" data-icon="arrow_forward">arrow_forward</span>
</article>
<!-- Entry 3 -->
<article class="group border-b-2 border-primary py-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-surface-container-high dark:hover:bg-primary/10 transition-colors px-4 cursor-pointer">
<span class="text-xs font-bold tabular-nums opacity-60">01.15</span>
<div class="flex-grow">
<h4 class="text-2xl font-extrabold uppercase tracking-tight group-hover:underline decoration-4 underline-offset-4">Shadows without Blur: A Manifesto</h4>
<p class="text-sm mt-2 opacity-80 line-clamp-1 italic">Rejecting the skeuomorphic soft lighting of the 2010s.</p>
</div>
<div class="flex gap-2 shrink-0">
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">Manifesto</span>
</div>
<span class="material-symbols-outlined transition-transform group-hover:translate-x-2" data-icon="arrow_forward">arrow_forward</span>
</article>
</div>
</section>
<!-- Year Section 2023 -->
<section>
<div class="flex items-center gap-4 mb-8">
<h3 class="text-4xl font-black tracking-tighter bg-primary text-on-primary px-4">2023</h3>
<div class="h-1 flex-grow bg-primary"></div>
</div>
<div class="space-y-0 border-t-2 border-primary">
<!-- Entry 4 -->
<article class="group border-b-2 border-primary py-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-surface-container-high dark:hover:bg-primary/10 transition-colors px-4 cursor-pointer">
<span class="text-xs font-bold tabular-nums opacity-60">12.04</span>
<div class="flex-grow">
<h4 class="text-2xl font-extrabold uppercase tracking-tight group-hover:underline decoration-4 underline-offset-4">Barbican Revisited: Urban Brutalism</h4>
<p class="text-sm mt-2 opacity-80 line-clamp-1 italic">Photo essay on London's most controversial residential complex.</p>
</div>
<div class="flex gap-2 shrink-0">
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">Photography</span>
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">London</span>
</div>
<span class="material-symbols-outlined transition-transform group-hover:translate-x-2" data-icon="arrow_forward">arrow_forward</span>
</article>
<!-- Entry 5 -->
<article class="group border-b-2 border-primary py-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-surface-container-high dark:hover:bg-primary/10 transition-colors px-4 cursor-pointer">
<span class="text-xs font-bold tabular-nums opacity-60">11.19</span>
<div class="flex-grow">
<h4 class="text-2xl font-extrabold uppercase tracking-tight group-hover:underline decoration-4 underline-offset-4">The Death of the Rounded Corner</h4>
<p class="text-sm mt-2 opacity-80 line-clamp-1 italic">How 0px border-radius changes user perception of digital authority.</p>
</div>
<div class="flex gap-2 shrink-0">
<span class="text-[10px] border border-primary px-2 py-0.5 font-bold uppercase">Design</span>
</div>
<span class="material-symbols-outlined transition-transform group-hover:translate-x-2" data-icon="arrow_forward">arrow_forward</span>
</article>
</div>
</section>
<div class="flex justify-center pt-8">
<button class="group relative px-8 py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-lg border-2 border-primary hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(242,242,218,1)]">
                        LOAD_OLDER_ENTRIES
                    </button>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full border-t-4 border-[#1b1d0e] dark:border-[#f2f2da] mt-20 bg-[#fbfbe2] dark:bg-[#1A1A1A] flex flex-col md:flex-row justify-between items-center p-8 gap-4 font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest">
<div class="text-[#1b1d0e] dark:text-[#f2f2da]">©2024 BRUTALIST_ARCHIVE.v1</div>
<div class="flex gap-8">
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors duration-100" href="#">ARCHIVE</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] underline decoration-4 underline-offset-4 hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors duration-100" href="#">INDEX</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors duration-100" href="#">RSS</a>
</div>
<div class="flex items-center gap-2">
<span class="w-3 h-3 bg-error animate-pulse"></span>
<span class="text-[10px]">RECORD_ING_LIVE</span>
</div>
</footer>
</body></html>

<!-- Blog Post View -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>THE RAW INTELLECTUAL | ARCHIVE</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&amp;family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-background": "#1b1d0e",
                        "on-primary-fixed-variant": "#e5e2e1",
                        "on-error": "#ffffff",
                        "on-tertiary-container": "#ffffff",
                        "on-tertiary-fixed-variant": "#e4e4cc",
                        "primary-fixed": "#5f5e5e",
                        "outline-variant": "#c6c6c6",
                        "on-tertiary": "#e4e4cc",
                        "tertiary-container": "#757662",
                        "surface-variant": "#e4e4cc",
                        "on-primary-container": "#ffffff",
                        "tertiary-fixed": "#5e604d",
                        "inverse-primary": "#c8c6c5",
                        "tertiary-fixed-dim": "#474836",
                        "error-container": "#ffdad6",
                        "inverse-on-surface": "#f2f2d9",
                        "on-error-container": "#410002",
                        "surface-container": "#efefd7",
                        "background": "#fbfbe2",
                        "surface-container-high": "#eaead1",
                        "primary-container": "#3c3b3b",
                        "outline": "#777777",
                        "on-secondary": "#ffffff",
                        "surface-bright": "#fbfbe2",
                        "secondary": "#5f5e5e",
                        "on-primary": "#e5e2e1",
                        "on-secondary-container": "#1c1b1b",
                        "secondary-fixed-dim": "#adabaa",
                        "surface-tint": "#5f5e5e",
                        "surface-container-lowest": "#ffffff",
                        "tertiary": "#3b3d2b",
                        "secondary-container": "#d6d4d3",
                        "on-surface": "#1b1d0e",
                        "on-tertiary-fixed": "#ffffff",
                        "error": "#ba1a1a",
                        "secondary-fixed": "#c8c6c5",
                        "on-surface-variant": "#474747",
                        "on-primary-fixed": "#ffffff",
                        "surface-container-highest": "#e4e4cc",
                        "primary": "#000000",
                        "on-secondary-fixed": "#1c1b1b",
                        "primary-fixed-dim": "#474746",
                        "surface": "#fbfbe2",
                        "surface-container-low": "#f5f5dc",
                        "surface-dim": "#dbdcc3",
                        "inverse-surface": "#303221",
                        "on-secondary-fixed-variant": "#3c3b3b"
                    },
                    "borderRadius": {
                        "DEFAULT": "0px",
                        "lg": "0px",
                        "xl": "0px",
                        "full": "9999px"
                    },
                    "fontFamily": {
                        "headline": ["Space Grotesk", "sans-serif"],
                        "body": ["Inter", "sans-serif"],
                        "label": ["Space Grotesk", "sans-serif"],
                        "mono": ["JetBrains Mono", "monospace"]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #fbfbe2;
            color: #1b1d0e;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .prose h2 { font-family: 'Space Grotesk'; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; font-size: 2.25rem; margin-top: 4rem; margin-bottom: 1.5rem; line-height: 1; }
        .prose h3 { font-family: 'Space Grotesk'; font-weight: 700; text-transform: uppercase; font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 4px solid black; display: inline-block; }
        .prose p { margin-bottom: 2rem; line-height: 1.8; color: #1b1d0e; }
        .prose code { font-family: 'JetBrains Mono'; background-color: #efefd7; padding: 0.2rem 0.4rem; border: 1px solid #000000; font-size: 0.9em; }
        .prose pre { background-color: #000000; color: #ffffff; padding: 2rem; border-left: 12px solid #3b3d2b; margin: 3rem 0; overflow-x: auto; }
        .prose blockquote { border-left: 8px solid #000000; padding: 1.5rem 2rem; margin: 3rem 0; background-color: #efefd7; font-style: italic; font-size: 1.25rem; }
        .prose strong { font-weight: 800; border-bottom: 2px solid #000000; }
        .prose ul { margin: 2rem 0; list-style-type: square; padding-left: 1.5rem; }
        .prose li { margin-bottom: 0.75rem; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface selection:bg-primary selection:text-surface">
<!-- TopAppBar -->
<header class="fixed top-0 w-full border-b-4 border-black dark:border-stone-100 bg-[#fbfbe2] dark:bg-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex justify-between items-center w-full px-6 py-4 z-50">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-black cursor-pointer text-3xl" data-icon="menu">menu</span>
<span class="font-['Space_Grotesk'] font-black text-2xl text-black dark:text-white uppercase tracking-tighter">BRUTALIST ARCHIVE</span>
</div>
<div class="hidden md:flex gap-8">
<nav class="flex gap-6 font-label font-bold text-black uppercase tracking-widest text-sm">
<a class="text-white bg-black px-2 transition-none" href="#">Archive</a>
<a class="hover:bg-black hover:text-white transition-none px-2" href="#">Essays</a>
<a class="hover:bg-black hover:text-white transition-none px-2" href="#">Manifesto</a>
</nav>
</div>
<div class="flex items-center">
<span class="material-symbols-outlined text-black cursor-pointer text-3xl" data-icon="search">search</span>
</div>
</header>
<main class="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
<!-- Sidebar Meta Info (Fixed Position Feel on Desktop) -->
<aside class="lg:col-span-3 lg:sticky lg:top-40 h-fit space-y-8">
<div class="border-4 border-black p-6 bg-surface shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
<div class="space-y-6">
<div>
<span class="block font-label font-black text-xs uppercase tracking-widest text-primary/60 mb-1">Published</span>
<p class="font-headline font-bold text-xl uppercase">24 OCT 2024</p>
</div>
<div class="border-t-2 border-black/10 pt-4">
<span class="block font-label font-black text-xs uppercase tracking-widest text-primary/60 mb-1">Reading Time</span>
<p class="font-headline font-bold text-xl uppercase">12 MIN READ</p>
</div>
<div class="border-t-2 border-black/10 pt-4">
<span class="block font-label font-black text-xs uppercase tracking-widest text-primary/60 mb-1">Archive ID</span>
<p class="font-mono text-sm font-bold">#BRA-2024-092</p>
</div>
</div>
</div>
<div class="border-4 border-black p-6 bg-tertiary-container text-white">
<span class="block font-label font-black text-xs uppercase tracking-widest mb-2 text-surface-variant">Keywords</span>
<div class="flex flex-wrap gap-2">
<span class="px-2 py-1 border-2 border-white text-xs font-bold uppercase">Architecture</span>
<span class="px-2 py-1 border-2 border-white text-xs font-bold uppercase">Ethics</span>
<span class="px-2 py-1 border-2 border-white text-xs font-bold uppercase">Digital</span>
</div>
</div>
</aside>
<!-- Main Blog Content -->
<article class="lg:col-span-9">
<!-- Large Bold Title -->
<header class="mb-12">
<h1 class="font-headline font-black text-6xl md:text-8xl leading-[0.9] uppercase tracking-tighter mb-8 break-words">
                    The Structural <br/>
                    Inertia of <br/>
                    Modern Interfaces
                </h1>
<div class="w-full h-4 bg-black mb-8"></div>
</header>
<!-- Featured Image -->
<figure class="mb-16 border-4 border-black p-4 bg-surface shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
<img alt="Brutalist concrete architecture" class="w-full grayscale contrast-125 object-cover h-[500px]" data-alt="monochrome heavy concrete brutalist building with sharp geometric angles and high contrast shadows against a clear sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz2kXXfqA0o57FyXPfoGf4IVrWiMhRMbCKEsINFewervSPpuhYVlOsdKWVhy3hUM34aA000BYzGPcSVvnRueR7eZYPedcd_bLagVOVObHpbp74B3I7zwu9AHI-3nZW2z2nrkSPDO0ZYJyCBFlV3yoVu-DxlzMC6cAMcmjKnhTagazyWTbfakjWbUvsTxNo0gICO8Fnvavi4KmWZ3G1cqLbuIfc0Kd_idFzhu4Gv7ooo5ktyI1b3TZ8JMnT3-2uJBp8tthglgvy7r5o"/>
<figcaption class="mt-4 font-label font-bold text-xs uppercase tracking-widest italic">Fig 01. The Weight of Concrete vs. The Weight of Pixels.</figcaption>
</figure>
<!-- Markdown-like content body -->
<section class="prose max-w-none">
<p class="text-2xl font-bold leading-tight mb-12">
                    In an era defined by soft corners and fluid motions, we have lost the tactile friction that gives digital spaces their identity. We are living in a world of sanded-down edges, where every interface feels like a mirror reflecting nothing but our own desire for convenience.
                </p>
<h2>I. The Myth of Frictionless Design</h2>
<p>
                    Modern design philosophy posits that <strong>friction is the enemy</strong>. We are told that every millisecond of cognitive load removed is a victory for the user experience. But what happens when we remove the resistance? We lose the ability to differentiate between a banking app and a social network. Everything becomes a beige, rounded blur.
                </p>
<blockquote>
                    "The absence of architectural struggle in our interfaces is not a sign of progress, but a sign of intellectual decay." 
                    <br/>— ARCHIVE ANONYMOUS
                </blockquote>
<h3>Defining The Skeleton</h3>
<p>
                    A brutalist approach to UI doesn't hide its logic. It exposes the grid. It celebrates the border. It treats typography not as a carrier of information, but as the physical foundation of the site. Consider this block of archival logic:
                </p>
<pre><code>function archiveSystem(input) {
  const CORE_VALUES = ['BOLD', 'STARK', 'RAW'];
  return input.filter(val =&gt; CORE_VALUES.includes(val));
}</code></pre>
<p>
                    When we look at the <code>monospaced</code> character, we see intent. It is fixed-width, rigid, and unapologetic. This is the "Raw Intellectual" voice we must return to.
                </p>
<h2>II. Verticality and Power</h2>
<p>
                    Vertical space is our most undervalued asset. By allowing elements to breathe—giving them massive gutters and wide margins—we create a sense of importance. We are no longer competing for the user's attention with "Dark Patterns" or "Engagement Loops." We are commanding it through <strong>Structural Integrity</strong>.
                </p>
<ul>
<li>The Line must be heavy (never less than 2px).</li>
<li>The Corner must be sharp (zero radius).</li>
<li>The Color must be decisive (high contrast).</li>
</ul>
<p>
                    This is not merely an aesthetic choice. It is an ethical one. A site that looks like it was built to last 100 years encourages deeper reading and more considered engagement than one built to disappear into the background.
                </p>
</section>
<!-- Social/Interaction Footer of Post -->
<section class="mt-20 pt-10 border-t-8 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
<div class="flex gap-4">
<button class="bg-black text-white px-8 py-4 font-label font-black uppercase hover:bg-surface hover:text-black border-4 border-black transition-none active:translate-x-[4px] active:translate-y-[4px]">
                        SHARE ARCHIVE
                    </button>
<button class="bg-surface text-black px-8 py-4 font-label font-black uppercase hover:bg-black hover:text-white border-4 border-black transition-none active:translate-x-[4px] active:translate-y-[4px]">
                        CITATIONS (12)
                    </button>
</div>
<div class="font-label font-black text-xs uppercase tracking-[0.2em]">
                    END OF ENTRY // REF:092
                </div>
</section>
</article>
</main>
<!-- Footer -->
<footer class="w-full border-t-4 border-black dark:border-stone-100 mt-20 bg-[#fbfbe2] dark:bg-stone-900 flex flex-col md:flex-row justify-between items-center w-full px-6 py-12 gap-8">
<div class="flex flex-col gap-2">
<span class="font-['Space_Grotesk'] font-black text-lg text-black dark:text-stone-100 uppercase tracking-tighter">THE RAW INTELLECTUAL</span>
<p class="font-label font-bold text-sm tracking-widest uppercase text-black/60">© 2024 THE RAW INTELLECTUAL</p>
</div>
<nav class="flex flex-wrap justify-center gap-10">
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase text-black hover:line-through transition-none underline decoration-4 underline-offset-4" href="#">ARCHIVE</a>
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase text-black hover:line-through transition-none no-underline" href="#">INDEX</a>
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase text-black hover:line-through transition-none no-underline" href="#">RSS</a>
<a class="font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase text-black hover:line-through transition-none no-underline" href="#">STREAMS</a>
</nav>
<div class="flex gap-4">
<span class="material-symbols-outlined text-3xl cursor-pointer" data-icon="terminal">terminal</span>
<span class="material-symbols-outlined text-3xl cursor-pointer" data-icon="shield">shield</span>
</div>
</footer>
</body></html>

<!-- Blog Archive -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-background": "#1b1d0e",
                    "on-primary-fixed-variant": "#e5e2e1",
                    "on-error": "#ffffff",
                    "on-tertiary-container": "#ffffff",
                    "on-tertiary-fixed-variant": "#e4e4cc",
                    "primary-fixed": "#5f5e5e",
                    "outline-variant": "#c6c6c6",
                    "on-tertiary": "#e4e4cc",
                    "tertiary-container": "#757662",
                    "surface-variant": "#e4e4cc",
                    "on-primary-container": "#ffffff",
                    "tertiary-fixed": "#5e604d",
                    "inverse-primary": "#c8c6c5",
                    "tertiary-fixed-dim": "#474836",
                    "error-container": "#ffdad6",
                    "inverse-on-surface": "#f2f2d9",
                    "on-error-container": "#410002",
                    "surface-container": "#efefd7",
                    "background": "#fbfbe2",
                    "surface-container-high": "#eaead1",
                    "primary-container": "#3c3b3b",
                    "outline": "#777777",
                    "on-secondary": "#ffffff",
                    "surface-bright": "#fbfbe2",
                    "secondary": "#5f5e5e",
                    "on-primary": "#e5e2e1",
                    "on-secondary-container": "#1c1b1b",
                    "secondary-fixed-dim": "#adabaa",
                    "surface-tint": "#5f5e5e",
                    "surface-container-lowest": "#ffffff",
                    "tertiary": "#3b3d2b",
                    "secondary-container": "#d6d4d3",
                    "on-surface": "#1b1d0e",
                    "on-tertiary-fixed": "#ffffff",
                    "error": "#ba1a1a",
                    "secondary-fixed": "#c8c6c5",
                    "on-surface-variant": "#474747",
                    "on-primary-fixed": "#ffffff",
                    "surface-container-highest": "#e4e4cc",
                    "primary": "#000000",
                    "on-secondary-fixed": "#1c1b1b",
                    "primary-fixed-dim": "#474746",
                    "surface": "#fbfbe2",
                    "surface-container-low": "#f5f5dc",
                    "surface-dim": "#dbdcc3",
                    "inverse-surface": "#303221",
                    "on-secondary-fixed-variant": "#3c3b3b"
            },
            "borderRadius": {
                    "DEFAULT": "0px",
                    "lg": "0px",
                    "xl": "0px",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Space Grotesk"],
                    "body": ["Inter"],
                    "label": ["Space Grotesk"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        body {
            background-color: #fbfbe2;
            color: #000000;
        }
        .brutalist-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .brutalist-shadow-active {
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
            transform: translate(2px, 2px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body selection:bg-primary selection:text-surface">
<!-- TopAppBar -->
<header class="fixed top-0 w-full border-b-4 border-black bg-[#fbfbe2] z-50 flex justify-between items-center px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
<div class="flex items-center gap-4">
<button class="flex items-center justify-center p-1 hover:bg-black hover:text-white transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 class="font-['Space_Grotesk'] font-black text-2xl uppercase tracking-tighter text-black">BRUTALIST ARCHIVE</h1>
</div>
<nav class="hidden md:flex gap-8 items-center font-label font-bold text-sm tracking-widest uppercase">
<a class="text-white bg-black px-2 py-1" href="#">ARCHIVE</a>
<a class="text-black hover:bg-black hover:text-white px-2 py-1 transition-none" href="#">INDEX</a>
<a class="text-black hover:bg-black hover:text-white px-2 py-1 transition-none" href="#">STREAMS</a>
<button class="flex items-center justify-center p-1 hover:bg-black hover:text-white transition-none">
<span class="material-symbols-outlined" data-icon="search">search</span>
</button>
</nav>
<div class="md:hidden">
<button class="flex items-center justify-center p-1">
<span class="material-symbols-outlined" data-icon="search">search</span>
</button>
</div>
</header>
<main class="pt-32 pb-20 px-6 max-w-6xl mx-auto">
<!-- Hero Section / Title -->
<section class="mb-16">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-8 border-black pb-8">
<div>
<span class="font-label font-black text-sm uppercase tracking-[0.3em] text-primary mb-4 block">Navigation / Catalog</span>
<h2 class="font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">THE<br/>INDEX</h2>
</div>
<div class="max-w-xs">
<p class="font-body text-lg font-medium leading-tight mb-4">A chronological inventory of thought, discourse, and visual studies. Organized for rapid retrieval.</p>
<div class="flex gap-2">
<div class="border-2 border-black px-3 py-1 font-label text-xs font-bold uppercase bg-tertiary-container text-on-tertiary-container">Total entries: 142</div>
<div class="border-2 border-black px-3 py-1 font-label text-xs font-bold uppercase">v 2.0.4</div>
</div>
</div>
</div>
</section>
<!-- Archive Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
<!-- Filter Sidebar (Asymmetric) -->
<aside class="lg:col-span-3">
<div class="sticky top-32 space-y-8">
<div>
<h3 class="font-headline font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">JUMP TO</h3>
<ul class="space-y-2 font-label font-bold text-sm">
<li><a class="block hover:bg-black hover:text-white p-1 transition-none underline decoration-2 underline-offset-4" href="#year-2024">2024 (ACTIVE)</a></li>
<li><a class="block hover:bg-black hover:text-white p-1 transition-none" href="#year-2023">2023</a></li>
<li><a class="block hover:bg-black hover:text-white p-1 transition-none" href="#year-2022">2022</a></li>
<li><a class="block hover:bg-black hover:text-white p-1 transition-none" href="#year-2021">2021</a></li>
<li><a class="block hover:bg-black hover:text-white p-1 transition-none" href="#year-2020">OLDER</a></li>
</ul>
</div>
<div>
<h3 class="font-headline font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">CATEGORIES</h3>
<div class="flex flex-wrap gap-2">
<span class="border-2 border-black px-2 py-1 text-xs font-bold uppercase hover:bg-black hover:text-white cursor-pointer">ESSAYS</span>
<span class="border-2 border-black px-2 py-1 text-xs font-bold uppercase hover:bg-black hover:text-white cursor-pointer">MANIFESTOS</span>
<span class="border-2 border-black px-2 py-1 text-xs font-bold uppercase hover:bg-black hover:text-white cursor-pointer">GALLERY</span>
<span class="border-2 border-black px-2 py-1 text-xs font-bold uppercase hover:bg-black hover:text-white cursor-pointer">REVIEWS</span>
</div>
</div>
</div>
</aside>
<!-- Main Content: Dense List -->
<section class="lg:col-span-9 space-y-20">
<!-- Year 2024 -->
<div id="year-2024">
<h2 class="font-headline font-black text-4xl mb-8 border-b-4 border-black">2024</h2>
<div class="space-y-0 border-t-2 border-black">
<!-- Entry Item -->
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">The Architecture of digital noise</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">OCT 12</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Radical Utility in Web Design</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">SEP 29</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Typography as Infrastructure</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">AUG 15</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Post-Standardization Fatigue</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">JUL 03</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">The Grid is a Cage</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">JUN 21</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Raw Materials for Creative Output</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">MAY 11</span>
</a>
</div>
</div>
<!-- Year 2023 -->
<div id="year-2023">
<h2 class="font-headline font-black text-4xl mb-8 border-b-4 border-black">2023</h2>
<div class="space-y-0 border-t-2 border-black">
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Visual Integrity in Low Resolution</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">DEC 30</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">The Mythology of Smoothness</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">NOV 14</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Interface as Literature</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">OCT 05</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Concrete Minimalism 101</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">SEP 22</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Reclaiming the Personal Web</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">AUG 01</span>
</a>
</div>
</div>
<!-- Year 2022 -->
<div id="year-2022">
<h2 class="font-headline font-black text-4xl mb-8 border-b-4 border-black">2022</h2>
<div class="space-y-0 border-t-2 border-black">
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">The Death of the Center-Align</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">FEB 28</span>
</a>
<a class="group flex items-baseline justify-between py-4 border-b-2 border-black hover:bg-primary hover:text-surface px-4 transition-none" href="#">
<span class="font-headline font-bold text-2xl uppercase tracking-tight">Brutalism as an Intellectual Choice</span>
<span class="font-label text-sm uppercase font-black opacity-60 group-hover:opacity-100 whitespace-nowrap ml-4">JAN 15</span>
</a>
</div>
</div>
<!-- Bento Style Callout -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
<div class="p-8 bg-black text-white flex flex-col justify-between">
<h4 class="font-headline font-black text-4xl uppercase tracking-tighter">MISSING SOMETHING?</h4>
<p class="font-body mt-4 mb-8">If you're looking for a specific series or publication, try our advanced search engine.</p>
<button class="border-2 border-white px-6 py-3 font-label font-black uppercase text-sm hover:bg-white hover:text-black transition-none w-fit">OPEN SEARCH</button>
</div>
<div class="p-8 bg-surface-container-highest flex flex-col justify-between border-t-4 md:border-t-0 md:border-l-4 border-black">
<h4 class="font-headline font-black text-4xl uppercase tracking-tighter">SUBSCRIBE TO FEED</h4>
<p class="font-body mt-4 mb-8">Get the raw output delivered to your terminal or reader without the filter of algorithms.</p>
<div class="flex border-4 border-black">
<input class="bg-transparent border-none focus:ring-0 font-label font-bold text-sm p-3 w-full" placeholder="RSS URL / EMAIL" type="text"/>
<button class="bg-black text-white p-3 font-label font-black uppercase text-sm hover:bg-primary-container">GO</button>
</div>
</div>
</div>
</section>
</div>
</main>
<!-- Footer -->
<footer class="w-full border-t-4 border-black mt-20 bg-[#fbfbe2] flex flex-col md:flex-row justify-between items-center px-6 py-12 gap-8">
<div class="flex flex-col items-center md:items-start">
<span class="font-black text-lg font-headline text-black uppercase tracking-tighter">THE RAW INTELLECTUAL</span>
<p class="font-['Space_Grotesk'] font-bold text-xs tracking-widest uppercase mt-2">© 2024 THE RAW INTELLECTUAL</p>
</div>
<div class="flex flex-wrap justify-center gap-8 font-['Space_Grotesk'] font-bold text-sm tracking-widest uppercase">
<a class="underline decoration-4 underline-offset-4 hover:line-through transition-none" href="#">ARCHIVE</a>
<a class="no-underline hover:line-through transition-none" href="#">INDEX</a>
<a class="no-underline hover:line-through transition-none" href="#">RSS</a>
<a class="no-underline hover:line-through transition-none" href="#">STREAMS</a>
</div>
<div class="flex gap-4">
<a class="border-2 border-black p-2 hover:bg-black hover:text-white transition-none active:bg-black active:text-white" href="#">
<span class="material-symbols-outlined" data-icon="terminal">terminal</span>
</a>
<a class="border-2 border-black p-2 hover:bg-black hover:text-white transition-none active:bg-black active:text-white" href="#">
<span class="material-symbols-outlined" data-icon="share">share</span>
</a>
</div>
</footer>
</body></html>

<!-- Blog Post View -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed": "#5e5e5e",
                    "secondary-fixed-dim": "#ababab",
                    "surface-container-high": "#eaead1",
                    "surface-container-lowest": "#ffffff",
                    "surface-tint": "#5f5e5e",
                    "secondary-container": "#d4d4d4",
                    "tertiary": "#3b3b3b",
                    "inverse-on-surface": "#f2f2da",
                    "tertiary-container": "#747474",
                    "outline-variant": "#c6c6c6",
                    "error-container": "#ffdad6",
                    "surface-container-low": "#f5f5dc",
                    "on-primary": "#e5e2e1",
                    "on-primary-container": "#ffffff",
                    "secondary-fixed": "#c6c6c6",
                    "inverse-primary": "#c8c6c5",
                    "on-tertiary-container": "#ffffff",
                    "on-surface": "#1b1d0e",
                    "primary-container": "#3c3b3b",
                    "background": "#fbfbe2",
                    "secondary": "#5e5e5e",
                    "surface-variant": "#e4e4cc",
                    "inverse-surface": "#303221",
                    "on-secondary": "#ffffff",
                    "surface-container": "#efefd7",
                    "on-tertiary-fixed-variant": "#e2e2e2",
                    "on-primary-fixed": "#ffffff",
                    "primary": "#000000",
                    "outline": "#777777",
                    "on-secondary-container": "#1b1b1b",
                    "tertiary-fixed-dim": "#474747",
                    "primary-fixed": "#5f5e5e",
                    "on-secondary-fixed": "#1b1b1b",
                    "on-error": "#ffffff",
                    "error": "#ba1a1a",
                    "on-background": "#1b1d0e",
                    "surface-container-highest": "#e4e4cc",
                    "on-tertiary-fixed": "#ffffff",
                    "on-surface-variant": "#474747",
                    "surface-dim": "#dbdcc4",
                    "primary-fixed-dim": "#474746",
                    "on-error-container": "#410002",
                    "surface": "#fbfbe2",
                    "on-primary-fixed-variant": "#e5e2e1",
                    "on-secondary-fixed-variant": "#3b3b3b",
                    "surface-bright": "#fbfbe2",
                    "on-tertiary": "#e2e2e2"
            },
            "borderRadius": {
                    "DEFAULT": "0px",
                    "lg": "0px",
                    "xl": "0px",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["JetBrains Mono"],
                    "body": ["JetBrains Mono"],
                    "label": ["JetBrains Mono"]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'JetBrains Mono', monospace; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background min-h-screen transition-colors duration-300">
<!-- TopAppBar Component -->
<header class="fixed top-0 w-full border-b-4 border-[#1b1d0e] dark:border-[#f2f2da] bg-[#fbfbe2] dark:bg-[#1A1A1A] z-50 shadow-[4px_4px_0px_0px_rgba(27,29,14,1)] dark:shadow-[4px_4px_0px_0px_rgba(242,242,218,1)]">
<div class="flex items-center justify-between px-6 h-20 w-full max-w-none">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#1b1d0e] dark:text-[#f2f2da]">terminal</span>
<h1 class="text-3xl font-black text-[#1b1d0e] dark:text-[#f2f2da] tracking-tighter uppercase">BRUTALIST ARCHIVE</h1>
</div>
<nav class="hidden md:flex gap-8 items-center font-['JetBrains_Mono'] uppercase tracking-tighter">
<a class="text-[#fbfbe2] bg-[#1b1d0e] dark:text-[#1A1A1A] dark:bg-[#f2f2da] px-2 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(27,29,14,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none" href="#">ARCHIVE</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(27,29,14,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none" href="#">INDEX</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(27,29,14,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none" href="#">LABS</a>
</nav>
<div class="flex items-center">
<span class="material-symbols-outlined text-[#1b1d0e] dark:text-[#f2f2da] cursor-pointer">search</span>
</div>
</div>
</header>
<main class="pt-32 px-6 max-w-7xl mx-auto space-y-24 pb-20">
<!-- Hero Section: The Raw Intellectual -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-primary dark:border-inverse-on-surface bg-surface-container shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(242,242,218,1)]">
<div class="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-primary dark:border-inverse-on-surface">
<div>
<span class="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-outline mb-4 block">ISSUE_NO.042 // MANIFESTO</span>
<h2 class="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-[0.9] mb-8">THE RAW INTELLECTUAL</h2>
<p class="text-lg leading-relaxed max-w-xl mb-12">DECONSTRUCTING THE URBAN LANDSCAPE THROUGH THE LENS OF RADICAL HONESTY. A DISCOURSE ON MATERIALITY, STRUCTURE, AND THE UNYIELDING WEIGHT OF HUMAN PROGRESS.</p>
</div>
<div class="flex gap-4">
<button class="bg-primary text-on-primary px-8 py-4 font-bold uppercase tracking-widest text-sm border-2 border-primary hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none dark:bg-inverse-on-surface dark:text-inverse-surface dark:border-inverse-on-surface">READ_MANIFESTO</button>
<button class="border-2 border-primary dark:border-inverse-on-surface px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-on-primary dark:hover:bg-inverse-on-surface dark:hover:text-inverse-surface transition-all">SUBSCRIBE</button>
</div>
</div>
<div class="lg:col-span-5 relative min-h-[400px]">
<img alt="Brutalist Architecture" class="absolute inset-0 w-full h-full object-cover grayscale contrast-125" data-alt="Monochromatic low angle shot of a massive brutalist concrete building with sharp geometric shadows and high contrast textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKgNi8nc8YQ1e31IjKIu_iD68EoTWx25ma6t1DQVMC08ALnxEpfU1SfBImnpa_eqEHXCMRzkaXU7TpPBWw4CC2-3D9FaymdcvkVxthi0BE2UV8Q5T0Xn79rkY2nkNTf6ZonwoKAdXny-WuYDTZvzbDZCoggKS-1SnkpkPU7KsDGb57yOj7tSVlXcmr9FcmYQ9YdAImBm9Wn0J2pqFaDlKMFig9iTIIvdfbPXIPiCJ4mOoGinyvbLtYbs7AY-_xIKZD-a40yxqY18Er"/>
</div>
</section>
<!-- Featured Post: The Weight of Concrete -->
<section class="space-y-8">
<div class="flex items-end justify-between border-b-4 border-primary dark:border-inverse-on-surface pb-4">
<h3 class="text-2xl font-black uppercase tracking-tighter">FEATURED_ENTRY</h3>
<span class="text-[0.6875rem] font-bold uppercase tracking-widest">SCROLL_FOR_MORE [↓]</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
<div class="group cursor-pointer">
<div class="border-4 border-primary dark:border-inverse-on-surface mb-6 relative overflow-hidden bg-primary shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(242,242,218,1)] transition-all">
<img alt="Concrete Texture" class="w-full aspect-[4/3] object-cover grayscale group-hover:scale-105 transition-transform duration-500" data-alt="Extreme close-up of weathered concrete surface with cracks and industrial grain, dramatic lighting creating deep shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXFH-im-kP3s7SgmbQGVJJzgmd2bx-2RFjNYtYQvfcpQQwtCW2hJLmbhxf2AvvSjtoFGj3XPaukrLydAp9wtNo7FvOMkXlo7DFK6FA6j6r1Rwho-HvUlCbxdFEZZRQB7RUkgFTY70miGKMg90L2DBlQxpd9x7W4UNerg6PSMLWI9_TpW9wKcjddK7Ua2FaLbCNNiVmp7k-w176ukGrCSgPi2c6ptdiMjUu6gMHGnixjhodEVdoNOV3tdZ6sjEvyqiIsUN9FPc72MsT"/>
</div>
<span class="text-[0.6875rem] font-bold uppercase text-outline block mb-2">CATEGORY: MATERIALITY // 2024.10.12</span>
<h4 class="text-4xl font-extrabold tracking-tighter uppercase mb-4 group-hover:underline decoration-8 underline-offset-4">THE WEIGHT OF CONCRETE</h4>
<p class="text-sm leading-relaxed mb-6 opacity-80">AN EXPLORATION INTO THE PERMANENCE OF ARTIFICIAL STONE AND ITS PSYCHOLOGICAL IMPACT ON THE POST-WAR URBAN CITIZEN. WHY WE CRAVE THE MONOLITH.</p>
<a class="font-bold uppercase text-xs border-b-2 border-primary dark:border-inverse-on-surface inline-block" href="#">FULL_ARTICLE.HTML</a>
</div>
<div class="space-y-12">
<!-- Recent Post 1 -->
<div class="flex gap-6 items-start group cursor-pointer border-b-2 border-outline-variant pb-8">
<div class="w-32 h-32 flex-shrink-0 border-2 border-primary dark:border-inverse-on-surface overflow-hidden">
<img alt="Modernist Interior" class="w-full h-full object-cover grayscale group-hover:rotate-3 transition-transform" data-alt="Interior of a modernist library with stark geometric skylights casting sharp patterns on floor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnn9oyqQtAzldkv8eFOY3DxVjR2c2bW7ZJwKEV_7LXxTHeG0fcztQSIykAolpxBad27lGQYIQNZO1werzcPulOazJlpJC9ciI1V7vKMA0hwBg92vTDgjsa58nshmZNNQfIn6q0iFxaofjWtsVWOI9i7qGaRHOMlV_4b2XJgNQxEysNhRyYzrZhsuoZ7g6m9rEWCrBwvptzjgKHhRPWwJXrAi2WXx3K46RiO58etwwIoPfDOaL4il8LOrTSXlhImcqhC0DQWXziO2ZD"/>
</div>
<div>
<span class="text-[0.6875rem] font-bold uppercase text-outline block mb-1">VOIDS // 2024.10.08</span>
<h5 class="text-xl font-bold uppercase tracking-tight mb-2 group-hover:bg-primary group-hover:text-on-primary dark:group-hover:bg-inverse-on-surface dark:group-hover:text-inverse-surface px-1 inline-block transition-colors">THE ANATOMY OF EMPTY SPACE</h5>
<p class="text-xs leading-normal opacity-70">HOW ARCHITECTURAL SILENCE SPEAKS LOUDER THAN ORNAMENTATION IN THE AGE OF NOISE.</p>
</div>
</div>
<!-- Recent Post 2 -->
<div class="flex gap-6 items-start group cursor-pointer border-b-2 border-outline-variant pb-8">
<div class="w-32 h-32 flex-shrink-0 border-2 border-primary dark:border-inverse-on-surface overflow-hidden">
<img alt="Industrial Structure" class="w-full h-full object-cover grayscale group-hover:-rotate-3 transition-transform" data-alt="Tall industrial scaffolding against a stark pale sky, emphasizing linear verticality and structure" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYD544FE-pySIeruF9ESyEyJJBnJoujjE91Oyatom92fs9rHBBVE5A3wl3QVrFbGW_vFe77YAa2EqRIaxeQGWD_X6xPOWA1plOgBvnKbi5WUb054AWCHqIl_PTJGxsvWI_ZYaoK0p-uZQAdvAm5C6A5XmGMb1igYwbiKJSSJpxQ-ox-DPWZW_x3N3uO6aJnSsPwqFQ3GXZ_wCYjuWaEDFw8k9j7iiYe3WUBTDd97o9lsHndYzfnTd1V4xmWbPmRm-V7aBcU37ROugZ"/>
</div>
<div>
<span class="text-[0.6875rem] font-bold uppercase text-outline block mb-1">SKELETONS // 2024.10.05</span>
<h5 class="text-xl font-bold uppercase tracking-tight mb-2 group-hover:bg-primary group-hover:text-on-primary dark:group-hover:bg-inverse-on-surface dark:group-hover:text-inverse-surface px-1 inline-block transition-colors">SCAFFOLDING AS ART</h5>
<p class="text-xs leading-normal opacity-70">RE-EVALUATING TEMPORARY STRUCTURES AS THE HIGHEST FORM OF FUNCTIONAL EXPRESSIONISM.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Asymmetric Bento Grid Section -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="md:col-span-2 border-4 border-primary dark:border-inverse-on-surface p-8 bg-surface-container-high relative overflow-hidden group">
<div class="relative z-10">
<h3 class="text-5xl font-black uppercase tracking-tighter mb-4">ARCHIVE_ACCESS</h3>
<p class="text-sm max-w-md mb-8">BROWSE OVER 4,000 DOCUMENTED ENTRIES OF RAW ARCHITECTURE, TECHNICAL BLUEPRINTS, AND PHILOSOPHICAL TREATISES.</p>
<div class="grid grid-cols-2 gap-4">
<div class="border-2 border-primary dark:border-inverse-on-surface p-4 hover:bg-primary hover:text-on-primary transition-colors cursor-pointer group/item">
<span class="block text-2xl font-black">1950-1970</span>
<span class="text-[0.6875rem] uppercase font-bold group-hover/item:text-surface-tint">THE GOLDEN ERA</span>
</div>
<div class="border-2 border-primary dark:border-inverse-on-surface p-4 hover:bg-primary hover:text-on-primary transition-colors cursor-pointer group/item">
<span class="block text-2xl font-black">1970-1990</span>
<span class="text-[0.6875rem] uppercase font-bold group-hover/item:text-surface-tint">DECAY &amp; REBIRTH</span>
</div>
</div>
</div>
<div class="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-[12rem]" style="font-variation-settings: 'FILL' 1;">architecture</span>
</div>
</div>
<div class="border-4 border-primary dark:border-inverse-on-surface p-8 bg-primary text-on-primary dark:bg-inverse-on-surface dark:text-inverse-surface flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(119,119,119,0.5)]">
<div>
<span class="material-symbols-outlined text-4xl mb-4">mail</span>
<h3 class="text-3xl font-black uppercase tracking-tighter leading-none mb-4">RAW_INTEL WEEKLY</h3>
<p class="text-xs uppercase tracking-widest leading-relaxed mb-8">NO FLUFF. JUST THE RAW ESSENCE OF DESIGN THINKING DELIVERED TO YOUR TERMINAL.</p>
</div>
<div class="space-y-4">
<input class="w-full bg-transparent border-2 border-on-primary dark:border-inverse-surface p-3 text-sm focus:outline-none placeholder:text-on-primary/50" placeholder="USER@STATION.COM" type="email"/>
<button class="w-full bg-on-primary text-primary dark:bg-inverse-surface dark:text-inverse-on-surface font-bold uppercase py-3 tracking-widest text-sm hover:scale-[0.98] transition-transform">INITIALIZE_LINK</button>
</div>
</div>
</section>
</main>
<!-- Footer Component -->
<footer class="w-full border-t-4 border-[#1b1d0e] dark:border-[#f2f2da] mt-20 bg-[#fbfbe2] dark:bg-[#1A1A1A]">
<div class="flex flex-col md:flex-row justify-between items-center p-8 w-full gap-4 max-w-7xl mx-auto">
<div class="flex items-center gap-6">
<span class="text-lg font-bold text-[#1b1d0e] dark:text-[#f2f2da] font-['JetBrains_Mono'] uppercase tracking-widest">©2024 BRUTALIST_ARCHIVE.V1</span>
</div>
<div class="flex gap-8 font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest">
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors duration-100" href="#">ARCHIVE</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors duration-100" href="#">INDEX</a>
<a class="text-[#1b1d0e] dark:text-[#f2f2da] hover:bg-[#1b1d0e] hover:text-[#fbfbe2] dark:hover:bg-[#f2f2da] dark:hover:text-[#1A1A1A] px-1 transition-colors duration-100 underline decoration-4 underline-offset-4" href="#">RSS</a>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined cursor-pointer hover:rotate-12 transition-transform">terminal</span>
<span class="material-symbols-outlined cursor-pointer hover:rotate-12 transition-transform">code</span>
</div>
</div>
</footer>
</body></html>