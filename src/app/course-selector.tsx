"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./course-selector.module.css";

type NavigationItem = { readonly label: string; readonly href: string };

export default function CourseSelector({ items }: { items: readonly NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeFromOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function closeFromEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, []);

  return (
    <nav className={styles.navigation} aria-label="주요 메뉴">
      {items.filter((item) => item.href !== "/course").map((item) => <a className={styles.standardLink} key={item.href} href={item.href}>{item.label}</a>)}
      <div className={styles.selector} ref={menuRef}>
        <button type="button" aria-expanded={isOpen} aria-controls="course-options" onClick={() => setIsOpen((current) => !current)}>4주 교육과정 <span aria-hidden="true">⌄</span></button>
        <div id="course-options" className={styles.options} hidden={!isOpen}>
          <Link href="/course" onClick={() => setIsOpen(false)}><strong>교육과정 전체 보기</strong><small>일정·교육비·장소 안내</small></Link>
          <Link href="/course#progress" onClick={() => setIsOpen(false)}><strong>1기 진행 현황</strong><small>주차별 수업 진행 상태</small></Link>
          <Link href="/course#records" onClick={() => setIsOpen(false)}><strong>실제 수업 기록</strong><small>완료한 내용과 다음 수업</small></Link>
          <Link href="/course#curriculum" onClick={() => setIsOpen(false)}><strong>4주 커리큘럼</strong><small>매주 배우고 완성하는 것</small></Link>
          <Link href="/course#next-cohort" onClick={() => setIsOpen(false)}><strong>2기 사전 관심</strong><small>다음 과정 일정 안내받기</small></Link>
        </div>
      </div>
    </nav>
  );
}
