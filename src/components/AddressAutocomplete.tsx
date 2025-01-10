import axios from 'axios';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { NominatimResponse } from '../types/models/NominatimApiModels';
import countryList from '../assets/static_datas/countries.json';
import SearchableDropdown from './SearchableDropdown/SearchableDropdown';
import FormInputUnderlined from './FormComponents/FormInputUnderlined';
import SideBySideInputContainer from './FormComponents/SideBySideInputContainer';
import { AddressAutocompleteProps } from '@/types/models/AddressAutocomplateModels';
import { SideBySideInputContainerSlotWidths } from '@/types/enums/SideBySideInputContainerEnums';

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  setCountryVal,
  formik,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResponse[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('DE');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const { values, handleChange, handleBlur, setFieldValue, errors, touched } =
    formik;

  const handleOutsideClick = (e: MouseEvent) => {
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
    const address = suggestion.address;

    setFieldValue('street', suggestion.name);
    setFieldValue('state', address.state || address.city || '');
    setFieldValue('postalCode', address.postcode ?? '');
    setFieldValue(
      'city',
      address.city ||
        address.city_district ||
        address.borough ||
        address.province ||
        ''
    );

    setIsSelecting(true);
    setQuery(suggestion.name);

    setTimeout(() => setIsSelecting(false), 400);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md flex flex-col gap-3 mx-auto">
      <FormInputUnderlined
        labelText={'Company Name'}
        inputValue={values.companyName}
        onInputChange={handleChange}
        onInputBlur={handleBlur}
        inputId={'companyName'}
        inputPlaceHolder={'Please enter your company name...'}
        errors={errors}
        touched={touched}
      />
      {/* Select Country */}
      <div>
        <label
          htmlFor="country"
          className="block text-gray-700 font-normal sm:font-medium mb-2"
        >
          Select Country
        </label>
        <SearchableDropdown
          countryList={countryList}
          onCountrySelect={setSelectedCountry}
        />
      </div>
      <div className="flex gap-4">
        {/* Street Input */}
        <div className="flex-1">
          <SideBySideInputContainer
            isByMdScreensInputsGrid={true}
            left={
              <>
                <FormInputUnderlined
                  labelText="Street Address"
                  inputValue={values.street}
                  onInputChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setQuery(e.target.value);
                  }}
                  onInputBlur={handleBlur}
                  inputId="street"
                  inputPlaceHolder="Enter street name"
                  errors={errors}
                  touched={touched}
                />
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 ? (
                  <ul
                    ref={suggestionListRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border-b border-gray-300  shadow-lg max-h-60 overflow-y-auto z-10"
                  >
                    {suggestions.map((suggestion: NominatimResponse, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="py-1 px-2 shadow-sm cursor-pointer hover:bg-gray-50"
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div></div>
                )}
              </>
            }
            right={
              <FormInputUnderlined
                labelText="House No."
                inputValue={values.houseNo}
                onInputChange={handleChange}
                onInputBlur={handleBlur}
                inputId="houseNo"
                inputPlaceHolder="House no."
                errors={errors}
                touched={touched}
              />
            }
            slotType={SideBySideInputContainerSlotWidths.smallRightSlot}
          />
        </div>
      </div>
      {/* State Input */}
      <div className="">
        <label
          htmlFor="state"
          className="block text-gray-700 font-normal sm:font-medium mb-2"
        >
          State
        </label>
        <input
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          id="state"
          type="text"
          className="w-full py-1 px-2  border-b border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter state or region"
        />
      </div>

      {/* Postal Code Input */}
      <div className="">
        <label
          htmlFor="postalCode"
          className="block text-gray-700 font-normal sm:font-medium mb-2"
        >
          Postal Code
        </label>
        <input
          value={values.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          id="postalCode"
          type="text"
          className="w-full py-1 px-2  border-b border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter postal code"
        />
      </div>

      {/* City Input */}
      <div className="">
        <label
          htmlFor="city"
          className="block text-gray-700 font-normal sm:font-medium mb-2"
        >
          City
        </label>
        <input
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          id="city"
          type="text"
          className="w-full py-1 px-2  border-b border-gray-300 focus:outline-none focus:border-black"
          placeholder="Enter city name"
        />
      </div>
    </div>
  );
};

export default AddressAutocomplete;
