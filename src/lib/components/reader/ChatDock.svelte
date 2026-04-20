<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { PromptSpec, ReplySegment } from '$lib/content/types';

	interface Props {
		prompts: PromptSpec[];
		articleTitle: string;
		wordCount: number;
	}

	let { prompts, articleTitle, wordCount }: Props = $props();

	type Message =
		| { role: 'user'; text: string }
		| { role: 'assistant'; segments: ReplySegment[] };

	let open = $state(false);
	let messages = $state<Message[]>([]);
	let input = $state('');
	let pending = $state(false);
	let scrollRef = $state<HTMLElement | null>(null);

	$effect(() => {
		// Depend on messages length and open state.
		messages.length;
		open;
		if (scrollRef) {
			scrollRef.scrollTop = scrollRef.scrollHeight;
		}
	});

	function highlightCite(citeId: string) {
		const el = document.querySelector<HTMLElement>(`[data-cite="${citeId}"]`);
		if (!el) return;
		window.scrollTo({
			top: el.getBoundingClientRect().top + window.scrollY - 140,
			behavior: 'smooth'
		});
		el.classList.remove('cite-active');
		// force reflow so animation replays
		void el.offsetWidth;
		el.classList.add('cite-active');
		setTimeout(() => el.classList.remove('cite-active'), 2000);
	}

	function sendPrompt(prompt: PromptSpec) {
		messages = [...messages, { role: 'user', text: prompt.label }];
		pending = true;
		open = true;
		setTimeout(() => {
			messages = [...messages, { role: 'assistant', segments: prompt.reply }];
			pending = false;
		}, 850);
	}

	function sendFreeform(event: SubmitEvent) {
		event.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || pending) return;
		messages = [...messages, { role: 'user', text: trimmed }];
		input = '';
		pending = true;
		setTimeout(() => {
			messages = [
				...messages,
				{
					role: 'assistant',
					segments: [
						{ t: 'Good question. Based on the article, the author frames this as: ' },
						{ cite: '02' },
						{ t: ' — publishing straight from the vault to shorten the feedback loop. That aligns with the stated goal — ' },
						{ cite: '05' },
						{ t: ' — that taste shows through the act of putting work out. If you want, I can pull the exact paragraph.' }
					]
				}
			];
			pending = false;
		}, 1100);
	}

	function clearChat() {
		messages = [];
	}
</script>

<div class="chat-dock" role="complementary" aria-label="Chat with this article">
	<div class="mx-auto max-w-7xl px-6 py-4">
		{#if !open}
			<div
				class="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:[grid-template-columns:auto_1fr_auto]"
			>
				<div class="flex items-center gap-2.5">
					<span class="chat-pulse h-2.5 w-2.5 rounded-full bg-ink"></span>
					<span class="font-display text-lg font-black uppercase tracking-tighter">
						Ask this article
					</span>
					<span
						class="ml-1 hidden font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted md:inline"
					>
						Claude · article in context
					</span>
				</div>
				<div class="chat-prompts flex gap-2 overflow-x-auto py-0.5">
					{#each prompts as prompt (prompt.id)}
						<button
							type="button"
							class="chat-chip flex-shrink-0 whitespace-nowrap border-2 border-ink bg-surface px-3 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-surface"
							onclick={() => sendPrompt(prompt)}
						>
							{prompt.label} →
						</button>
					{/each}
				</div>
				<button
					type="button"
					class="flex items-center gap-2 border-2 border-ink bg-accent px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-on-accent transition-transform duration-100 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut"
					onclick={() => (open = true)}
				>
					Open chat <Icon name="expand_less" size={18} />
				</button>
			</div>
		{:else}
			<div class="chat-expanded grid gap-0" style="grid-template-rows: auto 1fr auto; height: min(72dvh, 620px);">
				<div class="mb-4 flex items-center justify-between border-b-2 border-ink pb-3">
					<div class="flex items-center gap-2.5 font-display text-lg font-black uppercase tracking-tighter">
						<span class="h-2.5 w-2.5 rounded-full bg-ink"></span>
						Ask this article
						<span class="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted">
							· {articleTitle} · {wordCount} words in context
						</span>
					</div>
					<div class="flex gap-2">
						{#if messages.length > 0}
							<button
								type="button"
								class="inline-flex items-center gap-1.5 border-2 border-ink bg-transparent px-2.5 py-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink hover:bg-ink hover:text-surface"
								onclick={clearChat}
							>
								Clear
							</button>
						{/if}
						<button
							type="button"
							class="inline-flex items-center gap-1.5 border-2 border-ink bg-transparent px-2.5 py-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink hover:bg-ink hover:text-surface"
							onclick={() => (open = false)}
						>
							<Icon name="expand_more" size={16} /> Dock
						</button>
					</div>
				</div>

				<div bind:this={scrollRef} class="flex flex-col gap-4 overflow-y-auto pr-2">
					{#if messages.length === 0}
						<div class="msg assistant grid grid-cols-[72px_1fr] items-start gap-4">
							<span
								class="pt-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted"
							>
								AI
							</span>
							<p class="m-0 max-w-none border-2 border-ink bg-surface p-3 text-[0.9375rem] leading-[1.6]">
								I've read this post — <strong>{articleTitle}</strong>. Ask me anything about
								it, or pick a starter below. I'll cite the paragraphs I'm drawing from; click
								any citation to jump there.
							</p>
						</div>
						<div class="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:[margin:1.5rem_72px_0_72px]">
							{#each prompts as prompt (prompt.id)}
								<button
									type="button"
									class="prompt-starter relative border-2 border-ink bg-surface p-3 text-left font-sans text-[0.9375rem] font-medium leading-[1.4] text-ink transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-surface-container-high hover:shadow-brut"
									onclick={() => sendPrompt(prompt)}
								>
									<span
										class="mb-1 block font-mono text-[0.625rem] font-bold uppercase tracking-widest text-ink-muted"
									>
										{prompt.mini}
									</span>
									{prompt.label} →
								</button>
							{/each}
						</div>
					{/if}

					{#each messages as message, i (i)}
						<div
							class="msg grid grid-cols-[72px_1fr] items-start gap-4"
							class:user={message.role === 'user'}
							class:assistant={message.role === 'assistant'}
						>
							<span
								class="pt-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-widest"
								class:text-ink-muted={message.role === 'assistant'}
								class:text-ink={message.role === 'user'}
							>
								{message.role === 'user' ? 'You' : 'AI'}
							</span>
							{#if message.role === 'user'}
								<p
									class="m-0 max-w-none border-2 border-ink bg-accent p-3 text-[0.9375rem] leading-[1.6] text-on-accent"
								>
									{message.text}
								</p>
							{:else}
								<p
									class="m-0 max-w-none border-2 border-ink bg-surface p-3 text-[0.9375rem] leading-[1.6]"
								>
									{#each message.segments as segment, j (j)}
										{#if 'cite' in segment}
											<button
												type="button"
												class="cite mx-0.5 inline-flex h-[18px] min-w-[20px] items-center justify-center border-2 border-ink bg-surface px-1.5 align-[1px] font-mono text-[0.625rem] font-bold tracking-wide text-ink hover:bg-ink hover:text-surface"
												aria-label={`Jump to citation ${segment.cite}`}
												onclick={() => highlightCite(segment.cite)}
											>
												{segment.cite}
											</button>
										{:else}
											<span>{segment.t}</span>
										{/if}
									{/each}
								</p>
							{/if}
						</div>
					{/each}

					{#if pending}
						<div class="msg assistant grid grid-cols-[72px_1fr] items-start gap-4">
							<span
								class="pt-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-ink-muted"
							>
								AI
							</span>
							<p class="m-0 max-w-none border-2 border-ink bg-surface p-3 text-[0.9375rem] leading-[1.6]">
								<span class="typing inline-flex h-[18px] items-center gap-1">
									<span class="typing-dot h-1.5 w-1.5 rounded-full bg-ink"></span>
									<span class="typing-dot h-1.5 w-1.5 rounded-full bg-ink"></span>
									<span class="typing-dot h-1.5 w-1.5 rounded-full bg-ink"></span>
								</span>
							</p>
						</div>
					{/if}
				</div>

				<form
					class="mt-2 grid grid-cols-[1fr_auto] gap-3 border-t-2 border-ink pt-3"
					onsubmit={sendFreeform}
				>
					<input
						type="text"
						bind:value={input}
						placeholder="Ask about this post — the pipeline, the stack, the vibe…"
						aria-label="Ask about this article"
						class="chat-input w-full border-2 border-ink bg-surface px-4 py-3.5 font-sans text-base text-ink outline-none transition-transform focus:-translate-x-0.5 focus:-translate-y-0.5 focus:bg-surface-container focus:shadow-brut"
					/>
					<button
						type="submit"
						disabled={!input.trim() || pending}
						class="border-2 border-ink bg-accent px-5 font-mono text-[0.8125rem] font-bold uppercase tracking-widest text-on-accent transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut disabled:cursor-not-allowed disabled:opacity-40"
					>
						Send →
					</button>
				</form>
			</div>
		{/if}
	</div>
</div>

<style>
	.chat-dock {
		position: fixed;
		inset: auto 0 0 0;
		z-index: 50;
		background: var(--color-surface);
		border-top: 4px solid var(--color-ink);
		box-shadow: 0 -8px 0 0 var(--color-ink);
		transition: transform 160ms ease-out;
	}

	.chat-prompts {
		scrollbar-width: none;
	}
	.chat-prompts::-webkit-scrollbar {
		display: none;
	}

	.chat-pulse {
		animation: chat-pulse 2.4s ease-in-out infinite;
	}
	@keyframes chat-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.typing-dot {
		animation: typing 1.2s ease-in-out infinite;
	}
	.typing-dot:nth-child(2) {
		animation-delay: 0.15s;
	}
	.typing-dot:nth-child(3) {
		animation-delay: 0.3s;
	}
	@keyframes typing {
		0%,
		60%,
		100% {
			opacity: 0.3;
			transform: translateY(0);
		}
		30% {
			opacity: 1;
			transform: translateY(-3px);
		}
	}

	@media (max-width: 820px) {
		.chat-prompts {
			display: none;
		}
	}
</style>
