import { useState } from "react"

const AddMemberProfileStep2 = ({ goToNextStep, currentStepInput }) => {

    const [currentInput, setCurrentInput] = useState(currentStepInput)

    const handleChange = e => {
        if (currentStepInput?.input) {
            currentStepInput.input[e.target.name] = e.target.value
            setCurrentInput({ ...currentInput, ...currentStepInput })
        }
    }

    return (
        <div>
            AddMemberProfileStep2
            <input type="text" name='address' onChange={handleChange} />
            {/* <pre>{JSON.stringify(currentStepInput)}</pre>
            <pre>{JSON.stringify(currentInput)}</pre> */}

            <div className="row">
                <div className="col-12">
                    <a href="#" className="btn btn-outline-light round btn-lg mr-1 mb-1 ">
                        <i className="fa fa-angle-left">
                        </i> BACK
                                    </a>
                    <button onClick={() => goToNextStep()} >
                        NE
                    </button>
                    <a className="btn bg-gradient-primary round btn-lg mr-1 mb-1 mr-auto float-right next-step text-white">
                        NEXT {" "}
                        <i className="fa fa-angle-right"> </i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AddMemberProfileStep2;