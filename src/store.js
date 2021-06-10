import React, { useContext, useState } from 'react';
const AppContext = React.createContext();

const Provider = (props) => {
  const [myShit, setMyShit] = useState({});
  const [coinsError, setCoinsError] = useState(null);
  const [coinsLoading, setCoinsLoading] = useState(false);
  const [coinsLoadingQuietly, setCoinsLoadingQuietly] = useState(false);
  const [coins, setCoins] = useState(false);

  const value = {
    myShit,
    setMyShit,
    coinsError,
    setCoinsError,
    coinsLoading,
    setCoinsLoading,
    coins,
    setCoins,
    coinsLoadingQuietly,
    setCoinsLoadingQuietly,
  };

  return (
    <AppContext.Provider value={value}>
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
