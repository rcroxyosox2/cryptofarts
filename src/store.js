import React, { useContext, useState } from 'react';
const AppContext = React.createContext();

const Provider = (props) => {
  const [
    state,
    setStateObj,
  ] = useState({
    hello: 'world'
  });

  //My shit
  const getMyShit = () => {
    return Array.isArray(state.myShit) ? [...state.myShit] : [];
  };

  const addToMyShit = (item) => {
    const myShit = getMyShit();
    myShit.push(item);
  }

  //Helpers
  const helpers = {
    getMyShit,
    addToMyShit
  };

  return (
    <AppContext.Provider value={{
      state,
      setState: (obj = {}) => {
        setStateObj({...state, ...obj});
      },
      helpers,
      }}>
      {props?.children}
    </AppContext.Provider>
  )
}

const useStore = () => useContext(AppContext);

export {
  useStore,
  Provider,
  AppContext,
};
