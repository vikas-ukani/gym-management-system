import { useEffect } from "react";
import HeaderNavBar from "Components/Common/HeaderNavBar";
import SideMenu from "Components/Common/SideMenu";
import Footer from "Components/Common/Footer";
import AdminLayout from "Layouts/AdminLayout";
import AuthLayout from "Layouts/AuthLayout";
import { useRouter } from "next/router";
import {
  LOGIN_URL,
  FORGOT_PASSWORD_URL,
  NEW_PASSWORD_URL,
  ENTER_OTP_URL,
} from "constants";
import router from "next/router";
import { getToken } from "services";

const unAuthURLs = [
  LOGIN_URL,
  FORGOT_PASSWORD_URL,
  ENTER_OTP_URL,
  NEW_PASSWORD_URL,
];

const DefaultLayout = ({ children }) => {
  const route = useRouter();

  if (unAuthURLs.indexOf(route.pathname) >= 0)
    return <AuthLayout>{children}</AuthLayout>;

  useEffect(() => {
    /** validate Token if exist then redirect to DASHBOARD_URL */
    if (!getToken()) {
      router.push(LOGIN_URL);
    }
  });

  /** CHECK FOR USER TYPE */
  return (
    <>
      <AdminLayout>
        <HeaderNavBar />
        <SideMenu />
        {children}
        <Footer />
      </AdminLayout>
    </>
  );
};

export default DefaultLayout;
