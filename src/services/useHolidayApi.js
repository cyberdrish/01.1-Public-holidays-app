import axios from "axios";
import { useCallback } from "react";

const useHolidayApi = () => {
  const getHolidayData = useCallback((query) => {
    return axios
      .get(
        import.meta.env.VITE_HOLIDAYS_API_URL + `&country=${query}&year=2024`
      )
      .then((res) => {
        return res.data.holidays;
      })
      .catch((err) => {
        console.log("Error", err);
        throw err;
      });
  }, []);
  const getCountryData = useCallback(() => {
    return axios
      .get(import.meta.env.VITE_HOLIDAYS_API_COUNTRY_LIST)
      .then((res) => {
        return res.data.countries.sort((a, b) => a.name.localeCompare(b.name));
      })
      .catch((err) => {
        console.log("Error", err);
        throw err;
      });
  }, []);
  return { getCountryData, getHolidayData };
};
export default useHolidayApi;
