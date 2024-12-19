// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const languages = [
    "English(UK)",
    "Français(FR)",
    "العربية",
    "ⵜⴰⵎⴰⵣⵉⵖⵜ",
    "Español (España)",
    "italiano",
    "Deutsch",
    "Português (Brasil)",
    "हिन्दी",
    "中文(简体)",
    "日本語",
  ];

  const footerLinks = [
    "Sign Up",
    "Log in",
    "Messenger",
    "Facebook Lite",
    "Watch",
    "Places",
    "Games",
    "Marketplace",
    "Facebook Pay",
    "Oculus",
    "Portal",
    "Instagram",
    "Bulletin",
    "Local",
    "Fundraisers",
    "Services",
    "Voting Information Centre",
    "Groups",
    "About",
    "Create ad",
    "Create Page",
    "Developers",
    "Careers",
    "Privacy",
    "Cookies",
    "Terms",
    "Help",
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrap}>
        {languages.map((language, index) => (
          <Link key={index} to="/">
            {language}
          </Link>
        ))}
        <Link to="/" className={styles.footerSquare}>
          <i className="plus_icon"></i>
        </Link>
      </div>

      <div className={styles.footerSplitter}></div>

      <div className={styles.footerWrap}>
        {footerLinks.map((link, index) => (
          <Link key={index} to="/">
            {link}
          </Link>
        ))}
        <Link to="/">
          AdChoices
          <i className="adChoices_icon"></i>
        </Link>
      </div>

      <div className={styles.footerWrap}>
        <Link to="/" className={styles.metaLink}>
          Xdev © 2024
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
