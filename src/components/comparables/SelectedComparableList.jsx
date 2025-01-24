const SelectedComparableList = ({ handleSelectMainComparable, page, comparables }) => {
  // comparables = comparables.filter(comparable => comparable.title && comparable.price && comparable.location && comparable.thumbnail && comparable.permalink);

  console.log("viendo comparables", comparables);
  return (
    comparables?.length > 0 ? (
      <div className="grid grid-cols-12 gap-4 mt-4">
        {comparables.map((comparable, index) => (
          <div
            key={index}
            className={`col-span-12 space-y-4 border p-3 rounded ${comparable.main ? "ring-2 ring-green-900" : (comparable.selected ? "ring-2 ring-red-900" : "")} ${index > 5 * page - 1 ? "hidden" : ""}`}
          >
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-xl text-green-900">
                Comparable {index + 1} {comparable.main ? "(Principal)" : ""}
              </h4>
              {/* Mark as main button */}
              <button
                type="button"
                className={`bg-green-900 text-white px-4 py-2 rounded-md`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectMainComparable(comparable.id);
                }}
              >
                {comparable.main ? "Desmarcar como principal" : "Marcar como principal"}
              </button>
            </div>
            <div className="flex flex-row space-x-4">
              <img src={comparable.thumbnail} alt={comparable.title} className="h-32 object-cover" />
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
                {/* <div className="grid grid-cols-12 gap-4 items-center">
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
                </div> */}
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
      </div>
    ) : (
      <div className="text-center text-gray-700">
        No se encontraron comparables
      </div>
    )
  );
}

export default SelectedComparableList;