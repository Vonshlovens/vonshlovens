<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		target: HTMLElement | null;
	}

	let { target }: Props = $props();

	let pct = $state(0);

	onMount(() => {
		const onScroll = () => {
			if (!target) return;
			const rect = target.getBoundingClientRect();
			const total = Math.max(1, target.offsetHeight - window.innerHeight);
			const scrolled = Math.min(total, Math.max(0, -rect.top));
			pct = (scrolled / total) * 100;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<div class="reader-progress" aria-hidden="true">
	<div class="reader-progress-fill" style:width="{pct}%"></div>
</div>
