type CourseSession = {
  readonly week: string;
  readonly status: string;
};

export function getCourseProgress<T extends CourseSession>(sessions: readonly T[]) {
  const completedCount = sessions.filter((session) => session.status === "완료").length;
  const percentage = sessions.length === 0 ? 0 : Math.round((completedCount / sessions.length) * 100);
  const nextSession = sessions.find((session) => session.status !== "완료");

  return {
    completedCount,
    totalCount: sessions.length,
    percentage,
    percentageLabel: `${percentage}%`,
    summary: nextSession ? `${completedCount}주차 완료 · ${nextSession.week} 준비 중` : "4주 과정 완료",
  } as const;
}
