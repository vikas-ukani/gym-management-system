import DeleteButtonIcon from "Components/UX/TableActions/DeleteButtonIcon";
import UpdateRowIcon from "Components/UX/TableActions/UpdateRowIcon";
import { useAxios } from "hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { getCookie } from "services";
import { getAllLeaveSettingsListAPI } from "services/leave-management";

const LeaveManagementGymOwner = () => {
    const { addToast } = useToasts()
    const [leaves, setLeaves] = useState(null)

    useEffect(() => {
        fetchAllLeaveSettingsListAPI()
    }, [])

    const fetchAllLeaveSettingsListAPI = async () => {

        let params = { workspace_id: getCookie('workspace_id') || 1 }
        const { response, error, statusCode } = await useAxios(getAllLeaveSettingsListAPI(params));
        if (statusCode == 200) {
            setLeaves(response.data)
        } else {
            addToast(error.message, { appearance: 'error', autoDismiss: false })
        }
        // 
    }

    return (
        <div>
            {leaves?.map(list => {
                return (
                    <div className="mx-25 card">
                        <div className="col-md-12 col-xl-12 tab-content p-1 card-body bg_theme_primary">
                            <h5>
                                {list?.leave?.name}
                            </h5>
                            <div className="row">
                                <div className="col-md-8 ">
                                    <div className="d-flex ">
                                        <div className="card w-50 mb-0 text-center">
                                            <div className="pt-75 bg_primary rounded-top pb-25 ">
                                                From Date
                                            </div>
                                            <div className="p-50 border_primary rounded-bottom">
                                                {list.date_from}
                                            </div>
                                        </div>
                                        <div className="align-self-center px-25 font-weight-bolder font-medium-3">
                                            -
                                        </div>
                                        <div className="card w-50   mb-0 text-center">
                                            <div className="pt-75 bg_primary rounded-top pb-25 ">
                                                To Date
                                            </div>
                                            <div className="p-50 border_primary rounded-bottom">
                                            {list.date_to}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 text-center">
                                    <h6 >
                                        Total Quota
                                    </h6>
                                    <p className="pt-50" >
                                        {list.days}
                                    </p>
                                </div>
                                <div className="col-md-2 text-center">
                                    <UpdateRowIcon
                                        url={'/leave-management/update'}
                                        id={list.id}
                                    />
                                    {/* <DeleteButtonIcon
                                deleteRow={() => console.log('de')}
                                id={1}
                            /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default LeaveManagementGymOwner;