const RadioGroup = ({ 
  options = [],
  name = '',
  selectedValue = '',
  onChange = () => {},
  onOptionChange = null,
  idPrefix = '',
  labelClassName = "text-green-900 font-bold",
  descriptionClassName = "text-sm text-gray-700",
  radioClassName = "form-radio h-4 w-4",
  itemClassName = "mb-2",
  horizontal = false // Nueva propiedad
}) => {
  return (
    <div className={horizontal ? "flex flex-row items-center gap-6" : ""}>
      {options.map((item) => (
        <div 
          key={item?.id ?? 'default-key'} 
          className={horizontal ? "flex items-center" : itemClassName}
        >
          <input
            type="radio"
            id={`${idPrefix}${item?.id}`}
            name={name}
            value={item?.value || item?.id}
            checked={selectedValue === (item?.value || item?.id)}
            onChange={(e) => {
              onChange(e);
              if (onOptionChange && item.relatedFields) {
                onOptionChange(item.relatedFields);
              }
            }}
            className={radioClassName}
          />
          <span className={horizontal ? "inline" : ""}>
            <label
              htmlFor={`${idPrefix}${item?.id}`}
              className={labelClassName}
            >
              {item?.label || item?.id}
            </label>
            {item?.desc && <p className={descriptionClassName}>{item.desc}</p>}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;