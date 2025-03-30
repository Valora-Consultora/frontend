import Sell from '../../images/icons/sell.svg';
import Payments from '../../images/icons/payments.svg';
import Map from '../../images/icons/map.svg';
import Link from '../../images/icons/link.svg';
import Edit from '../../images/icons/edit.svg';
import CompareArrows from '../../images/icons/compare_arrows.svg';
import HousePlaceholder from '../../images/house-placeholder.png';

import { spaceNumber } from '../utils/formatters';

const SelectedComparableList = ({ handleEditHomologation, handleEditComparable, handleSelectMainComparable, comparables }) => {
  comparables = comparables.filter(comparable => comparable.title && comparable.price && comparable.location);

  //console.log("viendo comparables", comparables);
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
            className={`col-span-12 space-y-4 border p-3 rounded ${comparable.main ? "ring-2 ring-green-900" : ""}`}
          >
            <div className="flex flex-row space-x-2 items-center">
              <img src={Sell} />
              <span
                className="col-span-10 text-xl text-green-900 flex-grow"
                readOnly
              >
                {comparable.title}
              </span>
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
              <img src={comparable.thumbnail ?? HousePlaceholder} alt={comparable.title} className="max-w-64 max-h-64 ring-4 rounded ring-gray-300" />
              <div className="flex flex-col space-y-4 flex-grow">
                <div className="flex flex-row space-x-2 items-center">
                  <img src={Payments} />
                  <span
                    className="col-span-10"
                    readOnly
                  >
                    {(comparable.currency_id ?? "USD") + " " + spaceNumber(comparable.price)}
                  </span>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <img src={Map} />
                  <span
                    className="col-span-10"
                  >
                    {comparable.location.address_line}
                  </span>
                </div>
                <div className={`flex flex-row space-x-2 items-center ${comparable.permalink ? "" : "hidden"}`}>
                  <img src={Link} />
                  <a href={comparable.permalink} target="_blank" rel="noreferrer" className="col-span-10">
                    {comparable.id?.startsWith("MLU") ? "Ver en MercadoLibre" : "Ver en página"}
                  </a>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <img src={Edit} />
                  <button
                    type="button"
                    className="col-span-10 text-sm text-green-900 font-bold"
                    onClick={() => handleEditComparable(comparable)}
                  >
                    Editar comparable
                  </button>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <img src={CompareArrows} />
                  <button
                    type="button"
                    className="col-span-10 text-sm text-green-900 font-bold"
                    onClick={() => handleEditHomologation(comparable)}
                  >
                    Editar homologación
                  </button>
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