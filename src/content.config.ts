import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// src/content/blog/ 안의 .md, .mdx 파일이 글이 됩니다.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
			// true면 빌드에서 제외됩니다 (개발 서버에서는 보임).
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
