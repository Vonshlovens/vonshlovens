<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	let show = $state(false);

	onMount(() => {
		const onScroll = () => {
			show = window.scrollY > 600;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function toTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<button
	type="button"
	aria-label="Back to top"
	onclick={toTop}
	class="back-to-top fixed right-6 z-[55] flex h-11 w-11 items-center justify-center border-2 border-ink bg-surface text-ink transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut"
	class:pointer-events-none={!show}
	class:opacity-0={!show}
	class:opacity-100={show}
	style="bottom: 120px;"
>
	<Icon name="arrow_upward" size={22} />
</button>
