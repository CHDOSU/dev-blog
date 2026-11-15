# cds.dev

AI, Claude 스킬, 개발 이야기를 기록하는 블로그입니다. [Astro](https://astro.build) 공식 블로그 템플릿을 기반으로 만들었습니다.

- Markdown / MDX 글 작성
- 코드 하이라이팅 (Shiki, 라이트·다크 테마 자동 전환)
- 다크 모드 (시스템 설정 따라감 + 헤더 버튼으로 전환)
- 태그, 읽기 시간, 초안(draft)
- SEO 메타태그, Open Graph, sitemap, RSS(`/rss.xml`), robots.txt

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 사이트 생성
```

## 새 글 쓰기

`src/content/blog/` 에 `.md` 또는 `.mdx` 파일을 추가하면 됩니다. 파일 이름이 주소가 됩니다 (`my-post.md` → `/blog/my-post/`).

```markdown
---
title: '글 제목'
description: '목록과 검색 결과에 보일 한 줄 요약'
pubDate: '2026-11-15'
tags: ['claude', 'ai']
draft: false        # true면 배포되지 않음
# heroImage: '../../assets/my-image.jpg'
---

본문을 여기에 씁니다.
```

`main` 브랜치에 푸시하면 Vercel이 자동으로 배포합니다.

## 설정

- 사이트 이름, 설명, GitHub 주소: `src/consts.ts`
- 색상: `src/styles/global.css` 상단의 변수
- 커스텀 도메인을 쓰면 Vercel 환경 변수 `SITE_URL`에 `https://도메인`을 넣어 주세요. (없으면 Vercel 프로덕션 주소를 자동으로 씁니다.)
