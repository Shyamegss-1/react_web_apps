import { useQuery } from "@tanstack/react-query";
import { GETBLOGHANDLER } from "../../../service/operations/contentOperations";
import { Link } from "react-router-dom";
import { BASEROUTE } from "../../../utils/constants";

export default function ExploreBlog() {
  const { isPending, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => GETBLOGHANDLER(),
  });

  if (isPending) {
    return <p>loading.....</p>;
  }

  return (
    <div className="container">
      <div className="section-title px-4">
        <h2>Explore Blogs</h2>
        <p>Read the latest blog post. </p>
      </div>

      <div className="articles">
        {data.data
          .filter((e: object, i: number) => i < 3)
          .map((e: { title: string }) => (
            <BlogCard data={e} />
          ))}
      </div>
    </div>
  );
}

const BlogCard = ({ data }: { data: { title: string; id: string } }) => {
  const { title, id } = data;

  return (
    <article>
      <div className="article-wrapper">
        <figure>
          <img src="https://picsum.photos/id/1011/800/450" alt="" />
        </figure>
        <div className="article-body">
          <h2>{title}</h2>
          <p className="clas">
            Curabitur convallis ac quam vitae laoreet. Nulla mauris ante,
            euismod sed lacus sit amet, congue bibendum eros. Etiam mattis
            lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
          </p>
          <Link to={BASEROUTE + "/blog/" + id} className="read-more">
            Read more{"  "}
            <span className="sr-only">about this is some title</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};
