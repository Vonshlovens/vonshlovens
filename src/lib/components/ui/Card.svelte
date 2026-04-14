<script lang="ts">
	import type { Snippet } from 'svelte';

	type Tone = 'surface' | 'surface-high' | 'accent';

	interface Props {
		tone?: Tone;
		interactive?: boolean;
		as?: 'article' | 'div' | 'section';
		href?: string;
		class?: string;
		children: Snippet;
	}

	let {
		tone = 'surface',
		interactive = false,
		as = 'article',
		href,
		class: className = '',
		children
	}: Props = $props();

	const tones: Record<Tone, string> = {
		surface: 'bg-surface text-ink',
		'surface-high': 'bg-surface-container-high text-ink',
		accent: 'bg-accent text-on-accent'
	};

	const base = 'block border-4 border-ink shadow-brut-lg';
	const hover =
		'transition-transform duration-100 ease-out ' +
		'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-xl ' +
		'motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0';

	const cls = $derived(
		`${base} ${tones[tone]} ${interactive || href ? hover : ''} ${className}`
	);
</script>

{#if href}
	<a {href} class={cls}>{@render children()}</a>
{:else if as === 'article'}
	<article class={cls}>{@render children()}</article>
{:else if as === 'section'}
	<section class={cls}>{@render children()}</section>
{:else}
	<div class={cls}>{@render children()}</div>
{/if}
