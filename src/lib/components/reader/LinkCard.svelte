<script lang="ts">
	import type { LinkRef } from '$lib/content/types';

	interface Props {
		item: LinkRef;
		direction: 'in' | 'out';
	}

	let { item, direction }: Props = $props();

	const isIncoming = $derived(direction === 'in');
</script>

<a
	class="link-card relative mb-2.5 block border-2 border-ink p-4 no-underline transition-all duration-100 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut active:translate-x-0 active:translate-y-0 active:shadow-none"
	class:bg-surface-container-high={isIncoming}
	class:bg-surface={!isIncoming}
	href={`/writing/${item.slug}`}
>
	<div class="mb-1.5 flex justify-between gap-2">
		<span class="font-mono text-[0.625rem] font-bold uppercase tracking-widest text-ink-muted">
			{item.date}
		</span>
		<span class="font-mono text-[0.625rem] font-bold uppercase tracking-widest text-ink-muted">
			{isIncoming ? '← Links here' : '→ Links out'}
		</span>
	</div>
	<h5
		class="mb-1.5 font-display text-base font-black uppercase leading-[1.05] tracking-tighter"
	>
		{item.title}
	</h5>
	<p class="m-0 max-w-none font-sans text-[0.8125rem] leading-[1.5] text-ink-muted">
		{item.blurb}
	</p>
	<div class="mt-2.5 flex flex-wrap gap-1.5">
		<span class="font-mono text-[0.5625rem] font-bold uppercase tracking-widest text-ink-muted">
			{item.tag}
		</span>
	</div>
</a>
