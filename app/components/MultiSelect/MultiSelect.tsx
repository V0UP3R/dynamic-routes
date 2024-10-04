import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Função de debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Chamada da API com termo de busca
const fetchCountries = async (query: string) => {
  if (!query) return [];
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${query}`
  );
  return response.data.map((country: any) => country.name.common);
};

const MultiSelectFilter: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  const debouncedFilter = useDebounce(filter, 1000); // Debounce de 1 segundo
  const dropdownRef = useRef<HTMLDivElement>(null); // Referência para a div do dropdown

  // Efeito que chama a API após o debounce
  useEffect(() => {
    const loadOptions = async () => {
      if (debouncedFilter) {
        const data = await fetchCountries(debouncedFilter);
        setFilteredOptions(data);
      } else {
        setFilteredOptions([]);
      }
    };
    loadOptions();
  }, [debouncedFilter]);

  // Função para selecionar/deselecionar opções
  const toggleOption = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  // Fecha o dropdown ao clicar fora
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  // Adiciona o listener de clique fora ao montar o componente
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Função para exibir os selecionados na div
  const renderSelectedOptions = () => {
    if (selectedOptions.length === 0) {
      return (
        <div className="flex flex-nowrap text-md justify-between h-full">
          <span className="text-gray-500">Clique para selecionar países</span>
          <div className="h-full flex items-start justify-start">
          {isActive ? <FaChevronUp/> : <FaChevronDown />}
          </div>
        </div>
      );
    }

    const displayedOptions = selectedOptions.slice(0, 4);
    const moreCount = selectedOptions.length;

    return (
      <div className="relative flex gap-2 justify-between w-full">
        <span className="flex flex-nowrap overflow-x-clip text-md w-5/6">
          {moreCount > 4 ? (
            <span className="bg-blue-100 text-blue-800 px-2 rounded-md mr-1 whitespace-nowrap">
              {`${moreCount} Selecionados`}
            </span>
          ) : (
            displayedOptions.map((option, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 rounded-md mr-1 whitespace-nowrap"
              >
                {option}
              </span>
            ))
          )}
        </span>
        {/* {moreCount > 0 && (
          <span className="bg-gray-200 text-gray-600 font-semibold px-2 py-1 rounded-md whitespace-nowrap">
            + {moreCount}
          </span>
        )} */}
        {isActive ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    );
  };

  return (
    <div className="p-4 relative max-w-xl" ref={dropdownRef}>
      {/* Div que ativa a lista ao ser clicada */}
      <div
        className="cursor-pointer p-2 border rounded-md bg-gray-100 w-80" // Div com tamanho fixo
        onClick={() => setIsActive(!isActive)}
      >
        {renderSelectedOptions()}
      </div>

      {/* Mostra o input e a lista ao ativar */}
      {isActive && (
        <div className="absolute mt-1 pt-2 px-2 left-1/2 transform -translate-x-1/2 w-full flex flex-col justify-center items-center bg-white border rounded-md shadow-lg z-10 max-w-80">
          {/* Input de filtro */}
          <input
            type="text"
            className="border border-gray-300 bg-gray-100 p-2 w-full mb-2 rounded-xl"
            placeholder="Filtrar países..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          {/* Lista de opções filtradas */}
          <ul className="max-h-40 overflow-y-auto w-full">
            {filteredOptions.map((option) => (
              <li key={option} className="p-2 hover:bg-gray-200">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                  />
                  <span>{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;
