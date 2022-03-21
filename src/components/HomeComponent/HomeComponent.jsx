import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllPersonService,
} from "../../services/userServices";
import DetailsComponent from "../DetailsComponent/DetailsComponent";

const HomeComponent = () => {
  const [persons, setPersons] = useState([]);

  const handleGetAllPerson = async () => {
    try {
      const { data, status } = await getAllPersonService();
      if (status === 200) {
        setPersons(data);
      }
    } catch (err) {}
  };
//How to sort the persons in the list by Name
  const handleSortWithName = () => {
    const arr = [...persons]; // make a copy of persons
    arr.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    setPersons(arr);
  };

  useEffect(() => {
    handleGetAllPerson();
  }, []);

  return (
    <div className="container">
      <br />
      <Link className="btn btn-success" to="/Add">
        Add Person
      </Link>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>
              Name{" "}
              <button
                className="btn btn-primary py-0"
                onClick={handleSortWithName}
              >
                sort
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>
                <DetailsComponent
                  person={person}
                  handleGetAllPerson={handleGetAllPerson}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeComponent;
