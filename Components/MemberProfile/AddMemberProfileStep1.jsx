const AddMemberProfileStep1 = () => {
    return (
        <div>
            <form role="form">
                <div className="tab-content" id="main_form">

                    {/* <!-- step-1-start --> */}
                    <div className="tab-pane active" role="tabpanel" id="step1">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label className="top-label">First Name</label>
                                    <input type="text" className="form-control form-control-lg" defaultValue="" />
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label className="top-label">Last Name</label>
                                    <input type="text" className="form-control form-control-lg" defaultValue="" />
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <div className="form-group">
                                    <label className="">Gender</label>
                                    <ul className="list-unstyled mb-0">
                                        <li className="d-inline-block mr-2">
                                            <fieldset>
                                                <div className="vs-radio-con">
                                                    <input type="radio" name="gender" checked value="false" defaultChecked="" />
                                                    <span className="vs-radio">
                                                        <span className="vs-radio--border">

                                                        </span>
                                                        <span className="vs-radio--circle">

                                                        </span>
                                                    </span>
                                                    <span className="">Male</span>
                                                </div>
                                            </fieldset>
                                        </li>
                                        <li className="d-inline-block mr-2">
                                            <fieldset>
                                                <div className="vs-radio-con">
                                                    <input type="radio" name="gender" value="false" defaultChecked="" />
                                                    <span className="vs-radio">
                                                        <span className="vs-radio--border">

                                                        </span>
                                                        <span className="vs-radio--circle">

                                                        </span>
                                                    </span>
                                                    <span className="">Female</span>
                                                </div>
                                            </fieldset>
                                        </li>
                                        <li className="d-inline-block mr-2">
                                            <fieldset>
                                                <div className="vs-radio-con">
                                                    <input type="radio" name="gender" value="false" defaultChecked="" />
                                                    <span className="vs-radio">
                                                        <span className="vs-radio--border">

                                                        </span>
                                                        <span className="vs-radio--circle">

                                                        </span>
                                                    </span>
                                                    <span className="">Other</span>
                                                </div>
                                            </fieldset>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-4 col-9">
                                <div className="form-group date-birth">
                                    <label className="h6" for="exampleInputDate1">Date of Birth</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-calendar">
                                                </span>
                                            </span>
                                        </div>
                                        <input className="form-control form-control-lg datepicker" placeholder="Select date" type="text" defaultValue="" />
                                    </div>
                                    <span className="year-count">32 Year</span>
                                </div>
                            </div>

                            <div className="col-xl-4 col-3 age-field">
                                <div className="form-group date-birth">
                                    <label className="h6" for="exampleInputDate1">Age</label>
                                    <input type="text" className="form-control form-control-lg " defaultValue="" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-6">

                                <div className="form-group">
                                    <label className="h6">Blood Group</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-tint blood-group-text">
                                                </span>
                                            </span>

                                        </div>
                                        <select className="form-control form-control-lg blood-group-field">
                                            <option value="A+">A+</option>
                                            <option value="a-">A-</option>
                                            <option value="b+">B+</option>
                                            <option value="b-">B-</option>
                                            <option value="o+">O+</option>
                                            <option value="o-">O-</option>
                                            <option value="ab+">AB+</option>
                                            <option value="ab-">AB-</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label className="top-label">Height</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <input type="text" className="js-range-slider" name="my_range" value="" data-type="single" id="height-fit" defaultValue="" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <input type="text" className="js-range-slider" name="my_range" value="" data-type="single" id="height-inch" defaultValue="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label className="top-label">Weight</label>
                                    <div className="form-group">
                                        <input type="text" className="js-range-slider" name="my_range" value="" data-type="single" id="weight" defaultValue="" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label className="top-label">BMI </label>
                                    <div className="input-group bmi-calculate">
                                        <input type="text" className="form-control" defaultValue="" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button">Calculate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label className="top-label">Occupation </label>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" name="" defaultValue="" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label className="top-label">Language </label>
                                    <div className="form-group">
                                        <select className="select2 form-control" multiple>
                                            <option>English</option>
                                            <option>Hindi</option>
                                            <option>Gujarati</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-12">
                                <a href="#" className="btn btn-outline-light round btn-lg mr-1 mb-1 ">
                                    <i className="fa fa-angle-left">
                                    </i> BACK</a>
                                <a href="member-contact-information.html" className="btn bg-gradient-primary round btn-lg mr-1 mb-1 mr-auto float-right next-step">NEXT <i className="fa fa-angle-right">
                                </i>
                                </a>
                            </div>
                        </div> */}
                    </div>
                    {/* <!-- step-1-end --> */}
                </div>
            </form>
        </div >
    );
}

export default AddMemberProfileStep1;