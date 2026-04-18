<script lang="ts">
	import { Dialog } from 'bits-ui';
	import Icon from '$lib/components/ui/Icon.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	interface NavItem {
		label: string;
		href: string;
	}

	interface Props {
		title?: string;
		items?: NavItem[];
		active?: string;
	}

	let {
		title = 'VONSHLOVENS',
		items = [
			{ label: 'Writing', href: '/' },
			{ label: 'Notes', href: '/notes' },
			{ label: 'About', href: '/about' }
		],
		active = 'Writing'
	}: Props = $props();

	let menuOpen = $state(false);
</script>

<header
	class="fixed inset-x-0 top-0 z-50 border-b-4 border-ink bg-surface shadow-brut"
>
	<div class="flex w-full items-center justify-between px-6 py-4">
		<div class="flex items-center gap-4">
			<Dialog.Root bind:open={menuOpen}>
				<Dialog.Trigger
					class="flex items-center justify-center border-2 border-transparent p-2 transition-colors hover:bg-ink hover:text-surface md:hidden"
					aria-label="Open menu"
				>
					<Icon name="menu" size={24} />
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay
						class="fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out"
					/>
					<Dialog.Content
						class="fixed left-0 top-0 z-50 flex h-dvh w-[min(20rem,85vw)] flex-col border-r-4 border-ink bg-surface shadow-brut-xl"
					>
						<div class="flex items-center justify-between border-b-4 border-ink px-6 py-4">
							<Dialog.Title class="font-display text-lg font-black uppercase tracking-tighter">
								Menu
							</Dialog.Title>
							<Dialog.Close
								class="flex items-center justify-center border-2 border-transparent p-2 hover:bg-ink hover:text-surface"
								aria-label="Close menu"
							>
								<Icon name="close" size={20} />
							</Dialog.Close>
						</div>
						<nav class="flex flex-col">
							{#each items as item (item.href)}
								<a
									href={item.href}
									class="border-b-2 border-rule-faint px-6 py-5 font-display text-2xl font-black uppercase tracking-tighter transition-colors hover:bg-ink hover:text-surface"
									class:bg-accent={item.label === active}
									class:text-on-accent={item.label === active}
								>
									{item.label}
								</a>
							{/each}
						</nav>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>

			<a
				href="/"
				class="font-display text-2xl font-black uppercase tracking-tighter text-ink focus:outline-none"
			>
				{title}
			</a>
		</div>

		<nav
			class="hidden items-center gap-8 font-display font-bold uppercase tracking-tighter md:flex"
		>
			{#each items as item (item.href)}
				{@const isActive = item.label === active}
				<a
					href={item.href}
					class="px-2 transition-colors hover:bg-ink hover:text-surface"
					class:bg-accent={isActive}
					class:text-on-accent={isActive}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-1">
			<ThemeToggle />
			<button
				type="button"
				class="flex items-center justify-center border-2 border-transparent p-2 transition-colors hover:bg-ink hover:text-surface"
				aria-label="Search"
			>
				<Icon name="search" size={24} />
			</button>
		</div>
	</div>
</header>
