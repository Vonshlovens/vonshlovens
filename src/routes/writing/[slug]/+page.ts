import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import * as helloWorld from '$lib/content/hello-world';

const articles = {
	'hello-world': helloWorld
} as const;

export type ArticleKey = keyof typeof articles;

export const load: PageLoad = ({ params }) => {
	const fixture = articles[params.slug as ArticleKey];
	if (!fixture) {
		error(404, `No post found for "${params.slug}"`);
	}
	return {
		meta: fixture.meta,
		toc: fixture.toc,
		links: fixture.links,
		prompts: fixture.prompts,
		slug: params.slug
	};
};
