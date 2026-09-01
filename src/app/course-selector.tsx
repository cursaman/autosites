"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./course-selector.module.css";

type NavigationItem = { readonly label: string; readonly href: string };

export default function CourseSelector({ items }: { items: readonly NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

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
    <nav className={styles.navigation} aria-label="주요 메뉴" ref={menuRef}>
      <button className={styles.menuButton} type="button" aria-expanded={isOpen} aria-controls="main-menu" aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setIsOpen((current) => !current)}><span /><span /><span /></button>
      <div id="main-menu" className={styles.links} data-open={isOpen}>
        {items.map((item) => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>)}
        <a className={styles.mobileCta} href="/education/join.html" onClick={() => setIsOpen(false)}>남은 자리 확인</a>
      </div>
    </nav>
  );
}
