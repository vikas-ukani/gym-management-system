const FooterScript = () => {
	return (
		<div>
			{/* <!-- BEGIN: Vendor JS--> */}
			<script src="/app-assets/vendors/js/vendors.min.js"></script>
			<script src="/assets/js/bootstrap.min.js"></script>
			<script src="/app-assets/vendors/js/charts/apexcharts.min.js"></script>
			<script src="/app-assets/vendors/js/extensions/tether.min.js"></script>
			<script src="/app-assets/vendors/js/extensions/shepherd.min.js"></script>
			{/* <!-- BEGIN Vendor JS--> */}
			<script src="/app-assets/vendors/js/forms/select/select2.full.min.js"></script>
			<script src="/app-assets/js/scripts/forms/select/form-select2.js"></script>
			<script src="/app-assets/js/scripts/charts/chart-apex.js"></script>

			{/* <!-- BEGIN: Theme JS--> */}
			<script src="/app-assets/js/core/app-menu.js"></script>
			<script src="/app-assets/js/core/app.js"></script>
			<script src="/app-assets/js/scripts/components.js"></script>
			{/* <!-- END: Theme JS--> */}
			<script src="/assets/js/ion.rangeSlider.min.js"></script>

			{/* <!-- END: Page JS--> */}
			<script src="/assets/js/scripts.js"></script>
		</div>
	);
};

export default FooterScript;
