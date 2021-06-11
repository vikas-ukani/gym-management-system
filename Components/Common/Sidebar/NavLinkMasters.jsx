import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavLinkLI from "Components/Common/Sidebar/NavLinkLI";

const NavLinkMasters = () => {
  const router = useRouter();
  let currentRoute = router.asPath;

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    let flagVal =
      currentRoute == "masters" || currentRoute.search("master") >= 0;
    setIsShow(flagVal);
  }, []);

  return (
    <li className="nav-item navigation mb-50">
      {/* ${activeClass} */}
      <a
        className={` text_theme_primary ${
          isShow && "sidebar_active_button_in1"
        }`}
        onClick={() => setIsShow(!isShow)}
      >
        <i className={`fa fa-cog`}></i>
        <span className="menu-title font-weight-bold">Settings</span>
      </a>
      {isShow && (
        <div className="pt-0 ">
          <ul className="navigation ">
            <NavLinkLI
              url={"/masters/masters"}
              title={"masters"}
              iconClass={" "}
            />
            <NavLinkLI
              url={"/masters/sub-master"}
              title={"sub master"}
              iconClass={" "}
            />
          </ul>
        </div>
      )}

      {/* <ul>
                <NavLinkLI url={'/sub-master'} title={'sub-master'} iconClass={'fa-user'} />
            </ul> */}
    </li>
  );
};

export default NavLinkMasters;
