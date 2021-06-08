import Link from "next/link";
import { useEffect, useState } from "react";
import EmployeeCard from "Components/Employee/EmployeeCard";
import staffs from "data/staffs.json";
import styles from "styles/Home.module.css";

const Diet = () => {
  const [staffList, setEmployeeList] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const data = staffs.data;
  const allEmployee = data;

  useEffect(() => {
    setEmployeeList(getPerPageData());
    setTotalPage(Math.ceil(allEmployee.length / perPage));
  }, [allEmployee, currentPage]);

  const getPerPageData = () => {
    const endingIndexPage = currentPage * perPage;
    const startingIndexPage = endingIndexPage - perPage;
    return allEmployee.slice(startingIndexPage, endingIndexPage);
  };
  /** Search Employee */
  const handleSearch = () => {
    if (searchEmployee && searchEmployee?.length) {
      let searchData = allEmployee.filter((employee) => {
        return Object.keys(employee).some((key) => {
          if (typeof employee[key] === "string") {
            return employee[key]
              .toLowerCase()
              .includes(searchEmployee.toLowerCase());
          } else {
            return searchEmployee == employee[key];
          }
        });
      });
      // employee.name.toLowerCase().indexOf(searchEmployee.toLowerCase()) !== -1)
      setEmployeeList(searchData);
      setTotalPage(Math.ceil(searchData.length / perPage));
    }
  };

  const clearSearch = () => {
    setSearchEmployee("");
    setEmployeeList(getPerPageData());
    setTotalPage(Math.ceil(data.length / perPage));
  };

  const pageChangeEmployee = (index) => {
    setCurrentPage(index);
    // setEmployeeList(getPerPageData())
  };

  return (
    <div>
      {/* <!-- BEGIN: Content--> */}
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>

          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="form-group">
                <div className="input-group mb-4">
                  {/* <input className="form-control form-control-lg" id="exampleInputIcon2" placeholder="Seach Employee" aria-label="Input group"
                                        type="text" onClick={(e) => setSearchEmployee(e.target.value)} /> */}
                  <input
                    className="form-control form-control-lg"
                    placeholder="Search Employee"
                    type="text"
                    value={searchEmployee}
                    onChange={(e) => setSearchEmployee(e.target.value)}
                  />
                  <div
                    className="input-group-append cursor-pointer"
                    onClick={clearSearch}
                  >
                    <span className="input-group-text">
                      <span className="fa fa-trash"></span>
                    </span>
                  </div>
                  <div
                    className="input-group-append cursor-pointer"
                    onClick={handleSearch}
                  >
                    <span className="input-group-text">
                      <span className="fa fa-search"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-12 mb-lg-0 mt-sm-2 offset-lg-6 text-sm-right text-center">
              <Link href="/add-employee/steps">
                <a
                  className={
                    "btn btn-pill mb-sm-0 mb-2  text_theme_primary custom_btn "
                  }
                >
                  <i className="fa fa-plus"> </i> Add New Employee
                </a>
              </Link>
            </div>
          </div>

          <div className="content-body">
            <div className="row">
              {staffList.map((employee, index) => {
                return <EmployeeCard key={index} employee={employee} />;
              })}
            </div>

            <nav aria-label="Blog page navigation">
              <ul className="pagination justify-content-center mt-2">
                <li className="page-item">
                  <a className="page-link" aria-label="first link" href="#">
                    <span className="fa fa-chevron-left"></span>
                  </a>
                </li>
                {[...Array(totalPage).keys()].map((index) => {
                  index++;
                  return (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage == index && "active"
                      }`}
                      onClick={() => pageChangeEmployee(index)}
                    >
                      <a className="page-link">{index}</a>
                    </li>
                  );
                })}

                {/* <li className="page-item">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">4</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">5</a>
                                </li> */}
                <li className="page-item">
                  <a className="page-link" aria-label="first link" href="#">
                    <span className="fa fa-chevron-right"></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diet;
