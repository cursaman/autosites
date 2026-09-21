"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./course-selector.module.css";

type NavigationItem = { readonly label: string; readonly href: string };

export default function CourseSelector({ items }: { items: readonly NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function closeFromOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function closeFromEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
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
      <button ref={buttonRef} className={styles.menuButton} type="button" aria-expanded={isOpen} aria-controls="main-menu" aria-haspopup="true" onClick={() => setIsOpen((current) => !current)}><span>전체 메뉴</span><i aria-hidden="true" /></button>
      <div id="main-menu" className={styles.links} data-open={isOpen}>
        <p>원하는 페이지를 선택하세요.</p>
        {items.map((item) => <a key={item.href} href={item.href} aria-current={item.href.startsWith("/") && pathname === item.href.split("#")[0] ? "page" : undefined} onClick={() => setIsOpen(false)}><span>{item.label}</span><b aria-hidden="true">→</b></a>)}
      </div>
    </nav>
  );
}
