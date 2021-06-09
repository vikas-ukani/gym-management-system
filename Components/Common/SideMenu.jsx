import SideMenuLogo from "Components/Common/SideMenuLogo";
import styles from "styles/Home.module.css";
import NavLinkMasters from "Components/Common/Sidebar/NavLinkMasters";
import NavLinkLI from "Components/Common/Sidebar/NavLinkLI";

const SideMenu = () => {
  const goToLink = (link) => {
    // router.push(link)
  };

  return (
    <div
      className={`main-menu menu-fixed menu-light menu-accordion menu-shadow ${styles.bg_theme_primary} ${styles.text_theme_primary}`}
      data-scroll-to-active="true"
    >
      <SideMenuLogo />
      <hr className="border-accent-4 my-1" />
      <div className="main-menu-content mt-2 pb-5">
        {/* navigation-main */}
        <ul
          className="navigation "
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          <NavLinkLI
            url={"/outlets"}
            title={"dashboard"}
            iconClass={"fa-map-o"}
          />
          <NavLinkLI
            url={"/add-employee"}
            title={"Employee"}
            iconClass={"fa-user"}
          />
          <NavLinkLI url={"/users"} title={"Users"} iconClass={"fa-users"} />
          <NavLinkLI url={"/members"} title={"Members"} iconClass={"fa-user"} />
          <NavLinkLI
            url={"/exercise"}
            title={"Exercise"}
            iconClass={"fa-dribbble"}
          />
          <NavLinkLI url={"/lead"} title={"Lead"} iconClass={"fa-eye"} />
          <NavLinkLI url={"/diet"} title={"Diet"} iconClass={"fa-cutlery"} />
          <NavLinkLI url={"/offers"} title={"Offers"} iconClass={"fa-bell"} />
          <NavLinkLI
            url={"/leave-management"}
            title={"Leave Management"}
            iconClass={"fa-bell"}
          />
          <NavLinkLI
            url={"/announcement"}
            title={"announcement"}
            iconClass={"fa-bell"}
          />
          <NavLinkMasters />

          {/* <NavLinkLI url={"/setting"} title={"Setting"} iconClass={"fa-cog"} /> */}
          {/* <li className={"nav-item"}>
                        <hr />
                        <Link href="/logout" >
                            <a className={`${getActiveNavClass("/logout")} ${styles.text_theme_primary}`}>
                                <i className="fa fa-sign-out">
                                </i>
                                <span className={`menu-title `} data-i18n="Form Layout">Logout</span>
                            </a>
                        </Link>
                    </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;

// const StyledSideMenu = styled.div`
//   background-color: ${props => props.theme.backgroundColor} !important;
// `;
