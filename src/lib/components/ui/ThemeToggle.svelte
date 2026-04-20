<script lang="ts">
	import { mode, toggleMode } from 'mode-watcher';
	import Icon from './Icon.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const isDark = $derived(mode.current === 'dark');
</script>

<button
	type="button"
	onclick={toggleMode}
	aria-label="Toggle theme"
	title="Toggle theme"
	class="flex items-center justify-center border-2 border-transparent p-2 transition-colors hover:bg-ink hover:text-surface {className}"
>
	{#if isDark}
		<Icon name="light_mode" size={24} />
	{:else}
		<Icon name="dark_mode" size={24} />
	{/if}
</button>
