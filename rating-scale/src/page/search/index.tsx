import { useQuery } from "@tanstack/react-query";
import { SEARCHCOMPANY } from "../../service/operations/companyOperations";
import { Icon } from "@iconify/react/dist/iconify.js";

function cleanUrl(url: string): string {
  const cleanedUrl = url.replace(/^(https?:\/\/)?(www\.)?/i, "");
  return cleanedUrl;
}

export default function Index() {
  const query: string =
    new URLSearchParams(window.location.search).get("query") ?? "";

  const { data } = useQuery({
    queryKey: ["searchlistdata"],
    queryFn: () => SEARCHCOMPANY(query),
  });

  return (
    <div>
      <div style={{ background: "#efe4ff" }}>
        <div className="container py-5">
          <h2 className="text-center fw-bolder">Results for “{query}”</h2>
        </div>
      </div>

      <section className="main-section mt-5 ">
        <div className="container">
          <div className="">
            <div className="">
              <h4>Companies (37)</h4>
            </div>

            <div className="row mt-4">
              {data &&
                data.data.map((e, i: number) => {
                  return (
                    <ListingCard
                      webiste={e.website}
                      name={e.companyname ?? e.website}
                      key={i}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ListingCard = ({ name, webiste }: { name: string; website: string }) => {
  return (
    <div className="col-lg-7 mb-3 ">
      <div className="bg-color-main">
        <div className="bg-color">
          <div className="gmail-file d-flex gap-4">
            <div className="gmail-image">
              <img
                src="https://thebridge.in/h-upload/2021/08/08/1500x900_13219-bajrang-punia.jpg"
                alt=""
                style={{ width: "100px" }}
              />
            </div>
            <div className="gmail-details">
              <h6 className="mb-0">{cleanUrl(name)}</h6>
              <div className="main-star-icons d-flex flex-wrap align-items-center gap-lg-3 gap-0">
                <div className="star-icons py-1">
                  <Icon icon="emojione:star" />
                  <Icon icon="emojione:star" />
                  <Icon icon="emojione:star" />
                  <Icon icon="emojione:star" />
                  <Icon icon="emojione:star" />
                </div>
                <p className="mb-0">
                  Trustcore 2.3 <span>|</span> 1,225 reviews.
                </p>
              </div>
              <p>{webiste}</p>
            </div>
          </div>
        </div>
        <div className="gmail-bottom">
          <div className="d-flex flex-wrap justify-content-between pt-2">
            <div className="d-flex gap-2 align-items-center">
              <Icon icon="ph:globe" />
              <Icon icon="basil:location-outline" />
            </div>
            <div className="anchor">
              <a href="#!" className="">
                Write a review
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
