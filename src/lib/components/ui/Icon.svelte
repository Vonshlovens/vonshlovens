<script lang="ts">
	interface Props {
		name: string;
		class?: string;
		size?: number;
		fill?: 0 | 1;
		weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	}

	let {
		name,
		class: className = '',
		size = 24,
		fill = 0,
		weight = 400
	}: Props = $props();
</script>

<span
	aria-hidden="true"
	class="material-symbols-outlined leading-none {className}"
	style="font-size: {size}px; font-variation-settings: 'FILL' {fill}, 'wght' {weight}, 'GRAD' 0, 'opsz' {size};"
>
	{name}
</span>
