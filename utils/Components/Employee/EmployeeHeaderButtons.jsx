import Link from "next/link";

const EmployeeHeaderButtons = ({add_staff_clone, currentStep, title}) => {
    return (
        <div>
            <h3 className="wizard-title text-capitalize">{title}</h3>
            <div className="wizard">
                <div className="wizard-inner">
                    <div className="connecting-line"></div>
                    <ul className="d-flex justify-content-center">
                        {add_staff_clone.map((staffClone) => {
                            return (
                                <li key={staffClone.step}>
                                    <Link href={"/add-employee/steps/" + staffClone.step}>
                                        {/* onClick={() => setCurrentStep(staffClone.step)} */}
                                        <a

                                            className={
                                                currentStep >= staffClone.step
                                                    ? ' default_gradient'
                                                    : ''
                                            }
                                        >
                                            {staffClone.step}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EmployeeHeaderButtons;