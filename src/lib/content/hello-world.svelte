<!--
	Template / example article body for the "Hello, World" post.
	This file intentionally stays as example content — real posts will be sourced
	from the Obsidian vault via the sync pipeline (see specs/).
-->
<script lang="ts">
	import WikiLink from '$lib/components/reader/WikiLink.svelte';
</script>

<p data-cite="01">
	I've been keeping an <WikiLink slug="obsidian-vault">Obsidian vault</WikiLink> for about four years
	now. Most of what I've written has stayed there — half-drafts, reading notes, the usual private
	sediment. This site is an experiment in letting a few of those pieces out.
</p>
<p data-cite="02">
	The hook is simple: the friction between "thought I jotted down" and "thing I publish" has always
	been too high. By the time I've polished a draft into something respectable, the original impulse
	— the reason the note existed — is usually buried under three edit passes. So this place is an
	attempt to shorten the loop.
</p>

<h2 id="sec-what-lands">What lands here</h2>
<p data-cite="03">
	Essays when something has settled. Notes when it hasn't. The rougher stream lives under
	<WikiLink slug="the-notebook">The Notebook</WikiLink> — reading notes, half-formed ideas, code
	snippets. Both pull from the same vault. The boundary is just editorial.
</p>
<p data-cite="04">
	Tags come straight out of Obsidian front-matter. If a note has <code>publish: true</code>, the
	<WikiLink slug="sync-pipeline">sync pipeline</WikiLink> picks it up on the next run. I don't have
	a separate CMS and I don't want one — the vault is the source of truth.
</p>
<blockquote data-cite="05">
	Share what I know. If it lands right, it also proves that knowledge and shows taste.
</blockquote>

<h2 id="sec-how-built">How it's built</h2>
<p data-cite="06">
	<WikiLink slug="sveltekit-runes">SvelteKit 5</WikiLink> on Bun, deployed on Railway via Docker. A
	small Postgres hangs off the side for the Obsidian sync. Nothing exotic — the interesting part is
	the writing, not the stack. If you want the details, the
	<WikiLink slug="stack-notes">stack notes</WikiLink> cover it in full.
</p>
<pre><code>{`# the sync loop — simplified
obsidian-watch ./vault --on-change ./scripts/publish.ts`}</code></pre>
<p data-cite="07">
	The publish script walks the vault, reads front-matter, resolves wiki-links against a slug index,
	and upserts into Postgres. Backlinks are computed at write-time and cached; that's why you can see
	a "Linked from" column on every post without a separate query per paragraph.
</p>

<h3 id="sec-wiki-links">Wiki-links, on the web</h3>
<p data-cite="08">
	In Obsidian, <WikiLink slug="wiki-link-syntax">[[wiki-links]]</WikiLink> are the whole trick — the
	reason a vault turns into a graph. Translating them to HTML is mostly boring: resolve a slug, render
	an <code>{'<a>'}</code>. The fun bit is what they look like once they're here. I've gone back and
	forth; the current rendering is <em>accent color, underline on hover</em>. It still reads like prose;
	it still looks like a link.
</p>

<h2 id="sec-expect">What to expect</h2>
<p data-cite="09">
	A post roughly every two weeks. Notes whenever. No newsletter, no analytics, no comments — just
	<WikiLink slug="rss-feed">RSS</WikiLink> and an email address at the bottom if you want to say
	hello. Eventually, maybe, a <WikiLink slug="reading-log">reading log</WikiLink> and a graph view.
	But I've learned not to promise features.
</p>
<p data-cite="10">
	That's it. Thanks for reading. If the first post of a blog is supposed to explain the blog, consider
	this one explained.
</p>
