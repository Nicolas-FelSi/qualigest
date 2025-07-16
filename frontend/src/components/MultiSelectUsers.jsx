import { useMemo } from "react";
import Select from "react-select";
import handleImageProfile from "../utils/handleImageProfile"; 

const MultiSelectUsers = ({
  label,
  allUsers = [],
  selectedUserIds = [],
  onChange,
  error,
  placeholder = "Selecione...",
  inputId = "multi-select-users",
  isLoading = false,
}) => {

  const userOptions = useMemo(() => {
    return Array.isArray(allUsers)
      ? allUsers.map(user => ({
          ...user,
          value: String(user.id_usuario),
          label: `${user.nome_completo} ${user.nome_usuario}`,
        }))
      : [];
  }, [allUsers]);

  const selectedValueObjects = useMemo(() => {
    return userOptions.filter(option =>
      selectedUserIds.includes(option.value)
    );
  }, [selectedUserIds, userOptions]);

  const handleReactSelectChange = (selectedOptionsFromReactSelect) => {
    const newSelectedIds = selectedOptionsFromReactSelect
      ? selectedOptionsFromReactSelect.map(option => option.value)
      : [];
    onChange(newSelectedIds);
  };

  const formatOptionLabel = (user) => (
    <div className="flex items-center">
      <img
        src={handleImageProfile(user.foto_perfil)}
        alt={`Foto de ${user.nome_completo}`}
        className="w-8 h-8 rounded-full mr-3 object-cover"
      />
      <div>
        <div className="font-bold text-gray-800">{user.nome_completo}</div>
        <div className="text-sm text-gray-500">@{user.nome_usuario}</div>
      </div>
    </div>
  );

  return (
    <div className="mt-2">
      {label && (
        <label htmlFor={inputId} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <Select
        id={inputId}
        isMulti
        options={userOptions}
        value={selectedValueObjects}
        onChange={handleReactSelectChange}
        placeholder={placeholder}
        isLoading={isLoading}
        noOptionsMessage={() => isLoading ? "Carregando participantes..." : "Nenhum participante encontrado"}
        formatOptionLabel={formatOptionLabel}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: '#f9fafb',
              borderColor: error ? '#ef4444' : (state.isFocused ? '#60a5fa' : '#d1d5db'),
              boxShadow: state.isFocused ? '0 0 0 1px #60a5fa' : base.boxShadow,
              minHeight: 'calc(2.5rem + 2px)',
              fontSize: '0.875rem',
              '&:hover': {
                borderColor: error ? '#ef4444' : '#9ca3af',
              },
            }),
            input: (base) => ({ ...base, paddingTop: '0.3rem', paddingBottom: '0.3rem', margin: '0px' }),
            valueContainer: (base) => ({ ...base, padding: '2px 6px' }),
            multiValue: (base) => ({ ...base, backgroundColor: '#e5e7eb', margin: '2px' }),
            multiValueLabel: (base) => ({ ...base, color: '#1f2937', paddingRight: '6px' }),
            placeholder: (base) => ({ ...base, color: '#6b7280' }),
            menu: (base) => ({ ...base, zIndex: 10 }),
            option: (base, state) => ({
               ...base,
               backgroundColor: state.isFocused ? '#eef2ff' : base.backgroundColor,
               color: state.isSelected ? '#1f2937' : base.color,
            }),
          }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelectUsers;