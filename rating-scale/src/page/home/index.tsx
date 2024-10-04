import { IMAGEBASE } from "../../utils/constants";
import BrowseCategory from "./section/browseCategory";
import ExploreBlog from "./section/exploreBlog";
import HomeBanner from "./section/homeBanner";
import RecentReviews from "./section/recentReviews";
import RecentlyAdded from "./section/recentlyAdded";

export default function Index() {
  return (
    <div>
      <section className="banner">
        <HomeBanner />
      </section>

      <section className="recently-add-listing mb-5">
        <RecentlyAdded />
      </section>

      <section
        className="s-banner"
        style={{ backgroundImage: `url(${IMAGEBASE}/img/parallex1.jpg)` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7"></div>
            <div className="col-lg-5">
              <div className="s-banner-text">
                <h5>List Your Software</h5>
                <h3 className="mt-3">
                  Be seen by millions of software buyers.
                </h3>
                <p className="mt-3">
                  Do you want your products to get the attention they deserve?
                  Get a free or premium listing on "Rating Scale" so potential
                  buyers know about it. Start advertising your product today on
                  Rating Scale. Get started now!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recently-add-listing ">
        <RecentlyAdded />
      </section>

      <section
        className="s-banner mt-5"
        style={{
          backgroundImage: `url(${IMAGEBASE}/img/smallbanner4.jpg)`,
          backgroundPosition: "90% 0%",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="s-banner-text">
                <h3 className="mt-3">List Software Faster Than Ever Before</h3>
                <p className="mt-3">
                  Discover and explore software faster than ever before with our
                  user-friendly platform. Easily find the right software for you
                  from an extensive collection of options, and stay ahead with
                  fast and simple software discovery.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </section>

      <section className="testimonial">
        <RecentReviews />
      </section>

      <section className="home-categories">
        <ExploreBlog />
      </section>
    </div>
  );
}
