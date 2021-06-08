import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "styles/Home.module.css";

const NavLinkLI = ({ url, title, iconClass }) => {
  const router = useRouter();
  let currentRoute = router.asPath;

  // let activeClass = ((currentRoute == url || (currentRoute.search(url) >= 0)) && " sidebar_active_button_in ")
  let activeClass =
    (currentRoute == url || currentRoute.search(url) >= 0) &&
    "sidebar_active_button_in font-weight-bold";
  // let activeClass = ((currentRoute == url || (currentRoute.search(url) >= 0)) && styles.active_gradient_nav)
  const hoverRef = useRef();
  let navigationClass = "nav-item navigation ";
  // hover
  return (
    <li
      ref={hoverRef}
      className={navigationClass}
      onMouseEnter={(e) => {
        if (!activeClass) {
          hoverRef.current.className = "font-weight-bold";
        }
      }}
      onMouseLeave={(e) => {
        if (!activeClass) {
          hoverRef.current.className = "";
        }
      }}
    >
      <Link href={url}>
        <a className={`${activeClass} ${styles.text_theme_primary}`}>
          <i className={`fa ${iconClass}`}></i>
          <span className="menu-title text-capitalize" data-i18n="Form Layout">
            {title}
          </span>
        </a>
      </Link>
    </li>
  );
};

export default NavLinkLI;
