import Image from "next/image";
import css from "./Footer.module.css";
import Link from "next/link";
import Contacts from "../Contacts/Contacts";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footerContentWrp}>
        <div className={css.logowrp}>
          <Link
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Powered by</p>
            <Image
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="logo"
              width={300}
              height={40}
            />
          </Link>
        </div>
        <div className={css.content}>
          <p>© {new Date().getFullYear()} MovieVerse. All rights reserved.</p>
          <div className={css.wrap}>
            <p>Developer: Ihor Petriv</p>
            <p>
              Contact me:
              <a href="<mailto:igorpetriv.bsc@gmail.com>">
                igorpetriv.bsc@gmail.com
              </a>
            </p>
          </div>
        </div>
        <Contacts />
      </div>
    </footer>
  );
};

export default Footer;
