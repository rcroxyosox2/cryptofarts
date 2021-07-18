import { useEffect, useState } from 'react';
import * as styles from './styles';
import { getGreensReds } from 'services/';
import socket from 'services/socket';
import Button from 'theme/Button';
import { getRandomGreenImgStyle, getRandomRedImgStyle } from 'images/';

const FB = ({children, ...props}) => (
  <styles.FilterButtonStyle {...props}>
    {
      (typeof children === 'string') 
      ? <span dangerouslySetInnerHTML={{__html: children.split(' ').join('<br />')}} /> 
      : <span>{children}</span>
    }
  </styles.FilterButtonStyle>
);

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
      <nav>
        <div>
          <FB filterType="green" selected>Da Greenz</FB>
          <FB filterType="red" selected>Da Redz</FB>
        </div>
        <div>
          <FB filterType="lrg" selected>Lrg capz</FB>
          <FB filterType="mid" selected>Mid capz</FB>
          <FB filterType="sm" selected>Sm capz</FB>
        </div>
      </nav>
      Hello there world
    </styles.GreensRedsStyle>
  );
};

export default GreensReds;
