<script lang="ts">
	import ArticleMasthead from '$lib/components/reader/ArticleMasthead.svelte';
	import ReadingProgressBar from '$lib/components/reader/ReadingProgressBar.svelte';
	import TocRail from '$lib/components/reader/TocRail.svelte';
	import LinksRail from '$lib/components/reader/LinksRail.svelte';
	import BackToTop from '$lib/components/reader/BackToTop.svelte';
	import ChatDock from '$lib/components/reader/ChatDock.svelte';
	import HelloWorldBody from '$lib/content/hello-world.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Currently only one fixture; the body is chosen by slug once more land.
	const bodyComponents = {
		'hello-world': HelloWorldBody
	} as const;

	type Slug = keyof typeof bodyComponents;

	const Body = $derived(bodyComponents[data.slug as Slug]);

	// "right-only" matches the default layout in the design.
	const layout = 'right-only';

	let articleEl = $state<HTMLElement | null>(null);
</script>

<svelte:head>
	<title>{data.meta.title.replace(/\n/g, ' ')} — Vonshlovens</title>
	<meta name="description" content={data.meta.dek} />
	<style>body { padding-bottom: 120px }</style>
</svelte:head>

<ReadingProgressBar target={articleEl} />

<div class="reader-page">
	<ArticleMasthead meta={data.meta} />

	<div bind:this={articleEl} class="mx-auto max-w-7xl px-6">
		<div class="reader-grid {layout}">
			<article class="article-prose" id="article-body">
				<div id="sec-intro" data-sec="sec-intro"></div>
				{#if Body}
					<Body />
				{:else}
					<p>Article body is not available for this slug.</p>
				{/if}
			</article>

			<div class="reader-aside">
				<LinksRail links={data.links} />
			</div>
		</div>
	</div>
</div>

<BackToTop />

<ChatDock
	prompts={data.prompts}
	articleTitle={data.meta.title.replace(/\n/g, ' ')}
	wordCount={data.meta.wordCount}
/>
