import HomePageClient from "./HomePage.client";
import css from "./page.module.css";

export default function Home() {
  return (
    <div className={css.homePageWrapper}>
      <HomePageClient />
    </div>
  );
}
