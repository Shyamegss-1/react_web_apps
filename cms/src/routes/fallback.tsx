import "nprogress/nprogress.css";
import "./fallback.style.css";

const Fallback = () => {
  //   useEffect(() => {
  //     NProgress.start();

  //     return () => {
  //       NProgress.done();
  //     };
  //   }, []);

  return (
    <div className="main-r3">
      <div className="loader">
        <p>loading</p>
        <div className="container">
          <span className="word occ">words</span>
          <span className="word occ">images</span>
          <span className="word occ">videos</span>
          <span className="word occ">cards</span>
          <span className="word occ">templete</span>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
