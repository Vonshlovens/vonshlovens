<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'outline' | 'solid' | 'inverse';

	interface Props {
		variant?: Variant;
		class?: string;
		children: Snippet;
	}

	let { variant = 'outline', class: className = '', children }: Props = $props();

	const variants: Record<Variant, string> = {
		outline: 'border-2 border-ink text-ink',
		solid: 'bg-accent text-on-accent',
		inverse: 'border-2 border-on-accent text-on-accent'
	};
</script>

<span
	class="inline-flex items-center px-2 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-widest {variants[
		variant
	]} {className}"
>
	{@render children()}
</span>
