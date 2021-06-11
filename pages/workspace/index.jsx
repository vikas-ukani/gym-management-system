import MainCardLists from "Components/Workspace/MainCardLists";
import { useAxios } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getUserId } from "services";
import { getWorkspacesByOwnerIdAPI } from "services/workspace";
import { initializeWorkspace } from "store/WorkspaceSlice";

const OutletsPage = () => {
  const MODULE_NAME = "dashboard";
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [workspaces, setWorkspaces] = useState();

  useEffect(async () => {
    await fetchWorkspaceList();
  }, []);

  const fetchWorkspaceList = async () => {
    const uid = getUserId();
    const {
      response: { data },
      error,
      loading,
      statusCode,
    } = await useAxios(getWorkspacesByOwnerIdAPI(uid));

    console.log("response", error, data);
    if (statusCode == 200) {
      setWorkspaces(data);
      /** save to store */
      console.log("O", data);
      dispatch(initializeWorkspace(data));
    } else {
      setWorkspaces([]);
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };

  return (
    <div>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <h3 className="wizard-title text-left text_theme_primary text-capitalize">
              {MODULE_NAME}
            </h3>

            <section>
              <div className="row mt-3">
                <div className="col-md-12 col-xl-12 tab-content">
                  <MainCardLists workspaces={workspaces} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutletsPage;
