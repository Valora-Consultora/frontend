import Sell from '../../images/icons/sell.svg';
import Payments from '../../images/icons/payments.svg';
import Map from '../../images/icons/map.svg';
import Link from '../../images/icons/link.svg';

import { spaceNumber } from '../utils/formatters';

const ITEMS_PER_PAGE = 6;
const MAX_PAGE = 5;

const ComparableList = ({ handleLoadMoreComparables, handleSelectedComparable, handleSelectMainComparable, page, comparables }) => {
  comparables = comparables.filter(comparable => comparable.title && comparable.price && comparable.location && comparable.thumbnail && comparable.permalink);
  comparables = comparables.slice(0, ITEMS_PER_PAGE * page);

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
            className={`col-span-6 space-y-4 border p-3 rounded hover:ring-2 hover:ring-green-900 cursor-pointer ${comparable.selected ? "ring-2 ring-green-900" : ""}`}
            onClick={() => handleSelectedComparable(comparable.id)}
          >
            <div className="flex flex-row space-x-2 items-center">
              <img src={Sell} />
              <span
                className="col-span-10 text-xl text-green-900"
                readOnly
              >
                {comparable.title}
              </span>
            </div>
            <div className="flex flex-row space-x-4">
              <img src={comparable.thumbnail} alt={comparable.title} className="max-w-64 max-h-64 ring-4 rounded ring-gray-300" />
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-2 items-center">
                  <img src={Payments} />
                  <span
                    className="col-span-10"
                    readOnly
                  >
                    {comparable.currency_id + " " + spaceNumber(comparable.price)}
                  </span>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <img src={Map} />
                  <span
                    className="col-span-10"
                    readOnly
                  >
                    {comparable.location.address_line}
                  </span>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <img src={Link} />
                  {/* <label
                    htmlFor={`comparable${index + 1}Link`}
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Link:
                  </label> */}
                  <a href={comparable.permalink} target="_blank" rel="noreferrer" className="col-span-10">
                    Ver en MercadoLibre
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`col-span-12 bg-green-900 text-white py-2 rounded-md hover:bg-green-700 ${page === MAX_PAGE || comparables.length < ITEMS_PER_PAGE * page ? "hidden" : ""}`}
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