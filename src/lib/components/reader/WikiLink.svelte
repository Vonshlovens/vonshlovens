<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		slug: string;
		children: Snippet;
	}

	let { slug, children }: Props = $props();
</script>

<a class="wl" href={`/writing/${slug}`} data-slug={slug}>{@render children()}</a>
