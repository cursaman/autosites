# AI API 초보자 샘플

브라우저 입력창에서 질문을 보내고 Node.js 서버가 OpenAI Responses API를 호출하는 최소 예제입니다. API 키는 브라우저 코드에 넣지 않고 서버의 `.env` 파일에서만 읽습니다.

## 실행 순서

1. Node.js 20 이상을 설치합니다.
2. 이 폴더에서 `npm install`을 실행합니다.
3. `.env.example`을 복사해 `.env`로 이름을 변경합니다.
4. `.env`의 `OPENAI_API_KEY`에 자신의 키를 입력합니다.
5. `npm start`를 실행합니다.
6. 브라우저에서 `http://localhost:3000`을 엽니다.

## 꼭 지킬 점

- `.env` 파일을 GitHub에 올리지 마세요.
- API 키를 `public/app.js`나 HTML에 넣지 마세요.
- 오류가 나면 함께 제공된 `AI-API-실습-안내서.md`의 오류 해결 표를 확인하세요.

공식 참고 문서: https://developers.openai.com/api/docs/quickstart
