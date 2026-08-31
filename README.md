# AutoSites

Codex와 채팅으로 홈페이지의 디자인과 콘텐츠를 수정하고, 검증된 결과를 GitHub와 Vercel에 자동 배포하는 홈페이지 작업 환경입니다.

```text
채팅 요청 → Codex 수정 → 자동 검사 → GitHub Push → Vercel 배포
```

## 운영 주소

- Website: [AutoSites 운영 홈페이지](https://autosites-jd3d.vercel.app)
- GitHub: [cursaman/autosites 저장소](https://github.com/cursaman/autosites)
- Production branch: `main`
- Vercel project: `autosites-jd3d`

## 배포 흐름

```text
pnpm verify → GitHub main Push → Vercel 자동 배포 → pnpm deployment:status
```

- 배포 전 검사: `pnpm verify`
- 배포 후 커밋·상태 확인: `pnpm deployment:status`
- 대표 배포 설정: [`deployment-target.json`](./deployment-target.json)
- 상세 운영 및 롤백 절차: [`새기획 08일차 GitHub Vercel 자동 배포.md`](./새기획%2008일차%20GitHub%20Vercel%20자동%20배포.md)

## 기획 문서

- [Codex 채팅형 홈페이지 제작 일차별 계획서](./Codex%20채팅형%20홈페이지%20제작%20일차별%20계획서.md)
- [새 기획 1일차 방향 전환 및 구조 정리](./새기획%2001일차%20방향%20전환%20및%20구조%20정리.md)

## Codex 작업 표준

- [초기 작업환경 준비 및 연결 가이드](./초기%20작업환경%20준비%20및%20연결%20가이드.md)
- [Codex 표준 작업 흐름](./CODEX_WORKFLOW.md)
- [홈페이지 수정 요청 양식](./홈페이지%20수정%20요청%20양식.md)
- 프로젝트 자동 규칙: [`AGENTS.md`](./AGENTS.md)
- [새 고객 홈페이지 복제 절차](./CUSTOMER_SITE_TEMPLATE.md)
- [고객 설정 예시](./templates/customer-site.example.json)

최종 인수 검사는 다음 명령으로 실행합니다.

```bash
npm run acceptance
```

## 현재 목표

실제 홈페이지의 업종과 콘텐츠를 확정하고 반응형 원페이지를 완성한 뒤, Codex 수정 요청이 GitHub와 Vercel까지 자동 반영되는 작업 흐름을 표준화합니다.

기존 홈페이지 SaaS 계획 문서는 과거 기획 기록으로만 보관합니다.
