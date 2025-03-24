import { useEffect, useState } from "react";
import "./App.css";
import useHolidayApi from "./services/useholidayApi";

function App() {
  const { getCountryData, getHolidayData } = useHolidayApi();
  const [selectedCountry, setSelectedCountry] = useState("NL");
  const [holidayListData, setHolidayListData] = useState([]);
  const [countryListData, setCountryListData] = useState([]);

  useEffect(() => {
    getCountryData()
      .then((countries) => setCountryListData(countries))
      .catch((error) => console.error("Error fetching country data:", error));
  }, [getCountryData]);

  useEffect(() => {
    if (selectedCountry) {
      getHolidayData(selectedCountry)
        .then((holidays) => setHolidayListData(holidays))
        .catch((error) => console.error("Error fetching holiday data:", error));
    } else {
      setHolidayListData([]);
    }
  }, [selectedCountry, getHolidayData]);

  return (
    <div className="container mx-auto p-4">
      <div className="m-2 flex justify-center items-center">
        <label htmlFor="selectedCountry" className="text-2xl mr-2">
          Select country:
        </label>
        <select
          id="selectedCountry"
          className="border-2 m-3 rounded-md shadow-amber-100 hover:bg-gray-100 min-w-[200px] p-2"
          title="Select your country"
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
        >
          <option key="default" value="">
            select your country
          </option>
          {countryListData && countryListData.length > 0 ? (
            countryListData.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))
          ) : (
            <option disabled>Loading countries...</option>
          )}
        </select>
      </div>
      <div className="flex justify-center">
        {selectedCountry && (
          <ul className="text-center items-center justify-center">
            <li className="text-5xl p-3 m-2">Holidays:</li>
            {holidayListData && holidayListData.length > 0 ? (
              holidayListData.map((val) => (
                <li className="text-left pl-30" key={val.uuid}>
                  {val.date} - <span className="font-bold">{val.name}</span>
                </li>
              ))
            ) : (
              <li className="text-2xl text-center" key="LoadingHolidays">
                Loading Holidays....
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
