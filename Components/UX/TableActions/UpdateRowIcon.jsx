import Link from "next/link";

const UpdateRowIcon = ({ url, id }) => {
  return (
    <Link href={`${url}/${id}`}>
      <a className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary custom_btn font-medium-5">
        <i className="fa fa-edit text_theme_primary"></i>
      </a>
    </Link>
  );
};

export default UpdateRowIcon;
