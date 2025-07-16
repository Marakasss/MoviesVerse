"use client";

import toast from "react-hot-toast";
import css from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar() {
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
          <Link
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <br />
            <Image
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="logo"
              width={200}
              height={25}
            />
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
}
