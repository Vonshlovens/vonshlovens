<script lang="ts">
	import LinkCard from './LinkCard.svelte';
	import type { ArticleLinks } from '$lib/content/types';

	interface Props {
		links: ArticleLinks;
	}

	let { links }: Props = $props();

	function pad(n: number) {
		return String(n).padStart(2, '0');
	}
</script>

<aside class="flex flex-col gap-7">
	<section>
		<h4
			class="mb-3 flex items-baseline justify-between border-b-2 border-ink pb-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]"
		>
			Outgoing
			<span class="text-[0.625rem] text-ink-muted">{pad(links.outgoing.length)}</span>
		</h4>
		<ul class="m-0 flex list-none flex-col p-0">
			{#each links.outgoing as item (item.slug)}
				<li>
					<LinkCard {item} direction="out" />
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h4
			class="mb-3 flex items-baseline justify-between border-b-2 border-ink pb-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]"
		>
			Backlinks
			<span class="text-[0.625rem] text-ink-muted">{pad(links.incoming.length)}</span>
		</h4>
		<ul class="m-0 flex list-none flex-col p-0">
			{#each links.incoming as item (item.slug)}
				<li>
					<LinkCard {item} direction="in" />
				</li>
			{/each}
		</ul>
	</section>
</aside>
