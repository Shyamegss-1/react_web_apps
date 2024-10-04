import { useQuery } from "@tanstack/react-query";
import { GETTOPCOMPANYCATEGORY } from "../../../service/operations/companyOperations";
import { IMAGEURL } from "../../../utils/constants";
import { Link } from "react-router-dom";

export default function TopCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["topcategoryData"],
    queryFn: () => GETTOPCOMPANYCATEGORY(),
  });

  if (isLoading) {
    return (
      <div className="row">
        {[...Array(8)].map((_, e) => (
          <div className="col-lg-3 mb-4" key={e}>
            <div className="loading-card">
              <div className="loading-card-inner">
                <div className="loading-card-icon"></div>
                <div className="loading-card-title"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {data &&
        data.data.map((c: { title: string; icon: string }, e: number) => (
          <div className="col-lg-3 mb-4" key={e}>
            <CategoryCard title={c.title} icon={c.icon} />
          </div>
        ))}
    </>
  );
}

const CategoryCard = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <Link to={"#"}>
      <div className="singe-category">
        <img src={IMAGEURL + icon} />
        <h5 className="ps-3">{title}</h5>
      </div>
    </Link>
  );
};
