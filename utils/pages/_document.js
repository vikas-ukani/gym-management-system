import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import HeadScript from 'Components/Common/HeadScript'
import FooterScript from 'Components/Common/FooterScript'


class MyDocument extends Document {
    render() {
        return (
            <Html className="loading" lang="en" data-textdirection="ltr">
                <Head>
                    <HeadScript />
                </Head>
                <body className="vertical-layout vertical-menu-modern 2-columns  navbar-floating footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="2-columns" data-layout="semi-dark-layout">
                    {/* <div id="page-transition"></div> */}
                    <Main />
                    <NextScript />

                    <FooterScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
