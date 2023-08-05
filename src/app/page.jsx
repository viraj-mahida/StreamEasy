"use client"

import s from "@/styles/home.module.css"; // s stands for styles
import CategoriesBar from "@/components/CategoriesBar";
import VideosContainer from "@/components/VideosContainer";

export default function Home() {
  return (
    <main className={s.main}>
      <div className={s.container}>
        <CategoriesBar />
        <VideosContainer />
      </div>
    </main>
  );
}