import { useMemo } from "react";
import Select from "react-select"

const MultiSelectUsers = ({
  label,
  allUsers = [],
  selectedUserIds = [],
  onChange,
  error,
  placeholder = "Selecione...",
  inputId = "multi-select-users",
  isLoading = false, // Adicionada propriedade isLoading
}) => {
  // Memoiza a transformação de 'allUsers' para o formato de opções do react-select
  const userOptions = useMemo(() => {
    return Array.isArray(allUsers)
      ? allUsers.map(user => ({
          value: String(user.id_usuario), // Garante que o valor seja string para consistência
          label: user.nome_usuario,
        }))
      : [];
  }, [allUsers]);

  // Memoiza a transformação dos 'selectedUserIds' para o formato de valor do react-select
  const selectedValueObjects = useMemo(() => {
    return userOptions.filter(option =>
      selectedUserIds.includes(option.value)
    );
  }, [selectedUserIds, userOptions]);

  // Lida com a mudança de seleção no react-select
  const handleReactSelectChange = (selectedOptionsFromReactSelect) => {
    // selectedOptionsFromReactSelect é um array de objetos {value, label} ou null
    const newSelectedIds = selectedOptionsFromReactSelect
      ? selectedOptionsFromReactSelect.map(option => option.value)
      : [];
    onChange(newSelectedIds); // Chama o onChange original com um array de IDs
  };

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
        isLoading={isLoading} // Passa o estado de loading para o react-select
        noOptionsMessage={() => isLoading ? "Carregando participantes..." : "Nenhum participante encontrado"}
        className="react-select-container"
        classNamePrefix="react-select"
        // Exemplo de estilização básica para se assemelhar ao Tailwind (opcional)
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: '#f9fafb', // bg-gray-50
            borderColor: error ? '#ef4444' : (state.isFocused ? '#60a5fa' : '#d1d5db'),
            boxShadow: state.isFocused ? '0 0 0 1px #60a5fa' : base.boxShadow,
            minHeight: 'calc(2.5rem + 2px)',
            fontSize: '0.875rem',
            '&:hover': {
              borderColor: error ? '#ef4444' : '#9ca3af',
            },
          }),
          input: (base) => ({ ...base, paddingTop: '0.3rem', paddingBottom: '0.3rem', margin: '0px' }),
          valueContainer: (base) => ({ ...base, padding: '0px 6px' }),
          multiValue: (base) => ({ ...base, backgroundColor: '#e5e7eb' }),
          multiValueLabel: (base) => ({ ...base, color: '#1f2937' }),
          placeholder: (base) => ({ ...base, color: '#6b7280' }),
          menu: (base) => ({ ...base, zIndex: 10 })
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelectUsers;