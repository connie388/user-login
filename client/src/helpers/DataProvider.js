import React, { useState, createContext } from "react";

export const DataContext = createContext([]);

export const DataProvider = (props) => {
  const [authenticate, setAuthenticate] = useState(false);

  return (
    <div>
      <DataContext.Provider value={[authenticate, setAuthenticate]}>
        {props.children}
      </DataContext.Provider>
    </div>
  );
};
