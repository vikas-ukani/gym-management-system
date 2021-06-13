const DeleteButtonIcon = ({ id, deleteRow }) => {
  return (
    <div
      onClick={() => deleteRow(id)}
      className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary custom_btn font-medium-5"
    >
      <i className="fa fa-trash text-danger"></i>
    </div>
  );
};

export default DeleteButtonIcon;
