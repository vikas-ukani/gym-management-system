import Link from "next/link";
import styles from 'styles/Home.module.css'
const SideMenuLogo = () => {
    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Admin"


    return (
        <div>
            <div className="navbar-header">
                <ul className="nav navbar-nav flex-row">
                    <li className="nav-item mr-auto">
                        <Link href="/">
                            <a className="navbar-brand" >
                                <div className="brand-logo">

                                </div>
                                <h2 className={`brand-text mb-0 ${styles.text_theme_primary}`}>
                                    {/* ADMIN */}
                                    {APP_NAME}
                                </h2>
                            </a>
                        </Link>
                    </li>

                    <li className={"nav-item nav-toggle " + styles.text_theme_primary}>
                        <a className={`nav-link modern-nav-toggle pr-0  `} data-toggle="collapse">
                            <i className={"feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon " + styles.text_theme_primary}>
                            </i>
                            <i className={"toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary " + styles.text_theme_primary} data-ticon="icon-disc">
                            </i>
                        </a>
                    </li>

                </ul>
            </div>
            <div className="shadow-bottom"></div>
        </div >
    );
}

export default SideMenuLogo;