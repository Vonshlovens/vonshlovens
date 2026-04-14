<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type Variant = 'solid' | 'outline' | 'ghost';
	type Size = 'sm' | 'md' | 'lg';

	type Props = {
		variant?: Variant;
		size?: Size;
		class?: string;
		children: Snippet;
	} & (
		| ({ href: string } & Omit<HTMLAnchorAttributes, 'class' | 'children'>)
		| ({ href?: undefined } & Omit<HTMLButtonAttributes, 'class' | 'children'>)
	);

	let {
		variant = 'solid',
		size = 'md',
		class: className = '',
		href,
		children,
		...rest
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-widest ' +
		'border-2 border-ink transition-transform duration-100 ease-out ' +
		'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut ' +
		'active:translate-x-0 active:translate-y-0 active:shadow-none ' +
		'disabled:opacity-50 disabled:pointer-events-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0';

	const variants: Record<Variant, string> = {
		solid: 'bg-accent text-on-accent',
		outline: 'bg-transparent text-ink hover:bg-accent hover:text-on-accent',
		ghost: 'border-transparent text-ink hover:bg-ink hover:text-surface'
	};

	const sizes: Record<Size, string> = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};

	const cls = $derived(`${base} ${variants[variant]} ${sizes[size]} ${className}`);
</script>

{#if href}
	<a {href} class={cls} {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button type="button" class={cls} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
