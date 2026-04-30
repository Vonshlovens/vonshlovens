---
name: svelte5-gotchas
description: Svelte 5 runes syntax and project-specific gotchas. Load when editing `.svelte` or `.svelte.ts` files, when encountering `ReferenceError: $state is not defined`, `effect_orphan`, `<svelte:component>` deprecation warnings, `{@const}` placement errors, or when writing new stores/utilities that use runes. Covers the runes vs Svelte 4 table and the common traps in this codebase.
---

# Svelte 5 (NOT Svelte 4)

**Always use Svelte 5 runes syntax. Never use Svelte 4 patterns.**

| Category | ✅ Svelte 5 | ❌ Svelte 4 (DO NOT USE) |
|----------|-------------|--------------------------|
| **State** | `let count = $state(0);` | `let count = 0;` |
| **Derived** | `const doubled = $derived(count * 2);` | `$: doubled = count * 2;` |
| **Effects** | `$effect(() => { ... });` | `$: { ... }` |
| **Props** | `let { foo, bar } = $props();` | `export let foo;` |
| **Events** | `onclick={handler}` | `on:click={handler}` |
| **Custom events** | Pass callback props: `onsave={fn}` | `createEventDispatcher` |
| **Slots** | `{@render children()}` | `<slot />` |

Stores (`writable`, `$store`) are supported but prefer runes for component state.

## Gotchas

### `<svelte:component>` is deprecated

In runes mode, components are dynamic by default. Use the component directly:

```svelte
<!-- WRONG — triggers deprecation warning -->
<svelte:component this={pipeline.icon} class="h-4 w-4" />

<!-- RIGHT — components are already dynamic in Svelte 5 -->
<pipeline.icon class="h-4 w-4" />
```

### `{@const}` placement is restricted

`{@const}` can only be an immediate child of `{#if}`, `{:else}`, `{#each}`, `{:then}`, `{:catch}`, `{#snippet}`, `<svelte:fragment>`, `<svelte:boundary>`, or `<Component>`. It **cannot** be placed inside plain HTML elements.

```svelte
<!-- WRONG — @const inside <button> -->
<button>
  {@const Icon = item.icon}
  <Icon />
</button>

<!-- RIGHT — use @const inside the {#each} block, before the element -->
{#each items as item}
  {@const Icon = item.icon}
  <button><Icon /></button>
{/each}

<!-- ALSO RIGHT — just reference the property directly -->
<button><item.icon class="h-4 w-4" /></button>
```

### Runes require `.svelte.ts` file extension

`$state`, `$derived`, `$effect`, and other runes are **compiler transforms** — they only work in `.svelte` and `.svelte.ts` files. Plain `.ts` files are not processed by the Svelte compiler, so runes are literally `undefined` at runtime, causing `ReferenceError: $state is not defined`.

Any utility or store that uses runes **must** have a `.svelte.ts` extension:

```
// WRONG — plain .ts file, runes are undefined at runtime
src/lib/utils/page-snapshot.ts        ❌

// RIGHT — .svelte.ts tells the compiler to transform runes
src/lib/utils/page-snapshot.svelte.ts ✅
src/lib/stores/notifications.svelte.ts ✅
```

This is the most common cause of `ReferenceError: $state is not defined` 500 errors in production.

### Melt builders must be created at component init time

Melt builders (e.g., `Tree`, `Select`, `Tabs` from `melt/builders`) use `$effect` internally. Creating them inside an async callback (like `onMount` → `await fetch()`) runs outside Svelte's component context and throws `effect_orphan`. Always create builders synchronously at the top level of `<script>`, using getter functions for reactive data.

```typescript
// WRONG — async callback is outside component context
onMount(async () => {
  const data = await fetch(...);
  tree = new Tree({ items: data.items }); // 💥 effect_orphan
});

// RIGHT — create at component init, use getter for reactivity
let items = $state([]);
const tree = new Tree({ items: () => items }); // ✅ sync init

onMount(async () => {
  const data = await fetch(...);
  items = data.items;       // getter re-reads automatically
  tree.expandAll();          // imperative calls are fine post-init
});
```
