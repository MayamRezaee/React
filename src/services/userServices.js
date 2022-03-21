import http from "./configServices/httpService";
import config from "./configServices/config.json";

export const getAllPersonService = () => {
  return http.get(`${config.structureApi}/api/person/all`);
};

export const addPersonService = (data) => {
  return http.post(`${config.structureApi}/api/person`, JSON.stringify(data));
};

export const deletePersonService = (id) => {
  return http.delete(`${config.structureApi}/api/person/${id}`);
};

export const getAllLangService = () => {
  return http.get(`${config.structureApi}/api/langs`);
};

export const getAllCityService = (countryName) => {
  return http.get(`${config.structureApi}/api/country/cities/${countryName}`);
};

export const getAllCountryService = () => {
  return http.get(`${config.structureApi}/api/country`);
};
