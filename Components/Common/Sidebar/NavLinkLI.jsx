import Link from "next/link";
import { useRouter } from "next/router";

const NavLinkLI = ({ url, title, iconClass }) => {
  const router = useRouter();
  let currentRoute = router.asPath;

  let activeClass =
    (currentRoute == url || currentRoute.search(url) >= 0) &&
    "sidebar_active_button_in font-weight-bold";
  let navigationClass = "nav-item navigation hover_bold";
  return (
    <li className={navigationClass}>
      <Link href={url}>
        <a className={`${activeClass} text_theme_primary`}>
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
