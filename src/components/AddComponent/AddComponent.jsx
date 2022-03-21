import React, { Fragment, useEffect, useState } from "react";
import {
  addPersonService,
  getAllCityService,
  getAllCountryService,
  getAllLangService,
} from "../../services/userServices";

import {
  deliverySuccessMessage,
  toastErrorMessage,
} from "../../utils/ToastMessageComponent/ToastMessageComponent";

const AddComponent = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [languageName, setLanguageName] = useState([]);
  const [fullName, setFullName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddPerson = async (event) => {
    event.preventDefault();

  

    const objData = {
      FullName: fullName,
      CityName: cityName,
      PhoneNum: Number(phoneNumber),
      LanguageName: languageName,
      CountryName: countryName,
    };
    
    try {
      const { data, status } = await addPersonService(objData);
      if (status === 200) {
        deliverySuccessMessage("New person added to the list", "/");
      }
    } catch (err) {}
  };

  const handleGetAllCountry = async () => {
    try {
      const { data, status } = await getAllCountryService();
      if (status === 200) {
        setCountries(data);
      }
    } catch (err) {}
  };

  const handleGetAllCity = async (countryName) => {
    try {
      const { data, status } = await getAllCityService(countryName);
      if (status === 200) {
        setCities(data);
      }
    } catch (err) {}
  };

  const handleGetAllLangs = async () => {
    try {
      const { data, status } = await getAllLangService();
      if (status === 200) {
        setLanguages(data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (countryName) {
      handleGetAllCity(countryName);
    }
  }, [countryName]);

  useEffect(() => {
    handleGetAllCountry();
    handleGetAllLangs();
  }, []);

  return (
    <div className="container">
      <form onSubmit={(e) => handleAddPerson(e)}>
        <div className="form-group">
          <label className="control-label" htmlFor="FullName">
            FullName
          </label>
          <input
            className="form-control"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            name="FullName"
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="CountryName">
            CountryName
          </label>
          <select
            name="CountryName"
            onChange={(e) => setCountryName(e.target.value)}
          >
            <option value="">none</option>
            {countries.map((countryItem) => (
              <option value={countryItem.countryName}>
                {countryItem.countryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="CityName">
            CityName
          </label>
          <select name="CityName" onChange={(e) => setCityName(e.target.value)}>
            <option value="">none</option>
            {cities.map((cityItem) => (
              <option value={cityItem}>{cityItem}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="LanguageName">
            LanguageName
          </label>
          <select
            multiple
            name="LanguageName"
            onChange={(e) => {
              let value = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setLanguageName(value);
            }}
          >
            {languages.map((langItem) => (
              <option value={langItem.name}>{langItem.name}</option>
            ))}
          </select>
          <div className="form-group">
            <label className="control-label" htmlFor="PhoneNum">
              PhoneNum
            </label>
            <input
              className="form-control"
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              name="PhoneNum"
            />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddComponent;
