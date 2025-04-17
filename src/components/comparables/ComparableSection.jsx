import React from 'react';
import { availableFilters as exportedFilters, stateFilters } from '../utils/availableFilters.ts';

const ComparableSection = ({ filters, modifyFilter, handleSubmit }) => {
  const [availableFilters, setAvailableFilters] = React.useState(exportedFilters);
  const [shownFilters, setShownFilters] = React.useState(false);
  const [state, setState] = React.useState();

  React.useEffect(() => {

    //console.log('useeffecting');
    if (state) {
      //console.log('setting state');
      //console.log(state);
      //console.log(stateFilters[state]);
      const newFilters = [...availableFilters];
      newFilters.find((filter) => filter.id === 'city').values = stateFilters[state] ?? [];
      setAvailableFilters(newFilters);
    }
  }, [state]);

  return (
    <div className="border p-4 rounded-lg mb-4 bg-white w-full">
      <div className="flex flex-col items-start space-y-4 w-full">
        <ShowFiltersButton className="mb-4" shownFilters={shownFilters} setShownFilters={setShownFilters} />
        {shownFilters && (
          <div className="grid grid-cols-12 gap-4">
            {availableFilters.map((filter) => <Filter filter={filter} modifyFilter={modifyFilter} filters={filters} state={state} setState={setState} />)}
          </div>
        )}
      </div>
      <button
        type='button'
        onClick={handleSubmit}
        className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6 "
      >
        Aplicar filtros
      </button>
    </div>
  );
};

const ShowFiltersButton = ({ className, shownFilters, setShownFilters }) => {
  return (
    <button
      type='button'
      onClick={() => setShownFilters((prev) => !prev)}
      className={className + " text-green-900 hover:text-green-700"}
    >
      {shownFilters ? "Ocultar filtros" : "Mostrar filtros"}
    </button>
  );
};

const Filter = ({filter, modifyFilter, filters, state, setState}) => {
  //console.log('filter', filter);
  return <div key={filter.id} className="col-span-6">
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {filter.name}
    </label>
    {filter.type === "range" ? (
      <div className="flex items-center">
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
          name={filter.id}
          onChange={(e) => modifyFilter(filter.id, e.target.value, { range: 0, subtype: filter.subtype })} />
        <label> — </label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
          name={filter.id}
          onChange={(e) => modifyFilter(filter.id, e.target.value, { range: 1, subtype: filter.subtype })} />
      </div>
    ) : null}
    {filter.type === "text" || filter.type === "STRING" ? (
      <select
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
        onChange={(e) => {
          if (filter.id === 'state') {
            setState(e.target.value)
          }
          modifyFilter(filter.id, e.target.value)
        }}
      >
        <option value={filters?.[filter.id] ?? ""}>Seleccionar {filter.name.toLowerCase()}</option>
        {filter.values?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    ) : null}
    {filter.type === "boolean" ? (
      <input
        type="checkbox"
        className="mr-2"
        value={filters?.[filter.id] ?? ""}
        onChange={(e) => modifyFilter(filter.id, e.target.checked)} />
    ) : null}
  </div>;
}

export default ComparableSection;