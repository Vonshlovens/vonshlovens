import type { Snippet } from 'svelte';

export interface ArticleMeta {
	slug: string;
	title: string;
	dek: string;
	tag: string;
	tags: string[];
	published: string;
	updated: string;
	readingTime: string;
	wordCount: number;
	status: string;
}

export interface TocEntry {
	n: string;
	id: string;
	label: string;
}

export interface LinkRef {
	slug: string;
	title: string;
	date: string;
	tag: string;
	blurb: string;
}

export interface ArticleLinks {
	outgoing: LinkRef[];
	incoming: LinkRef[];
}

export type ReplySegment = { t: string } | { cite: string };

export interface PromptSpec {
	id: string;
	mini: string;
	label: string;
	reply: ReplySegment[];
}

export interface Article {
	meta: ArticleMeta;
	toc: TocEntry[];
	links: ArticleLinks;
	prompts: PromptSpec[];
	body: Snippet;
}
