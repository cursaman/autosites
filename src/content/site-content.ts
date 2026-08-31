export const siteContent = {
  brand: "AutoSites",
  navigation: [
    { label: "작업 방식", href: "#workflow" },
    { label: "시작 준비", href: "#setup" },
    { label: "제작 사례", href: "#showcase" },
    { label: "배포 과정", href: "#deployment" },
  ],
  hero: {
    eyebrow: "CODEX WEBSITE WORKFLOW",
    title: "말로 요청하면,\n홈페이지가 배포됩니다.",
    description: "Codex와 채팅으로 디자인과 내용을 수정하고, 자동 검사를 거쳐 GitHub와 Vercel 운영 주소까지 반영하는 홈페이지 제작 방식을 소개합니다.",
    primaryAction: { label: "작업 방식 보기", href: "#workflow" },
    secondaryAction: { label: "요청 예시 보기", href: "#examples" },
  },
  workflow: {
    eyebrow: "HOW IT WORKS",
    title: "대화에서 배포까지,\n하나의 작업 흐름",
    description: "개발 도구를 직접 다루지 않아도 원하는 결과를 자연어로 설명하면 됩니다.",
    steps: [
      { number: "01", title: "채팅으로 요청", description: "업종, 분위기, 문구, 색상과 필요한 기능을 자연어로 설명합니다." },
      { number: "02", title: "Codex가 코드 수정", description: "현재 홈페이지 구조를 확인하고 요청 범위에 맞춰 디자인과 콘텐츠를 변경합니다." },
      { number: "03", title: "자동 검사", description: "린트, 타입 검사, 프로덕션 빌드와 주요 화면을 확인해 오류를 배포 전에 차단합니다." },
      { number: "04", title: "GitHub 저장", description: "검증된 변경사항을 커밋하고 main 브랜치에 Push해 모든 작업 이력을 남깁니다." },
      { number: "05", title: "Vercel 자동 배포", description: "GitHub Push를 감지한 Vercel이 새 버전을 배포하고 실제 운영 URL을 갱신합니다." },
    ],
  },
  setup: {
    eyebrow: "BEFORE YOU START",
    title: "처음 한 번만,\n작업 환경을 연결합니다.",
    description: "ChatGPT·Codex, Git·GitHub, Vercel까지 연결하면 채팅으로 수정한 홈페이지가 자동 배포됩니다. Supabase는 로그인이나 데이터 저장이 필요할 때만 추가합니다.",
    requiredLabel: "필수 준비",
    optionalLabel: "선택 기능",
    steps: [
      { number: "01", title: "ChatGPT 가입 · Codex 준비", description: "ChatGPT 계정으로 데스크톱 앱에 로그인하고 홈페이지 폴더를 Codex에서 엽니다.", checklist: ["ChatGPT 계정 생성과 로그인", "ChatGPT 데스크톱 앱 설치", "프로젝트 폴더 열기", "Codex를 선택해 첫 요청 보내기"], action: { label: "공식 시작 안내", href: "https://learn.chatgpt.com/docs/quickstart" } },
      { number: "02", title: "Git 설치 · 사용자 설정", description: "Windows에 Git을 설치하고 터미널을 다시 연 뒤 이름과 이메일을 등록합니다.", checklist: ["Git for Windows 설치", "git --version으로 설치 확인", "커밋 작성자 이름·이메일 설정"], commands: ["winget install --id Git.Git -e --source winget", "git --version", "git config --global user.name \"YOUR_NAME\"", "git config --global user.email \"YOUR_EMAIL\""], action: { label: "Git 설치 안내", href: "https://git-scm.com/install/windows" } },
      { number: "03", title: "GitHub 가입 · 저장소 생성", description: "GitHub에 빈 저장소를 만들고 로컬 홈페이지의 main 브랜치를 연결해 Push합니다.", checklist: ["GitHub 계정 생성", "New repository 선택", "기존 파일이 있다면 README 없이 빈 저장소 생성", "origin 연결 후 main Push"], commands: ["git init -b main", "git add .", "git commit -m \"first commit\"", "git remote add origin https://github.com/USERNAME/REPOSITORY.git", "git push -u origin main"], action: { label: "저장소 연결 안내", href: "https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github" } },
      { number: "04", title: "Vercel 가입 · 자동 배포", description: "GitHub 계정으로 Vercel에 가입하고 저장소를 Import하면 main Push마다 운영 주소가 갱신됩니다.", checklist: ["GitHub로 Vercel 가입", "Add New → Project", "GitHub 저장소 Import", "Framework Preset: Next.js 확인", "Deploy 후 READY와 운영 URL 확인"], action: { label: "Git 배포 안내", href: "https://vercel.com/docs/git" } },
    ],
    optional: {
      number: "05", title: "Supabase — 로그인·DB가 필요할 때만", description: "현재 소개 홈페이지와 Codex 배포 흐름에는 필요하지 않습니다. 회원 로그인, 문의 저장, 관리자 데이터가 생길 때 연결합니다.",
      checklist: ["Supabase 프로젝트 생성", "Connect 화면에서 URL·Publishable key 확인", ".env.local과 Vercel 환경변수에 같은 값 등록", "데이터 테이블의 RLS 정책 점검"],
      env: ["NEXT_PUBLIC_SUPABASE_URL=...", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=..."], warning: "Secret·service role 키는 NEXT_PUBLIC에 넣거나 GitHub에 올리면 안 됩니다.",
      action: { label: "Next.js 연결 안내", href: "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs" },
    },
  },
  showcase: {
    eyebrow: "ONE WORKFLOW, MANY RESULTS",
    title: "주제가 달라지면,\n결과도 달라집니다.",
    description: "같은 템플릿에 문구만 바꾸는 방식이 아닙니다. 업종과 고객, 원하는 분위기에 맞춰 정보 구조부터 색상과 화면 표현까지 함께 조정합니다.",
    imageAlt: "카페, 전문 컨설팅, 크리에이티브 포트폴리오 홈페이지가 데스크톱과 모바일 화면에 적용된 예시",
    cases: [
      { type: "CAFE", title: "따뜻한 로컬 카페", request: "베이지와 짙은 갈색으로 편안한 매장 분위기를 보여줘.", result: "메뉴 · 공간 소개 · 방문 CTA" },
      { type: "STUDIO", title: "신뢰감 있는 전문 스튜디오", request: "서비스 강점이 명확하고 상담으로 자연스럽게 이어지게 해줘.", result: "서비스 · 업무 방식 · 상담 CTA" },
      { type: "PORTFOLIO", title: "선명한 크리에이티브 포트폴리오", request: "작업물이 먼저 보이고 개성이 강한 화면으로 바꿔줘.", result: "프로젝트 · 소개 · 협업 CTA" },
    ],
  },
  examples: {
    eyebrow: "PROMPT EXAMPLES",
    title: "이렇게 요청하면 됩니다.",
    items: [
      "카페 홈페이지로 바꾸고 베이지와 짙은 갈색을 사용해줘.",
      "서비스 소개 아래에 가격표와 상담 신청 버튼을 추가해줘.",
      "대표 이미지를 교체하고 모바일 화면의 글자 크기를 조정해줘.",
      "오류를 검사한 다음 GitHub와 Vercel에 배포해줘.",
    ],
  },
  deployment: {
    eyebrow: "SAFE DEPLOYMENT",
    title: "바로 올리지 않고,\n확인한 뒤 배포합니다.",
    points: [
      { title: "변경 범위 확인", description: "기존 작업과 디자인을 보존하면서 요청한 부분만 수정합니다." },
      { title: "품질 검사", description: "코드 오류와 빌드 실패 여부를 확인하고 통과한 변경만 저장합니다." },
      { title: "배포 이력", description: "GitHub 커밋과 Vercel 배포가 연결되어 언제든 변경 내역을 확인할 수 있습니다." },
      { title: "운영 확인", description: "배포 상태가 READY인지 확인하고 실제 주소에서 최신 화면이 열리는지 검사합니다." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "자주 묻는 질문",
    items: [
      { question: "코딩을 몰라도 요청할 수 있나요?", answer: "네. 원하는 업종, 분위기와 수정 내용을 평소 말하듯 설명하면 됩니다." },
      { question: "수정할 때마다 직접 배포해야 하나요?", answer: "아닙니다. GitHub와 Vercel을 한 번 연결하면 main 브랜치에 Push할 때 자동으로 배포됩니다." },
      { question: "잘못 수정되면 되돌릴 수 있나요?", answer: "모든 변경사항이 Git 커밋으로 남기 때문에 이전 정상 버전을 확인하고 복구할 수 있습니다." },
      { question: "홈페이지마다 별도 관리할 수 있나요?", answer: "네. 고객 홈페이지마다 GitHub 저장소와 Vercel 프로젝트를 분리하면 배포와 수정 이력이 섞이지 않습니다." },
    ],
  },
  finalCta: {
    eyebrow: "START WITH A MESSAGE",
    title: "첫 요청은 한 문장이면 충분합니다.",
    description: "홈페이지 업종과 원하는 분위기를 말해 주세요. Codex가 수정, 검사와 배포 과정을 이어갑니다.",
    action: { label: "요청 예시 다시 보기", href: "#examples" },
  },
  footer: {
    description: "Codex 채팅 기반 홈페이지 제작·수정·배포 워크플로",
    repository: "https://github.com/cursaman/autosites",
  },
} as const;
