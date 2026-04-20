<script lang="ts">
	import { onMount } from 'svelte';
	import type { TocEntry } from '$lib/content/types';

	interface Props {
		items: TocEntry[];
	}

	let { items }: Props = $props();

	let activeId = $state('');

	onMount(() => {
		activeId = items[0]?.id ?? '';
		const ids = items.map((t) => t.id);
		const els = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (!els.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) activeId = e.target.id;
				}
			},
			{ rootMargin: '-120px 0px -70% 0px', threshold: 0 }
		);

		for (const el of els) observer.observe(el);
		return () => observer.disconnect();
	});

	function jumpTo(event: MouseEvent, id: string) {
		event.preventDefault();
		const target =
			document.getElementById(id) ?? document.querySelector(`[data-sec="${id}"]`);
		if (target instanceof HTMLElement) {
			window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
		}
	}
</script>

<nav class="toc-rail" aria-label="On this page">
	<h4
		class="mb-4 border-b-2 border-ink pb-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]"
	>
		On this page
	</h4>
	<ol class="flex list-none flex-col gap-2.5 p-0">
		{#each items as item (item.id)}
			<li>
				<a
					href="#{item.id}"
					onclick={(e) => jumpTo(e, item.id)}
					class="toc-link grid grid-cols-[28px_1fr] gap-2 px-1.5 py-1 font-mono text-xs font-bold leading-[1.4] tracking-wide text-ink-muted no-underline transition-all"
					class:active={activeId === item.id}
				>
					<span class="n text-ink-muted">{item.n}</span>
					<span>{item.label}</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>
