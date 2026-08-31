# 10일차 — 사이트 및 페이지 CRUD

## 목표

- 사이트와 페이지를 API로 생성·조회·수정·삭제한다.
- 모든 요청에서 세션을 다시 검증한다.
- Supabase RLS와 복합 외래키로 고객 데이터를 격리한다.

## API

| 경로 | 메서드 | 기능 |
|---|---|---|
| `/api/sites` | GET, POST | 사이트 목록·생성 |
| `/api/sites/[siteId]` | GET, PATCH, DELETE | 사이트 상세·수정·삭제 |
| `/api/sites/[siteId]/pages` | GET, POST | 페이지 목록·생성 |
| `/api/sites/[siteId]/pages/[pageId]` | GET, PATCH, DELETE | 페이지 상세·수정·삭제 |

## 보안 및 검증

- 인증이 없으면 401, 인증 설정이 없으면 503을 반환한다.
- JSON 요청만 허용하고 요청 본문을 32KB로 제한한다.
- 사이트 유형·목적·상태와 페이지 유형을 허용 목록으로 검사한다.
- 페이지 slug는 영문 소문자·숫자·하이픈만 허용한다.
- 소유자가 다른 사이트와 페이지는 RLS에서 차단한다.
- `(site_id, owner_id)` 복합 외래키로 교차 고객 연결을 차단한다.

## Supabase 적용

9일차 SQL 실행 후 다음 파일을 SQL Editor에서 실행한다.

```text
supabase/migrations/202608310004_day10_site_page_crud.sql
```

## 완료 기준

- [x] 사이트 CRUD API
- [x] 페이지 CRUD API
- [x] 서버 입력 검증
- [x] 사용자별 RLS
- [x] 중복 페이지 주소 409 처리
- [ ] Supabase 마이그레이션 적용
- [ ] 실제 계정 API 통합 테스트
