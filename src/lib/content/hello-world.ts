import type { ArticleMeta, ArticleLinks, PromptSpec, TocEntry } from './types';

export const meta: ArticleMeta = {
	slug: 'hello-world',
	title: 'Hello,\nWorld',
	dek: 'A short note about what this site is, why I started it, and what you can expect to find here. Mostly: a working notebook.',
	tag: 'Meta',
	tags: ['Meta', 'Personal', 'Workflow'],
	published: 'Apr 18, 2026',
	updated: 'Apr 18, 2026',
	readingTime: '4 min',
	wordCount: 812,
	status: 'Published'
};

export const toc: TocEntry[] = [
	{ n: '01', id: 'sec-intro', label: 'Intro' },
	{ n: '02', id: 'sec-what-lands', label: 'What lands here' },
	{ n: '03', id: 'sec-how-built', label: "How it's built" },
	{ n: '04', id: 'sec-wiki-links', label: 'Wiki-links, on the web' },
	{ n: '05', id: 'sec-expect', label: 'What to expect' }
];

export const links: ArticleLinks = {
	outgoing: [
		{
			slug: 'obsidian-vault',
			title: 'Obsidian vault: structure',
			date: 'Mar 24, 2026',
			tag: 'Workflow',
			blurb:
				'How I organize the vault — folders, daily notes, and the front-matter I actually use.'
		},
		{
			slug: 'the-notebook',
			title: 'The Notebook',
			date: 'Ongoing',
			tag: 'Meta',
			blurb:
				'Rougher, more frequent: reading notes, half-formed ideas, work-in-progress drafts.'
		},
		{
			slug: 'sync-pipeline',
			title: 'Obsidian → Postgres sync',
			date: 'Apr 02, 2026',
			tag: 'Software',
			blurb:
				'The publish script that walks the vault and upserts into a Postgres table, plus the front-matter schema.'
		},
		{
			slug: 'sveltekit-runes',
			title: 'SvelteKit 5 runes in anger',
			date: 'Feb 11, 2026',
			tag: 'Software',
			blurb:
				"Two months of shipping with runes. What I changed my mind on, and what's still awkward."
		},
		{
			slug: 'stack-notes',
			title: 'Why this stack',
			date: 'Jan 30, 2026',
			tag: 'Software',
			blurb:
				'Bun, SvelteKit, Postgres, Railway. A running list of what each piece earns its keep for.'
		},
		{
			slug: 'wiki-link-syntax',
			title: 'Wiki-links on the web',
			date: 'Coming soon',
			tag: 'Design',
			blurb:
				"A survey of how personal sites render Obsidian-style links in HTML. Most options are worse than you'd think."
		}
	],
	incoming: [
		{
			slug: 'why-this-exists',
			title: 'Why this exists',
			date: 'Coming soon',
			tag: 'Personal',
			blurb:
				'Writing in public, thinking out loud, and keeping a record of the things I want to remember.'
		},
		{
			slug: 'first-principles',
			title: 'Personal sites, first principles',
			date: 'Mar 08, 2026',
			tag: 'Design',
			blurb:
				"What a personal site is for if you're not trying to be a brand. Restating the obvious for my own benefit."
		},
		{
			slug: 'taste-as-craft',
			title: 'Taste as a craft',
			date: 'Feb 22, 2026',
			tag: 'Design',
			blurb: 'On taste as something you practice, not something you have. Notes after re-reading Paul Graham.'
		},
		{
			slug: 'publishing-habit',
			title: 'Building a publishing habit',
			date: 'Jan 12, 2026',
			tag: 'Personal',
			blurb:
				"Small stakes, short posts, tight feedback loop. How I've kept the cadence going when I'd usually stall."
		}
	]
};

export const prompts: PromptSpec[] = [
	{
		id: 'tldr',
		mini: '01 · Summary',
		label: 'Give me the TL;DR in three beats',
		reply: [
			{
				t: "It's a personal blog sourced from the author's Obsidian vault — any note tagged "
			},
			{ cite: '04' },
			{ t: ' gets picked up and published automatically.' },
			{ t: ' The writing is split into ' },
			{ cite: '03' },
			{ t: ' — polished essays up front, and a rougher running notebook behind the same pipeline.' },
			{ t: ' The stack is SvelteKit on Bun with a Postgres sidecar ' },
			{ cite: '06' },
			{ t: ", but the post is clear that the stack isn't the point." }
		]
	},
	{
		id: 'why',
		mini: '02 · Motivation',
		label: 'Why is the author building this now?',
		reply: [
			{ t: 'The stated reason is friction: ' },
			{ cite: '02' },
			{
				t: ' — by the time a note gets polished for another surface, the original impulse is buried. Publishing straight out of the vault shortens that loop.'
			},
			{ t: ' There\'s also an explicit taste argument: ' },
			{ cite: '05' },
			{
				t: ' — writing in public doubles as proof you know the thing you\'re writing about.'
			}
		]
	},
	{
		id: 'stack',
		mini: '03 · Technical',
		label: 'How does the Obsidian → blog pipeline work?',
		reply: [
			{ t: 'Notes with ' },
			{ cite: '04' },
			{ t: ' in their front-matter are picked up by a watcher script on save.' },
			{ t: ' That script — outlined ' },
			{ cite: '07' },
			{
				t: " — walks the vault, resolves wiki-links against a slug index, and upserts into Postgres. Backlinks are computed at write-time so a post's 'linked from' column doesn't need per-paragraph queries at read-time."
			}
		]
	},
	{
		id: 'wiki',
		mini: '04 · Detail',
		label: 'How do [[wiki-links]] render on the site?',
		reply: [
			{
				t: "They're resolved at build time into plain anchor tags, but styled as the author's accent color with an underline on hover — "
			},
			{ cite: '08' },
			{
				t: '. The goal is that they still read like prose and still look like links — no bracket syntax leaks into the finished post.'
			}
		]
	}
];
