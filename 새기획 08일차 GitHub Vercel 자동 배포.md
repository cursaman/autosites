# 새기획 08일차 — GitHub·Vercel 자동 배포

## 오늘의 목표

검증된 변경을 GitHub `main`에 Push하면 대표 Vercel 프로젝트가 자동 배포되고, GitHub 커밋과 운영 상태가 일치하는지 확인할 수 있게 한다.

## 대표 운영 대상

| 항목 | 값 |
| --- | --- |
| GitHub 저장소 | `cursaman/autosites` |
| Production 브랜치 | `main` |
| Vercel 대표 프로젝트 | `autosites-jd3d` |
| 운영 주소 | `https://autosites-jd3d.vercel.app` |

위 값은 `deployment-target.json`을 기준으로 관리한다. Vercel 프로젝트 ID나 인증 토큰은 저장소에 기록하지 않는다.

## 표준 배포 순서

```text
수정 완료
→ pnpm verify
→ Git commit
→ git push origin main
→ Vercel 자동 배포
→ pnpm deployment:status
→ 운영 주소 확인
```

## 배포 상태 확인

```bash
pnpm deployment:status
```

다음 항목을 자동 확인한다.

- 현재 로컬 브랜치가 `main`인지 확인
- 로컬 HEAD와 GitHub `main` 커밋 SHA 일치 확인
- GitHub 상태에서 `Vercel – autosites-jd3d`가 `success`인지 확인
- 운영 홈페이지와 `/api/health`가 정상 응답하는지 확인
- 운영 홈페이지에 최신 필수 문구가 포함됐는지 확인
- 같은 커밋에 다른 Vercel 프로젝트가 연결되면 중복 경고 표시

## 중복 프로젝트 상태

현재 동일한 GitHub 저장소에 아래 두 Vercel 프로젝트가 연결되어 있다.

- 대표: `autosites-jd3d`
- 중복: `autosites`

운영 주소와 자동 상태 검사는 `autosites-jd3d`만 기준으로 사용한다. 기존 `autosites` 프로젝트는 데이터 손실을 막기 위해 자동 삭제하지 않는다. 중복 배포를 완전히 중단하려면 Vercel에서 `autosites` 프로젝트의 Git 연결을 해제하거나 프로젝트 삭제를 별도로 승인한 뒤 진행한다.

## 롤백 방법

### 1. 가장 안전한 방법 — Git revert

잘못된 커밋을 취소하는 새 커밋을 만든다. 기존 작업 이력이 보존되며 Push 후 Vercel이 정상 버전을 다시 자동 배포한다.

```bash
git log --oneline -10
git revert <문제가-있는-커밋-SHA>
git push origin main
```

롤백 후 `pnpm deployment:status`로 새 커밋과 배포 상태를 다시 확인한다.

### 2. 긴급 복구 — Vercel 이전 배포 재지정

Vercel Dashboard에서 `autosites-jd3d` → Deployments → 이전 `READY` 배포 → Promote 또는 Rollback을 선택한다. 즉시 운영 주소를 이전 결과로 돌릴 수 있지만 GitHub 코드는 바뀌지 않으므로 이후 반드시 Git revert도 수행한다.

### 금지

- `git reset --hard`로 공유된 `main` 이력 삭제
- 검증 없이 강제 Push
- 대표 프로젝트가 아닌 `autosites` 배포를 운영 주소로 사용

## 완료 기준

- [x] 대표 GitHub 저장소와 Production 브랜치가 고정된다.
- [x] 대표 Vercel 프로젝트와 운영 주소가 고정된다.
- [x] GitHub Push 자동 배포 연결이 확인된다.
- [x] 커밋과 Vercel 상태 확인 명령이 제공된다.
- [x] 안전한 롤백 절차가 기록된다.
- [x] 자동 검증 통과 후 GitHub Push
- [x] 최신 커밋과 Vercel READY 일치 확인

## 다음 단계

9일차에는 새로운 채팅에서도 같은 품질로 작업할 수 있도록 Codex 수정 요청 양식과 보존 규칙을 표준화한다.
