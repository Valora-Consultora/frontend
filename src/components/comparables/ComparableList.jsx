const ComparableList = ({ handleLoadMoreComparables, handleSelectedComparable, page, comparables }) => {
  console.log("viendo comparables", comparables);
  return (
    comparables?.length > 0 ? (
      <div className="grid grid-cols-12 gap-4 mt-4">
        {/* Interested in: */}
        {/* results.title */}
        {/* results.price */}
        {/* results.location.address_line */}
        {/* results.thumbnail */}
        {comparables.map((comparable, index) => (
          <div
            key={index}
            className={`col-span-12 space-y-4 border p-3 rounded ${comparable.selected ? "ring-2 ring-green-900" : ""} ${index > 5*page - 1 ? "hidden" : ""}`}
            onClick={() => handleSelectedComparable(comparable.id)}
          >
            <h4 className="text-xl text-green-900">
              Comparable {index + 1}
            </h4>
            <div className="flex flex-row space-x-4">
              <img src={comparable.thumbnail} alt={comparable.title} />
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor={`comparable${index + 1}Title`}
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Título:
                  </label>
                  <input
                    type="text"
                    id={`comparable${index + 1}Title`}
                    name={`comparable${index + 1}Title`}
                    value={comparable.title}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor={`comparable${index + 1}Price`}
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Precio ({comparable.currency_id}):
                  </label>
                  <input
                    type="text"
                    id={`comparable${index + 1}Price`}
                    name={`comparable${index + 1}Price`}
                    value={comparable.price}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor={`comparable${index + 1}Address`}
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Dirección:
                  </label>
                  <input
                    type="text"
                    id={`comparable${index + 1}Address`}
                    name={`comparable${index + 1}Address`}
                    value={comparable.location.address_line}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor={`comparable${index + 1}Link`}
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Link:
                  </label>
                  <input
                    type="text"
                    id={`comparable${index + 1}Link`}
                    name={`comparable${index + 1}Link`}
                    value={comparable.permalink}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`col-span-12 bg-green-900 text-white py-2 rounded-md hover:bg-green-700 ${page === 5 || comparables.length < 5*page ? "hidden" : ""}`}
          onClick={handleLoadMoreComparables}
        >
          Cargar más
        </button>
      </div>
    ) : (
      <div className="text-center text-gray-700">
        No se encontraron comparables
      </div>
    )
  );
}

export default ComparableList;