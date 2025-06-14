<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	onMount(() => {
		// For GitHub Pages compatibility, redirect 404s to index
		goto('/', { replaceState: true });
	});
</script>

<svelte:head>
	<title>Page Not Found - vonshlovens</title>
	<meta name="description" content="Page not found" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4">
	<div class="text-center">
		<h1 class="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
		<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
		<a href="/" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
			Go Home
		</a>
	</div>
</div>
