---
title: 'Claude 스킬 입문: SKILL.md 하나로 나만의 스킬 만들기'
description: 'Claude 스킬이 무엇인지, 어떻게 동작하는지, 그리고 첫 스킬을 직접 만들어 보는 과정을 정리했습니다.'
pubDate: '2026-11-15'
tags: ['claude', 'skills', 'ai']
---

Claude를 쓰다 보면 같은 설명을 반복하게 되는 순간이 옵니다. "커밋 메시지는 이 형식으로", "PR 설명에는 이 섹션을 꼭 넣어서" 같은 것들이죠. **Claude 스킬**은 이런 반복되는 지식과 절차를 폴더 하나에 담아 두고, 필요할 때 Claude가 알아서 꺼내 쓰게 만드는 방법입니다.

## 스킬이란?

스킬은 `SKILL.md` 파일이 들어 있는 **폴더**입니다. 이 파일 맨 위에는 YAML 프런트매터로 `name`과 `description`을 적고, 그 아래에 Claude가 따를 지시 사항을 마크다운으로 씁니다. 필요하면 스크립트나 참고 문서 같은 파일을 같은 폴더에 함께 넣을 수 있습니다.

```text
my-skill/
├── SKILL.md        # 필수: 메타데이터 + 지시 사항
├── reference.md    # 선택: 필요할 때만 읽는 상세 문서
└── scripts/
    └── check.py    # 선택: Claude가 실행할 수 있는 스크립트
```

## 어떻게 동작할까: 점진적 로딩

스킬의 핵심은 **필요한 만큼만 읽는다**는 점입니다.

1. 평소에는 각 스킬의 `name`과 `description`만 컨텍스트에 올라갑니다.
2. 사용자의 요청이 어떤 스킬의 설명과 맞으면, 그때 `SKILL.md` 본문을 읽습니다.
3. 본문이 다른 파일을 가리키면, 그 파일도 필요한 순간에만 읽거나 실행합니다.

그래서 스킬을 여러 개 설치해 두어도 컨텍스트가 크게 낭비되지 않습니다. 반대로 말하면, **`description`을 잘 써야 스킬이 제때 불립니다.**

> 💡 description에는 "무엇을 하는지"와 "언제 써야 하는지"를 함께 적으세요. Claude는 이 한 줄을 보고 스킬을 쓸지 말지 결정합니다.

## 첫 스킬 만들어 보기

Conventional Commits 형식으로 커밋 메시지를 써 주는 간단한 스킬을 만들어 보겠습니다. Claude Code에서는 개인 스킬을 `~/.claude/skills/` 아래에, 프로젝트 스킬을 저장소의 `.claude/skills/` 아래에 둡니다.

```bash
mkdir -p ~/.claude/skills/commit-message
```

그리고 `~/.claude/skills/commit-message/SKILL.md`를 만듭니다.

```markdown
---
name: commit-message
description: Conventional Commits 형식으로 커밋 메시지를 작성한다. 사용자가 커밋을 만들거나 커밋 메시지를 요청할 때 사용한다.
---

# 커밋 메시지 작성 규칙

1. `git diff --staged`로 변경 내용을 먼저 확인한다.
2. 제목은 `<type>(<scope>): <요약>` 형식으로, 50자 이내로 쓴다.
   - type: feat, fix, docs, refactor, test, chore 중 하나
3. 본문에는 "무엇을"보다 "왜"를 적는다.
4. 요약과 본문은 한국어로 쓴다.
```

이제 Claude Code에서 "이 변경 사항 커밋해 줘"라고 하면, Claude가 description을 보고 이 스킬을 불러와 규칙대로 메시지를 작성합니다.

## 스크립트를 곁들이면 더 강력해진다

지시문만으로는 매번 결과가 조금씩 달라질 수 있습니다. 검증처럼 **정확해야 하는 단계**는 스크립트로 빼 두는 것이 좋습니다.

```python
# scripts/check_commit.py
import re
import sys

PATTERN = re.compile(r"^(feat|fix|docs|refactor|test|chore)(\([\w-]+\))?: .{1,50}$")

title = sys.argv[1]
if not PATTERN.match(title):
    print(f"형식 오류: {title!r}")
    sys.exit(1)
print("OK")
```

`SKILL.md`에 "메시지를 확정하기 전에 `python scripts/check_commit.py "<제목>"`으로 검사한다"라고 한 줄 추가하면, Claude가 직접 실행해 결과를 확인합니다.

## 좋은 스킬을 위한 팁

| 팁 | 이유 |
| --- | --- |
| 스킬 하나에 목적 하나 | description이 명확해져서 제때 불린다 |
| SKILL.md는 짧게, 상세 내용은 별도 파일로 | 필요할 때만 읽혀 컨텍스트를 아낀다 |
| 결정적인 작업은 스크립트로 | 매번 같은 결과를 보장한다 |
| 예시를 포함 | 원하는 출력 형태를 가장 빠르게 전달한다 |

## 마치며

스킬은 결국 "Claude에게 주는 온보딩 문서"입니다. 팀 위키에 적어 두던 규칙을 `SKILL.md`로 옮기는 것부터 시작해 보세요. 다음 글에서는 실제로 쓰고 있는 스킬 몇 가지를 소개하겠습니다.
