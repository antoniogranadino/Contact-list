import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard.jsx";

export const Home = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  return (
    <>
      <div className="container d-flex justify-content-end m-4">
        <button
          onClick={() => navigate("/add")}
          type="button"
          className="btn btn-success"
        >
          Add new contact
        </button>
      </div>
      <div className="container text-center">
        {store.agenda &&
          store.agenda.length > 0 &&
          store.agenda.map((contact, index) => {
            return (
              <ContactCard
                key={index}
                id={contact.id}
                fullName={contact.full_name}
                address={contact.address}
                email={contact.email}
                phone={contact.phone}
                index={index}
              />
            );
          })}
      </div>
    </>
  );
};
