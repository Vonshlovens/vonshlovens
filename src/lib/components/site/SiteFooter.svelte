<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';

	interface Props {
		title?: string;
		year?: number;
	}

	let { title = 'VONSHLOVENS', year = new Date().getFullYear() }: Props = $props();

	const links = [
		{ label: 'Writing', href: '/', active: true },
		{ label: 'Notes', href: '/notes' },
		{ label: 'About', href: '/about' },
		{ label: 'RSS', href: '/rss.xml' }
	];
</script>

<footer class="mt-20 w-full border-t-4 border-ink bg-surface">
	<div
		class="flex w-full flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row"
	>
		<div class="flex flex-col gap-2">
			<span class="font-display text-lg font-black uppercase tracking-tighter">
				{title}
			</span>
			<p class="font-mono text-xs font-bold uppercase tracking-widest opacity-60">
				© {year} {title}
			</p>
		</div>

		<nav class="flex flex-wrap justify-center gap-8">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="font-mono text-sm font-bold uppercase tracking-widest transition-all hover:line-through"
					class:underline={link.active}
					class:decoration-4={link.active}
					class:underline-offset-4={link.active}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex gap-4">
			<a
				href="/share"
				aria-label="Share"
				class="flex h-12 w-12 items-center justify-center border-2 border-ink transition-colors hover:bg-ink hover:text-surface"
			>
				<Icon name="share" size={20} />
			</a>
			<a
				href="mailto:hello@vonshlovens.com"
				aria-label="Email"
				class="flex h-12 w-12 items-center justify-center border-2 border-ink transition-colors hover:bg-ink hover:text-surface"
			>
				<Icon name="mail" size={20} />
			</a>
		</div>
	</div>
</footer>
