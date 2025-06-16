

const PageNotFound = () => {
  // Define the letters for your word search grid
  // 'null' or an empty string can represent empty spaces if needed,
  // but for a full 8x8 grid, we'll just have 64 characters.
  const gridLetters = [
    's', 'e', 'g', 'n', 'i', 'x', 'm', 'e',
    't', 'a', 'x', 'l', '4', '0', '4', 'y',
    'm', 'e', 'k', 'd', 'i', 'q', 'd', 'y',
    'p', 'a', 'p', 'a', 'g', 'e', 'v', 'a',
    'a', 'n', 'o', 't', 's', 'c', 'e', 's',
    'v', 'x', 'e', 'm', 'i', 'c', 'k', 's',
    'e', 'f', 'o', 'u', 'n', 'd', 's', 'e',
    'q', 'v', 'o', 't', 'n', 'i', 'm', 's',
  ];

  // Indices of the letters that should be highlighted (404 page not found)
  // This approach is more robust than individual classes like 'one', 'two', etc.
  const highlightedIndices = [
    12, 13, 14, // 404
    26,27, 28, 29, // page
    33,34, 35, // not
   49 , 50, 51 ,52,53// found
  ];

  return (
    <div className="max-h-screen bg-light-grey-bg text-text-dark flex justify-center items-start py-12 px-5 md:px-0">
      <div className="flex flex-col md:flex-row justify-center items-start gap-20 max-w-6xl w-full">

        {/* Word Search Grid Section */}
        <div className="flex-shrink-0 bg-wordsearch-bg p-5 rounded-lg shadow-md">
          <ul className="grid grid-cols-8 grid-rows-8 gap-0.5">
            {gridLetters.map((letter, index) => (
              <li
                key={index} // Using index as key is okay here because the list is static
                className={`
                  w-10 h-10 flex justify-center items-center font-bold text-lg uppercase rounded-md
                  shadow-inner
                  ${highlightedIndices.includes(index) ? 'bg-btn-primary text-white animate animate-pulse duration-500' : 'bg-grid-cell-bg text-gray-400'}
                `}
              >
                {letter}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Section */}
        <div className="flex-grow max-w-lg text-left">
          <h1 className="text-4xl md:text-5xl text-text-heading mb-5 font-normal">We couldn't find what you were looking for.</h1>

          <p className="leading-relaxed mb-4 text-text-paragraph">
            Unfortunately the page you were looking for could not be found. It may be
            temporarily unavailable, moved or no longer exist.
          </p>

          <p className="leading-relaxed mb-8 text-text-paragraph">
            Check the URL you entered for any mistakes and try again. Alternatively, search
            for whatever is missing or take a look around the rest of our site.
          </p>

      

          {/* Navigation Section */}
          {/* <div className="flex flex-wrap gap-4">
            <Link className="px-5 py-2 bg-nav-btn-bg text-text-dark font-bold rounded-md transition-colors duration-300 hover:bg-nav-btn-hover-bg" to="/">Home</Link>
            <Link className="px-5 py-2 bg-nav-btn-bg text-text-dark font-bold rounded-md transition-colors duration-300 hover:bg-nav-btn-hover-bg" to="/about">About Us</Link>
            <Link className="px-5 py-2 bg-nav-btn-bg text-text-dark font-bold rounded-md transition-colors duration-300 hover:bg-nav-btn-hover-bg" to="/sitemap">Site Map</Link>
            <Link className="px-5 py-2 bg-nav-btn-bg text-text-dark font-bold rounded-md transition-colors duration-300 hover:bg-nav-btn-hover-bg" to="/contact">Contact</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;