import MainCardLists from "Components/Outlets/MainCardLists";

const OutletsPage = () => {
  const MODULE_NAME = "Outlets";
  return (
    <div>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>

          <div className="content-body">
            <h3 className="wizard-title text-left text_theme_primary">
              {MODULE_NAME}
            </h3>
            <section>
              <div className="row mt-3">
                <div className="col-md-12 col-xl-12 tab-content">
                  <MainCardLists />
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
