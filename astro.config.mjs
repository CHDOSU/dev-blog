// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// 배포 주소: SITE_URL 환경 변수 > Vercel 프로덕션 도메인 > 로컬
const site =
	process.env.SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:4321');

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			// 라이트/다크 모드에 맞춰 코드 블록 색이 바뀝니다.
			themes: { light: 'github-light', dark: 'github-dark' },
			wrap: false,
		},
	},
});
