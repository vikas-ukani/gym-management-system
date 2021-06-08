const PotentialList = () => {

    const lists = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]

    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-12">
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <input className="form-control form-control-lg" id="exampleInputIcon2" placeholder="Search Here" aria-label="Input group" type="text" />
                            <div className="input-group-append">
                                <span className="input-group-text"><span className="fa fa-search"></span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">

                {lists.map(list => {
                    return (
                        <div className="col-xl-4">
                            <div className="card bg-primary shadow-soft border-light not-interested-box ">
                                <div className="card-body">
                                    <h3 className="title d-flex align-items-center">Rishi Sen <span className="interested-icon"></span></h3>
                                    <div className="lead-contact"><span>Contact :</span> +91 989898 8888</div>
                                    <div className="lead-date-time">
                                        <span><i className="fa fa-clock-o"></i> 10:00 PM</span>
                                        <span><i className="fa fa-calendar"></i> 14 Feb 2021</span>
                                    </div>
                                    <div className="bottom-btn">
                                        <a href="#" className="btn btn-primary mr-1"><i className="fa fa-edit"></i> Edit</a>
                                        <a href="#" className="btn btn-primary"><i className="fa fa-trash"></i> Delete</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}



                <div className="col-12 mb-5">
                    <a href="#" className="float-left mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"><i className="fa fa-angle-left"></i> BACK</a>
                    <a href="#" className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn">Home Page <i className="fa fa-angle-right"></i></a>
                </div>
            </div>
        </>
    );
}

export default PotentialList;