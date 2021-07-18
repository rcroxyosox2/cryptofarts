import { useEffect, useState } from 'react';
import * as styles from './styles';
import { getGreensReds } from 'services/';
import socket from 'services/socket';

const GreensReds = () => {
  const socketName = 'greensreds';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [greensReds, setGreensReds] = useState(null);
  const socketFn = (greensReds) => {
    setGreensReds(greensReds);
  };

  useEffect(() => {
    setLoading(true);
    getGreensReds().then((resp) => {
      setLoading(false);
      setError(false);
      setGreensReds(resp);
    }).catch((e) => {
      setLoading(false);
      setError(e);
      setGreensReds(null);
    });

    socket
    .off(socketName, socketFn)
    .on(socketName, socketFn)
  }, [])

  console.log(greensReds);

  return (
    <styles.GreensRedsStyle>
      Hello there world
    </styles.GreensRedsStyle>
  );
};

export default GreensReds;
