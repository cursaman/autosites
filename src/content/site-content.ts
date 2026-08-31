export const siteContent = {
  brand: "AutoSites",
  navigation: [
    { label: "작업 방식", href: "#workflow" },
    { label: "제작 사례", href: "#showcase" },
    { label: "요청 예시", href: "#examples" },
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
