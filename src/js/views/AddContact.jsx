import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../store/appContext";
import { element } from "prop-types";

const AddContact = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { store, actions } = useContext(Context);
  const [currentContact, setCurrentContact] = useState({});
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = null;
    if (!params.id) {
      response = await actions.createContact({
        full_name: fullName,
        email: email,
        agenda_slug: "antoniogranadino",
        address: address,
        phone: phone,
      });
    } else {
      response = await actions.updateContact({
        id: Number(id),
        full_name: fullName,
        email: email,
        agenda_slug: "antoniogranadino",
        address: address,
        phone: phone,
      });
    }

    if (response) {
      alert(response.msg);
      navigate("/");
    }
  };

  useEffect(() => {
    if (params.id) {
      const contact = store.agenda[Number(params.id)];
      if (contact) {
        console.log(contact);
        setId(contact.id);
        setFullName(contact.full_name);
        setAddress(contact.address);
        setEmail(contact.email);
        setPhone(contact.phone);
      }
    }
  }, [params.id]);
  console.log(currentContact);

  return (
    <div className="m-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            name="full_name"
            placeholder="Type your name"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group mb-3">
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            name="address"
            placeholder="Type your address"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group mb-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder="Type your email"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group mb-3">
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            name="phone"
            placeholder="Type your Phone number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
      <div className="my-4">
        <button onClick={() => navigate("/")}>Or get back to contacts</button>
      </div>
    </div>
  );
};

export default AddContact;
