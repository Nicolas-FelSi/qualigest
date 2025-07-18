const InputField = ({ label, name, type = "text", value, onChange, error, placeholder, disabled = false }) => {
  const disabledClasses = disabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50";

  return (
    <div className="mt-2">
      <label htmlFor={name} className="mb-2 text-sm font-medium">
        {label} *
      </label>
      <div className="flex">
        <input
          type={type}
          id={name}
          className={`rounded-lg bg-gray-50 border text-gray-900 w-full text-sm p-2.5 ${disabledClasses} ${
            error ? "border-red-400" : "border-gray-300"
          }`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="py-1 rounded-sm text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
};

export default InputField;