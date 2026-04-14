<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import Placeholder from '$lib/components/ui/Placeholder.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	const featured = {
		href: '/posts/weight-of-concrete',
		title: 'The Weight of Concrete in the Digital Age',
		blurb:
			'An exploration into why heavy, structural aesthetics are making a comeback in the fluid world of web design.',
		tags: ['Architecture', 'Modernism']
	};

	const secondaries = [
		{
			href: '/posts/typography-as-infrastructure',
			date: '18 OCT 2024',
			title: 'Typography as Infrastructure',
			blurb: 'Using Space Grotesk to define physical boundaries within a 12-column grid system.',
			tags: ['Design', 'Type'],
			tone: 'surface-high' as const
		},
		{
			href: '/posts/death-of-the-gradient',
			date: '12 OCT 2024',
			title: 'The Death of the Gradient',
			blurb: 'Why solid color blocks offer more clarity than the skeuomorphism of the early 2010s.',
			tags: ['Critique'],
			tone: 'accent' as const
		}
	];

	const wideSecondary = {
		href: '/posts/grid-as-truth',
		date: '05 OCT 2024',
		title: 'Grid as the Ultimate Truth',
		blurb:
			"Everything exists within the lines. If it doesn't align, it doesn't belong in the archive.",
		cta: 'Access Logs'
	};

	const collections = [
		{ n: '01', title: 'Systemic Failure', href: '/c/systemic-failure', meta: 'Essay, Web' },
		{ n: '02', title: 'Raw Data Input', href: '/c/raw-data-input', meta: 'Research' },
		{
			n: '03',
			title: 'The Anti-Fluid Manifesto',
			href: '/c/anti-fluid-manifesto',
			meta: 'Manifesto'
		}
	];
</script>

<div class="mx-auto max-w-7xl px-6 pb-20 pt-8 md:pt-12">
	<!-- HERO -->
	<section class="mb-24">
		<h1
			class="mb-12 font-display text-[clamp(3.5rem,10vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter"
		>
			The Raw<br />Intellectual
		</h1>
		<div class="grid grid-cols-1 gap-12 border-t-4 border-ink pt-8 md:grid-cols-2">
			<p
				class="max-w-xl font-sans text-xl font-medium leading-relaxed md:text-2xl"
			>
				A digital broadsheet cataloging the intersection of structural minimalism, archival
				research, and brutalist web architecture.
			</p>
			<div class="flex flex-col items-start justify-end gap-4 md:items-end">
				<Tag variant="solid">Issue No. 042</Tag>
				<span class="font-mono text-xs font-bold uppercase tracking-widest">
					Updated: 24 Oct 2024
				</span>
			</div>
		</div>
	</section>

	<!-- BENTO -->
	<div class="mb-20 grid grid-cols-1 gap-8 md:grid-cols-12">
		<!-- Featured -->
		<Card href={featured.href} class="group md:col-span-8">
			<div class="relative aspect-video w-full border-b-4 border-ink">
				<Placeholder variant="concrete" class="absolute inset-0" label="Fig. 01" />
				<div
					class="absolute left-4 top-4 bg-accent px-4 py-2 font-mono text-lg font-bold uppercase tracking-widest text-on-accent"
				>
					Featured
				</div>
			</div>
			<div class="p-8">
				<div class="mb-6 flex flex-wrap gap-3">
					{#each featured.tags as tag (tag)}
						<Tag>{tag}</Tag>
					{/each}
				</div>
				<h3
					class="mb-6 font-display text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl"
				>
					{featured.title}
				</h3>
				<div class="flex items-end justify-between gap-8">
					<p class="hidden max-w-md font-sans text-lg md:block">{featured.blurb}</p>
					<span class="whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest">
						Read More →
					</span>
				</div>
			</div>
		</Card>

		<!-- Secondary 1 -->
		<Card href={secondaries[0].href} tone={secondaries[0].tone} class="md:col-span-4">
			<div class="flex h-full flex-col justify-between p-8">
				<div>
					<span class="mb-4 block font-mono text-sm font-bold uppercase tracking-widest">
						{secondaries[0].date}
					</span>
					<h3
						class="mb-4 font-display text-3xl font-black uppercase leading-none tracking-tighter"
					>
						{secondaries[0].title}
					</h3>
					<p class="mb-6 font-sans text-sm">{secondaries[0].blurb}</p>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each secondaries[0].tags as tag (tag)}
						<Tag>{tag}</Tag>
					{/each}
				</div>
			</div>
		</Card>

		<!-- Secondary 2 (inverse / accent) -->
		<Card href={secondaries[1].href} tone={secondaries[1].tone} class="md:col-span-4">
			<div class="flex h-full flex-col justify-between p-8">
				<div>
					<span
						class="mb-4 block font-mono text-sm font-bold uppercase tracking-widest opacity-60"
					>
						{secondaries[1].date}
					</span>
					<h3
						class="mb-4 font-display text-3xl font-black uppercase leading-none tracking-tighter"
					>
						{secondaries[1].title}
					</h3>
					<p class="mb-6 font-sans text-sm">{secondaries[1].blurb}</p>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each secondaries[1].tags as tag (tag)}
						<Tag variant="inverse">{tag}</Tag>
					{/each}
				</div>
			</div>
		</Card>

		<!-- Wide secondary -->
		<Card class="md:col-span-8">
			<div class="grid grid-cols-1 items-stretch md:grid-cols-2">
				<div class="order-2 flex flex-col justify-center p-8 md:order-1">
					<span class="mb-4 block font-mono text-sm font-bold uppercase tracking-widest">
						{wideSecondary.date}
					</span>
					<h3
						class="mb-4 font-display text-4xl font-black uppercase leading-none tracking-tighter"
					>
						{wideSecondary.title}
					</h3>
					<p class="mb-6 font-sans text-base">{wideSecondary.blurb}</p>
					<div>
						<Button href={wideSecondary.href} variant="solid" size="lg">
							{wideSecondary.cta}
						</Button>
					</div>
				</div>
				<div
					class="order-1 min-h-[200px] border-b-4 border-ink md:order-2 md:border-b-0 md:border-l-4"
				>
					<Placeholder variant="grid" class="h-full w-full" label="Fig. 02" />
				</div>
			</div>
		</Card>
	</div>

	<!-- SECTION LABEL -->
	<SectionLabel class="mb-12">Collections</SectionLabel>

	<!-- ASYMMETRIC LIST -->
	<ul class="space-y-0">
		{#each collections as entry (entry.href)}
			<li>
				<a
					href={entry.href}
					class="group flex flex-col justify-between gap-4 border-b-4 border-ink px-4 py-8 transition-colors hover:bg-ink hover:text-surface md:flex-row md:items-center"
				>
					<span class="font-mono text-lg font-bold">{entry.n}</span>
					<h4
						class="flex-grow font-display text-3xl font-black uppercase tracking-tighter md:ml-12 md:text-5xl"
					>
						{entry.title}
					</h4>
					<div class="flex items-center gap-8">
						<span class="hidden font-mono text-sm uppercase tracking-widest md:block">
							Categories: {entry.meta}
						</span>
						<Icon name="north_east" size={36} />
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
