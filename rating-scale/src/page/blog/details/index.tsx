import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GETBLOGHANDLER } from "../../../service/operations/contentOperations";

function removeBrTags(htmlString: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const brTags = tempDiv.getElementsByTagName("br");
  for (let i = brTags.length - 1; i >= 0; i--) {
    brTags[i].parentNode?.removeChild(brTags[i]);
  }

  return tempDiv.innerHTML;
}

export default function Index() {
  const { id } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["comblogdata"],
    queryFn: () => GETBLOGHANDLER(),
  });

  if (isPending) {
    return <p>...loading</p>;
  }

  const currentBlog: object =
    data.data.find((e: { id: string }) => e.id === id) ?? {};

  return (
    <div>
      <section
        className="blog-section"
        style={{ marginTop: "80px", marginBottom: "80px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="blog-details">
                <div className="blog-single-image">
                  <img
                    src="https://rating-scale.com/admin/upload/blog1.jpg"
                    className="img-fluid w-100"
                    alt="Best Review Website"
                  />
                </div>

                <div className="table-of-content mt-4">
                  <h5>Table of content</h5>
                  <ul className="mt-2 tocList">
                    {currentBlog.table
                      .split(",")
                      .filter((e: string) => e !== "")
                      .map((e: string, i: number) => (
                        <li key={i}>
                          <a href={`#${e}`}>
                            <span lang="EN-GB">
                              Step {i + 1}: {e}
                            </span>
                            <span lang="EN-GB">&nbsp;</span>
                          </a>
                        </li>
                      ))}
                  </ul>

                  <h5 className="mt-4">Other Section</h5>
                  <ul className="mt-2">
                    <li>
                      <a href="#faq"> Question & Answer</a>
                    </li>{" "}
                    <li>
                      <a href="#comment">Comment Section</a>
                    </li>
                  </ul>
                </div>

                <div
                  className="blog-single-desc mt-4"
                  dangerouslySetInnerHTML={{
                    __html: removeBrTags(currentBlog.content),
                  }}
                />
              </div>
              <div className="container">
                <div className="faqs" id="faq">
                  <div className="accordion mt-4" id="accordionExample">
                    <h4 className="fw-bold">Frequently Asked Questions</h4>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="accordionItem1">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse1"
                          aria-expanded="true"
                          aria-controls="collapse1"
                        >
                          Explore Your Options.
                        </button>
                      </h2>
                      <div
                        id="collapse1"
                        className="accordion-collapse collapse show"
                        aria-labelledby="accordionItem1"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          First things first, figure out what you want the
                          software for. Is it for school, work, creating cool
                          stuff, or just having fun? Knowing your goal is like
                          having a map that guides you in the right direction.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="accordionItem2">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse2"
                          aria-expanded="true"
                          aria-controls="collapse2"
                        >
                          Check Reviews and Ratings
                        </button>
                      </h2>
                      <div
                        id="collapse2"
                        className="accordion-collapse collapse "
                        aria-labelledby="accordionItem2"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Now that you know what you need, it's time to explore
                          your options. Think of it like checking out different
                          types of candy before finding your favorite. Look for
                          software in app stores, websites, or ask friends and
                          family for recommendations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="blog-comments mt-5" id="comment">
                <h4 className="fw-bold">Enter your Comments Here:</h4>
                <form action="#" method="post" className="mt-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-field">
                        <input
                          type="text"
                          placeholder="Your Name"
                          name="name"
                          className="form-control"
                          value=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-field">
                        <input
                          type="email"
                          placeholder="Your Email"
                          name="email"
                          className="form-control"
                          value=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                      <div className="form-field">
                        <textarea
                          id=""
                          rows={5}
                          name="comment"
                          className="form-control"
                          placeholder="Message...."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <div className="form-field">
                        <button
                          type="submit"
                          name="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="card mt-3">
                <h5 className="card-header">
                  <img
                    src="assets/img/user.jpg"
                    className="rounded-circle"
                    width="50px"
                  />
                  <span className="ps-3">Martina Massey</span>
                </h5>
                <div className="card-body">
                  <p className="card-text">Martina Massey</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <img
                src="https://rating-scale.com/admin/upload/unnamed (10).png"
                className="img-fluid w-100"
                alt="Best Review Website"
              />
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Tags</h5>
                  <button className="btn btn-secondary me-2 mb-2" type="button">
                    Latest
                  </button>

                  {currentBlog.tags
                    .split(",")
                    .filter((e: string) => e !== "")
                    .map((e: string, i: number) => (
                      <button
                        className="btn btn-secondary me-2 mb-2"
                        type="button"
                        key={i}
                      >
                        {e}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
