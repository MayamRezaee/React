import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { deletePersonService } from "../../services/userServices";
import { toastSuccessMessage } from "../../utils/ToastMessageComponent/ToastMessageComponent";

//Showing the list of people
const DetailsComponent = ({ person, handleGetAllPerson }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };
//Deleting a person 
  const handleDeletePerson = async () => {
    try {
      const { data, status } = await deletePersonService(person.id);
      if (status === 200) {
        toastSuccessMessage("You could successfully delete the person");
        handleCloseModal();
        handleGetAllPerson();
      }
    } catch (err) {}
  };
//Showing the detail info of a person 
  return (
    <Fragment>
      <button className="btn btn-info" onClick={handleShowModal}>
        details
      </button>

      <Modal show={isShowModal} onHide={handleCloseModal} size="md">
        <Modal.Header>
          <Modal.Title>{person?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>phone number : {person.phoneNumber}</p>
          <p>country name : {person?.country?.countryName}</p>
          <p>city name : {person?.city?.cityName}</p>
          <p>
            language :{" "}
            {person?.languagePerson?.map((lang) => `${lang?.languageName},`)}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="container">
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                close
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleDeletePerson(person.id)}
              >
                delete
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default DetailsComponent;
