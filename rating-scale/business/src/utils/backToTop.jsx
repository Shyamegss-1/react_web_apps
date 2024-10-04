export default function BackToTop() {
  const backToTop = () => {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-10 right-5"
      id="boko-no-p"
      style={{ display: "none" }}
    >
      <button
        onClick={() => backToTop()}
        className="inline-block rounded-full p-3 text-white base-bg"
        role="button"
      >
        <svg
          className="h-5 w-5 transform -rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
}
