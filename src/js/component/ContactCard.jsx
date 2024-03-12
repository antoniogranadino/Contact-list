import React, { useContext } from "react";
import { useNavigate } from "react-router";
import Mrwhite from "../../img/walter-white.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faPhone,
  faEnvelope,
  faUserEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

const ContactCard = (props) => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const deleteContact = async (id) => {
    const response = await actions.deleteContact(id);
    if (response) {
      alert(response.msg);
    }
  };
  return (
    <>
      <div className="card container text-center m-4">
        <div className="row align-items-center">
          <div className="col container d-flex justify-content-center">
            <img
              className="text-center m-4 rounded-circle w-100"
              src={Mrwhite}
              alt="Mr white"
            />
          </div>
          <div className="col text">
            <p>{props.fullName}</p>
            <div>
              <FontAwesomeIcon icon={faLocationPin} />
              <p>{props.address}</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>{props.email}</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} />
              <p>{props.phone}</p>
            </div>
          </div>
          <div className="col">
            <FontAwesomeIcon
              role="button"
              onClick={() => navigate("/edit/" + props.index)}
              icon={faUserEdit}
            />
            <FontAwesomeIcon
              role="button"
              onClick={() => deleteContact(props.id)}
              icon={faTrash}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
