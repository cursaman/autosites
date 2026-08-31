"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="message-page"><p className="eyebrow">ERROR</p><h1>잠시 문제가 발생했습니다.</h1><button className="primary-action message-link" onClick={reset} type="button">다시 시도하기</button></main>;
}
