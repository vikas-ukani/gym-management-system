import { Head } from 'next/document';

const HeadScript = () => {
	return (
		<>
			<link rel="icon" href="/app-assets/images/ico/favicon.ico" />
			<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			{/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}

			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
			<meta name="description" content="" />
			<meta name="keywords" content="" />
			<meta name="author" content="" />
			<title>GYM</title>
			<link rel="apple-touch-icon" href="/app-assets/images/ico/apple-icon-120.png" />
			<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" rel="stylesheet" />

			<link rel="stylesheet" type="text/css" href="/app-assets/vendors/css/vendors.min.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/vendors/css/charts/apexcharts.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/vendors/css/extensions/tether-theme-arrows.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/vendors/css/extensions/tether.min.css" />
			<link
				rel="stylesheet"
				type="text/css"
				href="/app-assets/vendors/css/extensions/shepherd-theme-default.css"
			/>

			<link rel="stylesheet" type="text/css" href="/app-assets/css/bootstrap.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/bootstrap-extended.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/colors.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/components.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/themes/dark-layout.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/themes/semi-dark-layout.css" />

			<link rel="stylesheet" type="text/css" href="/app-assets/css/core/menu/menu-types/vertical-menu.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/core/colors/palette-gradient.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/pages/dashboard-analytics.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/pages/card-analytics.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/plugins/tour/tour.css" />
			<link rel="stylesheet" type="text/css" href="/assets/css/ion.rangeSlider.min.css" />

			<link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/vendors/css/forms/select/select2.min.css" />

			<link rel="stylesheet" type="text/css" href="/app-assets/css/core/menu/menu-types/vertical-menu.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/core/colors/palette-gradient.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/pages/dashboard-analytics.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/pages/card-analytics.css" />
			<link rel="stylesheet" type="text/css" href="/app-assets/css/plugins/tour/tour.css" />

			{/* </Head> */}
		</>
	);
};

export default HeadScript;
