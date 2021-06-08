import AddLeadForm from "Components/Lead/AddLeadForm";
import NotInterested from "Components/Lead/NotInterested";
import PotentialList from "Components/Lead/PotentialList";

const Lead = () => {
    return (
        <div>

            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    </div>

                    <div className="content-body">

                        <h3 className="wizard-title text-left text_theme_primary">Lead</h3>

                        <section>
                            <div className="row mt-3">
                                <div className="col-md-12 col-xl-12">
                                    <div className="nav-wrapper position-relative mb-2">
                                        <ul className="nav nav-pills flex-row d-flex" id="tabs-text" role="tablist">
                                            <li className="nav-item mr-md-0 ">
                                                <a className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn active" id="tabs-text-1-tab" data-toggle="tab" href="#tabs-text-1" role="tab" aria-controls="tabs-text-3" aria-selected="false">
                                                    + New Lead
                                                </a>
                                            </li>
                                            <li className="nav-item mr-md-0">
                                                <a className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn" id="tabs-text-2-tab" data-toggle="tab" href="#tabs-text-2" role="tab" aria-controls="tabs-text-2" aria-selected="false">
                                                    Potential
                                                </a>
                                            </li>
                                            <li className="nav-item mr-md-0">
                                                <a className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn" id="tabs-text-3-tab" data-toggle="tab" href="#tabs-text-3" role="tab" aria-controls="tabs-text-1" aria-selected="true">
                                                    Not Interested
                                                </a>
                                            </li>


                                        </ul>
                                    </div>



                                    <div className="tab-content" id="tabcontent1">
                                        <div className="tab-pane fade active show" id="tabs-text-1" role="tabpanel" aria-labelledby="tabs-text-1-tab">
                                            <AddLeadForm />
                                        </div>

                                        <div className="tab-pane fade" id="tabs-text-2" role="tabpanel" aria-labelledby="tabs-text-2-tab">
                                            <PotentialList />
                                        </div>

                                        <div className="tab-pane fade" id="tabs-text-3" role="tabpanel" aria-labelledby="tabs-text-3-tab">
                                            <NotInterested />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Lead;