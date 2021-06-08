
import AddLeadForm from "Components/Lead/AddLeadForm";
import NotInterested from "Components/Lead/NotInterested";
import PotentialList from "Components/Lead/PotentialList";

const Settings = () => {
    return (
        <div>

            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    </div>
                    <div className="content-body">

                        <h3 className="wizard-title text-left text_theme_primary">
                            Settings
                            </h3>

                        <section>
                            <div className="row mt-3">
                                <div className="col-md-12 col-xl-12">

                                    <NotInterested />

                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Settings;