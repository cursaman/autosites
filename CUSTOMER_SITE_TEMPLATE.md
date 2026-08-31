# 새 고객 홈페이지 복제 절차

## 원칙

고객 홈페이지마다 GitHub 저장소와 Vercel 프로젝트를 각각 하나씩 만든다. AutoSites 운영 저장소와 고객 콘텐츠, 배포 이력과 환경변수를 섞지 않는다.

```text
고객 1명
→ GitHub 저장소 1개
→ Vercel 프로젝트 1개
→ Production URL 1개
```

## 1. 고객 정보 준비

1. `홈페이지 수정 요청 양식.md`로 업종, 목적, 고객, CTA와 보존 조건을 확인한다.
2. `templates/customer-site.example.json`을 복사해 고객 정보를 입력한다.
3. 빈 연락처나 연결 주소는 임의로 만들지 않고 고객에게 확인한다.

## 2. 새 저장소 만들기

GitHub에서 현재 저장소를 템플릿으로 복제하거나 새 저장소에 소스를 복사한다. 권장 이름은 업종과 고객을 구분할 수 있는 소문자 형식이다.

```text
web-cafe-a
web-hospital-b
web-company-c
```

새 저장소에서는 다음 값을 반드시 바꾼다.

- `package.json`의 `name`
- `src/content/site-content.ts`의 상호, 문구, 서비스와 연락처
- `src/styles/design-tokens.css`의 고객 브랜드 색상
- `public/images`와 `public/og.png`
- `src/app/layout.tsx`의 SEO 정보
- `deployment-target.json`의 저장소, 프로젝트와 운영 주소
- `AGENTS.md`의 제품 방향과 보존 조건

과거 AutoSites 기획 문서와 사용하지 않는 SaaS·인증·데이터베이스 경로는 고객 저장소에서 제거 대상을 검토한다. 삭제 전 새 고객 사이트가 해당 기능을 사용하지 않는지 확인한다.

## 3. GitHub 첫 검증

```bash
npm install
npm run verify
git add <의도한 파일>
git commit -m "Create customer website"
git push origin main
```

`.env`, 토큰, Vercel 프로젝트 ID와 고객 비밀정보는 커밋하지 않는다.

## 4. Vercel 프로젝트 연결

1. Vercel에서 Add New → Project를 선택한다.
2. 새 고객 GitHub 저장소를 Import한다.
3. Framework Preset이 Next.js인지 확인한다.
4. Production Branch를 `main`으로 설정한다.
5. 필요한 환경변수만 Preview와 Production에 각각 등록한다.
6. 배포가 `READY`인지 확인한다.
7. 기본 `vercel.app` 주소를 `deployment-target.json`에 입력한다.

같은 저장소를 두 개의 Vercel 프로젝트에 연결하지 않는다.

## 5. 운영 확인

고객 저장소의 `scripts/deployment-status.mjs`가 새 설정을 사용하도록 한 뒤 실행한다.

```bash
npm run deployment:status
```

다음 항목을 확인한다.

- GitHub `main`과 로컬 HEAD 일치
- 대표 Vercel 상태 `SUCCESS`
- 운영 URL과 `/api/health` 정상 응답
- 고객 상호, 헤드라인, CTA와 이미지가 운영 화면에 표시
- 모바일, SEO 공유 이미지와 연락처 링크 정상

## 6. 커스텀 도메인

기본 주소 검수가 끝난 뒤에만 고객 도메인을 연결한다. DNS 변경 전 도메인 소유자, 현재 메일 레코드와 복구 방법을 확인한다. 기존 DNS 레코드는 승인 없이 삭제하지 않는다.

## 7. 이후 수정 방식

```text
고객 요청
→ Codex 수정
→ npm run verify
→ GitHub main Push
→ Vercel READY
→ npm run deployment:status
→ 고객 확인
```

운영 오류는 `git revert`로 복구하고 강제 Push로 공유 이력을 변경하지 않는다.
