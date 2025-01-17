interface FormFieldProp {
  id?: string;
  label?: string;
  unit?: string;
  type?: string;
  options?: string[];
  divClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  value?: number | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProp> = ({
  id,
  label,
  unit,
  divClassName,
  inputClassName,
  placeholder,
  value,
  type,
  onChange,
  options,
}) => {
  if (type === "radio" && options) {
    return (
      <div className="w-full mt-2">
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>
        <div className="flex flex-col gap-4 mt-2 w-full ">
          {options.map((option) => (
            <div
              key={option}
              className={`border-gray-300 rounded-md border-[1px] py-2 radio-option ${
                value === option ? "bg-lime-100 backdrop-blur-md" : ""
              } transition-all duration-300 ease-in-out`}
            >
              <input
                id={option}
                name={id} // Same name for all radio buttons to group them
                type={type}
                value={option}
                checked={value === option}
                onChange={onChange}
                className="ml-2 mr-2 "
              />
              <label htmlFor={option} className="text-gray-900">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative mt-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      {unit && (
        <div className={divClassName}>
          <span>{unit}</span>
        </div>
      )}
      <input
        id={id}
        name={id}
        type={type}
        step="any"
        value={value}
        onChange={onChange}
        className={inputClassName}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;
