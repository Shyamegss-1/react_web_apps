/* eslint-disable react/prop-types */
const Accordion = ({ title, children, className, icon }) => {
  return (
    <div className={`w-full overflow-hidden`}>
      <div
        className={`w-full cursor-pointer bg-gray-100 p-4 flex justify-between ${className}`}
      >
        <div className="space-x-4 flex items-center">
          <div>
            <i className={`fa ${icon}`} aria-hidden="true"></i>
          </div>
          <h6 className="text-base font-semibold">{title}</h6>
        </div>

        <div>
          <i className="fa fa-chevron-down poro" aria-hidden="true"></i>
        </div>
      </div>

      <div className="bg-gray-100 border-gray-300 hidden p-4 transition-all ease-in-out">
        {children}
      </div>
    </div>
  );
};

export default Accordion;
