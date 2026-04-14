<script lang="ts">
	type Variant = 'concrete' | 'grid' | 'stacks' | 'slab';

	interface Props {
		variant?: Variant;
		label?: string;
		class?: string;
	}

	let { variant = 'concrete', label, class: className = '' }: Props = $props();
</script>

<div
	class="relative isolate overflow-hidden bg-surface-container-highest text-ink {className}"
	role="img"
	aria-label={label ?? 'Illustrative placeholder'}
>
	<svg
		viewBox="0 0 400 225"
		preserveAspectRatio="xMidYMid slice"
		class="absolute inset-0 h-full w-full"
		aria-hidden="true"
	>
		{#if variant === 'concrete'}
			<rect x="0" y="0" width="400" height="225" class="fill-surface-container-high" />
			<rect x="40" y="30" width="80" height="195" class="fill-ink" opacity="0.45" />
			<rect x="130" y="60" width="80" height="165" class="fill-ink" opacity="0.25" />
			<rect x="220" y="15" width="80" height="210" class="fill-ink" opacity="0.8" />
			<rect x="310" y="80" width="60" height="145" class="fill-ink" opacity="0.35" />
			{#each Array(8) as _, i (i)}
				<rect
					x={45 + i * 9}
					y={35 + (i % 3) * 55}
					width="5"
					height="12"
					class="fill-surface"
				/>
			{/each}
		{:else if variant === 'grid'}
			<rect x="0" y="0" width="400" height="225" class="fill-surface-container-high" />
			{#each Array(9) as _, i (i)}
				<line
					x1={i * 50}
					y1="0"
					x2={i * 50}
					y2="225"
					class="stroke-ink"
					stroke-width="2"
				/>
			{/each}
			{#each Array(6) as _, i (i)}
				<line
					x1="0"
					y1={i * 45}
					x2="400"
					y2={i * 45}
					class="stroke-ink"
					stroke-width="2"
				/>
			{/each}
			<rect x="100" y="45" width="100" height="90" class="fill-ink" />
		{:else if variant === 'stacks'}
			<rect x="0" y="0" width="400" height="225" class="fill-surface-container" />
			{#each Array(12) as _, i (i)}
				{@const h = 40 + ((i * 37) % 140)}
				<rect
					x={10 + i * 32}
					y={225 - h}
					width="24"
					height={h}
					class="fill-ink"
					opacity={i % 2 === 0 ? 1 : 0.55}
				/>
			{/each}
		{:else}
			<rect x="0" y="0" width="400" height="225" class="fill-ink" />
			<rect x="0" y="170" width="400" height="55" class="fill-surface" />
			<rect x="40" y="40" width="320" height="4" class="fill-surface" />
			<rect x="40" y="60" width="200" height="4" class="fill-surface" />
			<circle cx="320" cy="110" r="50" class="fill-surface" />
		{/if}
	</svg>

	{#if label}
		<span
			class="absolute bottom-3 left-3 z-10 bg-accent px-2 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-widest text-on-accent"
		>
			{label}
		</span>
	{/if}
</div>
