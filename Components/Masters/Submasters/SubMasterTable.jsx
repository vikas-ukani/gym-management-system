import { Switch } from "antd";
import DeleteButtonIcon from "Components/UX/TableActions/DeleteButtonIcon";
import { USERS_UPDATE_URL } from "constants";
import Link from "next/link";

const SubMasterTable = ({
  subMastersCount,
  subMasters,
  onActiveChange,
  deleteRow,
  setIsEditForm,
  setEditRow,
}) => {
  const editRecordHandle = (record) => {
    setEditRow(record);
    setIsEditForm(true);
  };
  return (
    <div className="table-responsive-sm shadow-soft rounded">
      {subMastersCount == 0 && (
        <div className="p-5 font-large-1 text-center">
          {" "}
          No Submasters found.
        </div>
      )}
      {subMastersCount > 0 && (
        <table className="table membership-table table-hover table-borderless ">
          <thead>
            <tr>
              <th className="table-date table-primary text-capitalize">
                Image{" "}
              </th>
              <th className="table-date table-primary text-capitalize">
                name{" "}
              </th>
              <th className="table-date table-primary">Active</th>
              <th className="table-date table-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subMasters.map((smlist) => {
              return (
                <tr key={smlist.id}>
                  <td className="text-center text-capitalize">
                    <img
                      onError={(e) =>
                        (e.target.src = "/images/user-default.png")
                      }
                      src={smlist?.image?.url ?? "/images/user-default.png"}
                      className="mx-auto d-block rounded-circle img-sm"
                      alt={smlist.name}
                    />
                  </td>
                  <td className="text-center text-capitalize">{smlist.name}</td>

                  <td className="text-center ">
                    <Switch
                      defaultChecked={smlist.is_active}
                      onChange={(e) => onActiveChange(e, smlist.id)}
                    />
                  </td>
                  <td className="text-center ">
                    <a onClick={() => editRecordHandle(smlist)}>
                      <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary custom_btn font-medium-5">
                        <i className="fa fa-edit"></i>
                      </div>
                    </a>
                    <DeleteButtonIcon deleteRow={deleteRow} id={smlist.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubMasterTable;
