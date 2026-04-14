<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import TopAppBar from '$lib/components/site/TopAppBar.svelte';
	import SiteFooter from '$lib/components/site/SiteFooter.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-dvh flex-col bg-surface text-ink">
	<TopAppBar />
	<main class="flex-1 pt-24">
		{@render children()}
	</main>
	<SiteFooter />
</div>
