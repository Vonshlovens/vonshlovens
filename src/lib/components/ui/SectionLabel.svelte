<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class="flex items-center gap-4 {className}">
	<div class="h-1 flex-grow bg-ink" aria-hidden="true"></div>
	<h2 class="font-display text-2xl font-black uppercase tracking-[0.2em] whitespace-nowrap">
		{@render children()}
	</h2>
	<div class="h-1 flex-grow bg-ink" aria-hidden="true"></div>
</div>
