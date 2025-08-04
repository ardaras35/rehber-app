import React, { createContext, useState } from "react";

export const PersonContext = createContext();

export default function PersonProvider({ children }) {
  const [people, setPeople] = useState([]);

  const addPerson = (person) => {
    setPeople((prev) => [...prev, { ...person, photo: person.photo || null }]);
  };

  const deletePerson = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePerson = (updatedPerson) => {
  setPeople((prevPeople) =>
    prevPeople.map((person) =>
      person.id === updatedPerson.id ? updatedPerson : person
    )
  );
};


  return (
    <PersonContext.Provider
      value={{
        people,
        addPerson,
        deletePerson,
        updatePerson,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
}
