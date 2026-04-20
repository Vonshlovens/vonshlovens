<script lang="ts">
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { ArticleMeta } from '$lib/content/types';

	interface Props {
		meta: ArticleMeta;
		figLabel?: string;
	}

	let { meta, figLabel = 'FIG. 01 · HELLO-WORLD' }: Props = $props();
</script>

<header class="article-masthead border-b-4 border-ink bg-surface">
	<div class="mx-auto max-w-7xl px-6 pt-12 pb-10">
		<div class="mb-7 flex flex-wrap items-center gap-4">
			<Tag variant="solid">{meta.tag}</Tag>
			<span class="font-mono text-xs font-bold uppercase tracking-widest text-ink-muted">
				{meta.published} · {meta.readingTime} read
			</span>
			<span
				class="ml-auto font-mono text-xs font-bold uppercase tracking-widest text-ink-muted"
			>
				{figLabel}
			</span>
		</div>

		<h1
			class="mb-8 whitespace-pre-line font-display font-black uppercase leading-[0.9] tracking-tightest"
			style="font-size: clamp(3rem, 7.5vw, 5.75rem);"
		>
			{meta.title}
		</h1>

		<p class="mb-8 max-w-[640px] font-sans text-xl font-medium leading-[1.5]">
			{meta.dek}
		</p>

		<div class="flex flex-wrap gap-8 border-t-2 border-ink pt-6">
			<div class="flex flex-col gap-1">
				<span class="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted">
					Published
				</span>
				<span class="font-mono text-sm font-bold uppercase tracking-wide">{meta.published}</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted">
					Updated
				</span>
				<span class="font-mono text-sm font-bold uppercase tracking-wide">{meta.updated}</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted">
					Words
				</span>
				<span class="font-mono text-sm font-bold uppercase tracking-wide">{meta.wordCount}</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted">
					Status
				</span>
				<span class="font-mono text-sm font-bold uppercase tracking-wide">{meta.status}</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted">
					Tags
				</span>
				<span class="flex flex-wrap gap-1.5">
					{#each meta.tags as t (t)}
						<Tag>{t}</Tag>
					{/each}
				</span>
			</div>
		</div>
	</div>
</header>
