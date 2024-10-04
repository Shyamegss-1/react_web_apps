export const LoadingButton = () => (
  <div className="loading-card loading-card-btn">
    <div className="loading-inner-btn">
      <div className="btn-2 loading-card-title"></div>
    </div>
  </div>
);

export const LoadingDetailSection = () => (
  <div className="row">
    <div className="col-lg-12 mb-4">
      <div className="loading-card">
        <div className="loading-inner-card d-flex justify-content-between align-items-center">
          <div className="loading-inner-title">
            <div className="main-loading loading-card-title"></div>
            <div
              className="loading-reviews loading-card-title my-2"
              style={{ height: "20px" }}
            ></div>
          </div>
          <div className="loading-btn">
            <div className="loading-inner-btn d-flex justify-content-between gap-2">
              <div className="btn-1 loading-card-title"></div>
              <div className="btn-1 loading-card-title"></div>
              <div className="btn-1 loading-card-title"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const LoadingReviewsCard = () => (
  <div className="row">
    <div className="loading-card about-section">
      <div className="inner-about d-flex justify-content-between w-100">
        <div className="loading-about">
          <div className="main-about-section loading-card-title w-100"></div>
        </div>
      </div>
    </div>
  </div>
);
