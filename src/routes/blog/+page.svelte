<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	
	export let data: PageData;
</script>

<svelte:head>
	<title>Blog - vonshlovens</title>
	<meta name="description" content="Thoughts on LLMs, health tech, biomechanics, and competitive sprinting" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
			Blog
		</h1>
		<p class="text-xl text-gray-600 dark:text-gray-400">
			Thoughts on AI, health tech, and the pursuit of speed 🏃‍♂️
		</p>
	</div>
	
	<!-- Blog Posts -->
	<div class="space-y-8">
		{#each data.posts as post}
			<article class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
						<time datetime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric' 
						})}</time>
						<span class="mx-2">•</span>
						<span>{post.readTime}</span>
					</div>
							<h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-3">
						<a href="{base}/blog/{post.slug}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
							{post.title}
						</a>
					</h2>
					
					<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
						{post.excerpt}
					</p>
					
					<div class="flex items-center justify-between">
						<div class="flex flex-wrap gap-2">
							{#each post.tags as tag}
								<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
									{tag}
								</span>
							{/each}
						</div>
						
						<a 
							href="/blog/{post.slug}" 
							class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
						>
							Read more →
						</a>
					</div>
				</div>
			</article>
		{/each}
		
		{#if data.posts.length === 0}
			<div class="text-center py-12">
				<div class="text-6xl mb-4">📝</div>
				<h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">No posts yet</h2>
				<p class="text-gray-600 dark:text-gray-400">
					I'm working on some exciting content. Check back soon!
				</p>
			</div>
		{/if}
	</div>
</div>
