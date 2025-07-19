"use client";

import toast from "react-hot-toast";
import css from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (query.trim() === "") {
      toast("Please enter your search query.", { icon: "🤔" });
      return;
    }

    router.push(`/movies/search/${query}`);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.logowrp}>
          <Link className={css.link} href="/" rel="noopener noreferrer">
            <Image src="/logo.png" alt="logo" width={180} height={80} />
          </Link>
        </div>

        <form action={handleSubmit} className={css.form}>
          <div className={css.inputGroup}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
