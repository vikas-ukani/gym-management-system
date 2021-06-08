import { LOGIN_URL } from "constants";
import { useEffect, useState } from "react";
import router from "next/router";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";
import { userDetail } from "services";
import Cookies from "js-cookie";

const HeaderNavBar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(userDetail() || null);
  }, []);
  const { addToast } = useToasts();

  const handleLogout = () => {
    Cookies.remove("user");
    router.push(LOGIN_URL);
    // addToast()
  };

  return (
    <div>
      {/* <!-- BEGIN: Header--> */}
      <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow">
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div className="navbar-collapse" id="navbar-mobile">
              <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                <ul className="nav navbar-nav">
                  <li className="nav-item mobile-menu d-xl-none mr-auto">
                    <a
                      className="nav-link nav-menu-main menu-toggle hidden-xs"
                      href="#"
                    >
                      <i className="ficon feather icon-menu"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <ul className="nav navbar-nav float-right">
                <li className="dropdown dropdown-user nav-item">
                  <a
                    className="dropdown-toggle nav-link dropdown-user-link"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <div className="user-nav d-sm-flex d-none">
                      <span className="user-name text-bold-600 text-capitalize text_theme_primary">
                        {user?.full_name}
                      </span>
                      {/* <span className="user-status">Online</span> */}
                    </div>
                    <span>
                      <img
                        className="round"
                        src="/images/user-default.png"
                        alt="avatar"
                        height="40"
                        width="40"
                      />
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link href="/auth/update-profile">
                      <a className="dropdown-item">
                        <i className="feather icon-user"></i>
                        Edit Profile
                      </a>
                    </Link>
                    {/* <Link href="/member">
                                            <a className="dropdown-item" >
                                                <i className="feather icon-user">
                                                </i>
                                                Edit Profile
                                            </a>
                                        </Link> */}
                    <Link href="/auth/change-password">
                      <a className="dropdown-item">
                        <i className="feather icon-lock"></i>
                        Change Password
                      </a>
                    </Link>
                    <div className="dropdown-divider"> </div>
                    {/* <Link href="/auth/login"> */}
                    <a className="dropdown-item" onClick={handleLogout}>
                      <i className="feather icon-power"></i> Logout
                    </a>
                    {/* </Link> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <ul className="main-search-list-defaultlist d-none">
                <li className="d-flex align-items-center">
                    <a className="pb-25" href="#">
                        <h6 className="text-primary mb-0">Files</h6>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between w-100" href="#">
                        <div className="d-flex">
                            <div className="mr-50">
                                <img src="/app-assets/images/icons/xls.png" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">Two new item submitted</p>
                                <small className="text-muted">Marketing Manager</small>
                            </div>
                        </div>
                        <small className="search-data-size mr-50 text-muted">&apos;17kb</small>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between w-100" href="#">
                        <div className="d-flex">
                            <div className="mr-50">
                                <img src="/app-assets/images/icons/jpg.png" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">52 JPG file Generated</p>
                                <small className="text-muted">FontEnd Developer</small>
                            </div>
                        </div>
                        <small className="search-data-size mr-50 text-muted">&apos;11kb</small>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between w-100" href="#">
                        <div className="d-flex">
                            <div className="mr-50">
                                <img src="/app-assets/images/icons/pdf.png" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">25 PDF File Uploaded</p>
                                <small className="text-muted">Digital Marketing Manager</small>
                            </div>
                        </div>
                        <small className="search-data-size mr-50 text-muted">&apos;150kb</small>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between w-100" href="#">
                        <div className="d-flex">
                            <div className="mr-50">
                                <img src="/app-assets/images/icons/doc.png" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">Anna_Strong.doc</p>
                                <small className="text-muted">Web Designer</small>
                            </div>
                        </div>
                        <small className="search-data-size mr-50 text-muted">&apos;256kb</small>
                    </a>
                </li>
                <li className="d-flex align-items-center">
                    <a className="pb-25" href="#">
                        <h6 className="text-primary mb-0">Members</h6>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
                        <div className="d-flex align-items-center">
                            <div className="avatar mr-50">
                                <img src="/app-assets/images/portrait/small/avatar-s-8.jpg" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">John Doe</p>
                                <small className="text-muted">UI designer</small>
                            </div>
                        </div>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
                        <div className="d-flex align-items-center">
                            <div className="avatar mr-50">
                                <img src="/app-assets/images/portrait/small/avatar-s-1.jpg" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">Michal Clark</p>
                                <small className="text-muted">FontEnd Developer</small>
                            </div>
                        </div>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
                        <div className="d-flex align-items-center">
                            <div className="avatar mr-50">
                                <img src="/app-assets/images/portrait/small/avatar-s-14.jpg" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">Milena Gibson</p>
                                <small className="text-muted">Digital Marketing Manager</small>
                            </div>
                        </div>
                    </a>
                </li>
                <li className="auto-suggestion d-flex align-items-center cursor-pointer">
                    <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
                        <div className="d-flex align-items-center">
                            <div className="avatar mr-50">
                                <img src="/app-assets/images/portrait/small/avatar-s-6.jpg" alt="png" height="32" />
                            </div>
                            <div className="search-data">
                                <p className="search-data-title mb-0">Anna Strong</p>
                                <small className="text-muted">Web Designer</small>
                            </div>
                        </div>
                    </a>
                </li>
            </ul> */}
      {/* <ul className="main-search-list-defaultlist-other-list d-none">
        <li className="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer">
          <a className="d-flex align-items-center justify-content-between w-100 py-50">
            <div className="d-flex justify-content-start">
              <span className="mr-75 feather icon-alert-circle"></span>
              <span>No results found.</span>
            </div>
          </a>
        </li>
      </ul> */}
      {/* <!-- END: Header--> */}
    </div>
  );
};

export default HeaderNavBar;
