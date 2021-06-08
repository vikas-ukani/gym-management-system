const EmployeeCard = ({ employee }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            {/* <!-- Profile Card --> */}
            <div className="profile-card">
                <div className="card bg-primary shadow-soft border-light ">
                    <div className="profile-image bg-primary shadow-inset border border-light rounded-circle p-1 ml-3 mt-n5">
                        <img src={employee.image}
                            className="card-img-top rounded-circle" alt={employee.name} />
                    </div>
                    <div className="card-body">
                        <h3>{employee.name} </h3>
                        <div className="h6 font-weight-normal text-gray w-100">Age : {employee.age}</div>
                        <div className="h6 font-weight-normal text-gray">Position : {employee.position}</div>
                        <div className="h6 font-weight-normal text-gray">ID of the employee : {employee.employee_id}</div>
                    </div>
                </div>
            </div>
            {/* <!-- End of Profile Card --> */}
        </div>
    );
}

export default EmployeeCard;