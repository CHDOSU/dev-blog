import { getCollection } from 'astro:content';

/** 공개된 글을 최신순으로 반환합니다. draft 글은 프로덕션 빌드에서 빠집니다. */
export async function getPosts() {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllTags() {
	const posts = await getPosts();
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

/** 한국어 기준 대략적인 읽기 시간(분). */
export function readingTime(body = '') {
	const chars = body.replace(/```[\s\S]*?```/g, '').replace(/\s+/g, '').length;
	return Math.max(1, Math.round(chars / 500));
}
