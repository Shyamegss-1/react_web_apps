import React from "react";
import IconButton from "../../components/IconButton/IconButton";
import { Add, Document } from "iconsax-react";

const Index: React.FC = () => {
  return (
    <div className="">
      <section className="w-full px-4 py-6 mx-auto xl:w-5/6 md:w-4/5">
        <div className=" flex justify-between items-center ">
          <h1 className=" bg-zinc-600 inline-block px-4 py-2 rounded-lg text-white text-4xl font-semibold my-10 underline">
            Blogs
          </h1>

          <div className=" flex gap-2">
            <IconButton Icon={<Add size="24" color="#fff" variant="Bold" />}>
              Add New Blog
            </IconButton>

            <IconButton
              Icon={<Document size="24" color="#fff" variant="Bold" />}
            >
              Read comments
            </IconButton>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {[...Array(9)].map((_, e) => {
            return <BlogCard key={e} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;

const BlogCard = () => {
  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden">
      <a href="#">
        <img
          src="https://source.unsplash.com/random"
          className="object-cover w-full h-56 mb-5 bg-center "
          alt="Kutty"
          loading="lazy"
        />
      </a>
      <div className=" px-3 pb-2">
        <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Development
        </p>
        <h2 className="mb-2 text-xl font-bold leading-snug text-gray-900">
          <a href="#" className="text-gray-900 hover:text-green-900">
            Process Documents Using Artificial Intelligence For RPA Bots
          </a>
        </h2>
        <p className="mb-4 text-sm font-normal text-gray-600">
          Earlier RPA bots used to have some limitations like it would take
          structured data for processing from excel, database, on these data.
          But with advancements in technology like OCR (Optical Character
          Recognition) and Machine Learning, RPA bots are capable of extracting
          these data …
        </p>

        <div className="ml-2 flex items-center text-gray-700">
          <p className="text-sm text-gray-600">Jan 12, 2021</p>
        </div>
      </div>
    </div>
  );
};
