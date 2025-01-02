import axios from 'axios';
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NominatimResponse } from '../types/models/NominatimApiModels';
import countryList from '../assets/static_datas/countries.json';
import SearchableDropdown from './SearchableDropdown';

interface AddressAutocompleteProps {
  setCountryVal: CallableFunction;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  houseNoVal: string;
  stateVal: string;
  postalCodeVal: string;
  cityVal: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  setCountryVal,
  handleChange,
  handleBlur,
  houseNoVal,
  stateVal,
  postalCodeVal,
  cityVal,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResponse[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('DE');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const postalCode = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const state = useRef<HTMLInputElement>(null);
  const no = useRef<HTMLInputElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    console.log('first');
    if (
      suggestionListRef.current &&
      !suggestionListRef.current.contains(e.target as Node)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isSelecting) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(query ?? '');
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 3) {
      const api = `https://nominatim.openstreetmap.org/search?countrycodes=${selectedCountry}&q=${encodeURIComponent(
        debouncedQuery
      )}&format=json&addressdetails=1`;

      axios
        .get(api)
        .then((res) => res.data)
        .then((data: NominatimResponse[]) => setSuggestions(data))
        .catch((error) => {
          console.error('Openstreetmap Nominatim API Error: ', error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, selectedCountry]);

  useEffect(() => {
    setCountryVal(selectedCountry);
  }, [selectedCountry]);

  const handleSuggestionClick = (suggestion: NominatimResponse) => {
    setIsSelecting(true);
    setQuery(suggestion.name);
    const address = suggestion.address;
    if (city.current && postalCode.current && state.current) {
      state.current.value = address.state || address.city || '';
      city.current.value =
        address.city ||
        address.city_district ||
        address.borough ||
        address.province ||
        '';
      postalCode.current.value = address.postcode ?? '';
    }
    setTimeout(() => setIsSelecting(false), 400);
    setSuggestions([]);
  };

  const handleStreetChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setQuery(e.target.value);
    // setStreetVal(e.target.value)
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Select Country */}
      <div className="mb-6">
        <label
          htmlFor="country"
          className="block text-gray-700 font-medium mb-2"
        >
          Select Country
        </label>
        <SearchableDropdown
          countryList={countryList}
          onCountrySelect={setSelectedCountry}
        />
      </div>

      {/* Street Input */}
      <div className="mb-6">
        <label
          htmlFor="street"
          className="block text-gray-700 font-medium mb-2"
        >
          Street Address
        </label>
        <input
          id="street"
          type="text"
          value={query}
          onChange={handleStreetChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter street name"
        />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul
            ref={suggestionListRef}
            className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
          >
            {suggestions.map((suggestion: NominatimResponse, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* No Input */}
      <div className="mb-6">
        <label
          htmlFor="number"
          className="block text-gray-700 font-medium mb-2"
        >
          House Number
        </label>
        <input
          value={houseNoVal}
          onChange={handleChange}
          onBlur={handleBlur}
          id="houseNo"
          ref={no}
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter house number"
        />
      </div>

      {/* State Input */}
      <div className="mb-6">
        <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
          State
        </label>
        <input
          value={stateVal}
          onChange={handleChange}
          onBlur={handleBlur}
          id="state"
          ref={state}
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter state or region"
        />
      </div>

      {/* Postal Code Input */}
      <div className="mb-6">
        <label
          htmlFor="postalCode"
          className="block text-gray-700 font-medium mb-2"
        >
          Postal Code
        </label>
        <input
          value={postalCodeVal}
          onChange={handleChange}
          onBlur={handleBlur}
          id="postalCode"
          ref={postalCode}
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter postal code"
        />
      </div>

      {/* City Input */}
      <div className="mb-6">
        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
          City
        </label>
        <input
          value={cityVal}
          onChange={handleChange}
          onBlur={handleBlur}
          id="city"
          ref={city}
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter city name"
        />
      </div>
    </div>
  );
};

export default AddressAutocomplete;
