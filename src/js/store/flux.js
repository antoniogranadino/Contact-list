const API_URL = "https://playground.4geeks.com/apis/fake/contact/";
const AGENDA_SLUG = "antoniogranadino";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      agenda: null,
    },
    actions: {
      getAgenda: async () => {
        const response = await fetch(`${API_URL}agenda/${AGENDA_SLUG}`);
        console.log(response);
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setStore({ agenda: data });
          return true;
        }
        setStore({ agenda: false });
        return false;
      },

      createContact: async (newContact) => {
        const actions = getActions();
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(newContact),
          headers: { "Content-Type": "application/json" },
        });
        const data = response.json();
        if (response.ok) {
          actions.getAgenda();
          return data;
        }
        return null;
      },

      updateContact: async (newContact) => {
        const actions = getActions();
        const response = await fetch(API_URL + newContact.id, {
          method: "PUT",
          body: JSON.stringify(newContact),
          headers: { "Content-Type": "application/json" },
        });
        const data = response.json();
        if (response.ok) {
          actions.getAgenda();
          return data;
        }
        return null;
      },

      deleteContact: async (id) => {
        const store = getStore();
        const response = await fetch(API_URL + id, {
          method: "DELETE",
        });
        const data = response.json();
        if (response.ok) {
          setStore({
            agenda: store.agenda.filter((contact) => contact.id != id),
          });
          return data;
        }
        return null;
      },
    },
  };
};
export default getState;
