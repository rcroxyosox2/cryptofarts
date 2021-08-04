import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { saveDay } from 'redux/summary';
import phonebgImg from 'images/phonebg.png';
import rad from 'video/rad.mp4';
import socket from 'services/socket';


const VideoStyle = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    display: none;
  }
`;
const VideoBG = () => {
  return (
    <VideoStyle autoPlay muted loop id="rad">
      <source src={rad} type="video/mp4" />
    </VideoStyle>
  );
}

const PhoneBGStyle = styled.div.attrs({ className: 'PhoneBGStyle' })`
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${phonebgImg});
  background-position: center 50%;
  background-size: 1214px;
  background-repeat: no-repeat;
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    display: none;
  }
`;

const App = () => { 
  const dispatch = useDispatch();
  const socketname = 'day';
  
  const daySocketFn = (day) => {
    dispatch(saveDay(day));
  };

  // DONT update the store here. I causes everything to be called multiple times
  useEffect(() => {
    // socket.on('chat message', function(msg) {
    //   console.log(msg);
    // });
    // saveDay
    socket.off(socketname, daySocketFn).on(socketname, daySocketFn);
    socket.on('test', (msg) => {
      console.log('msg', msg)
    });
  }, [])

  return (
    <div>
      <VideoBG />
      <PhoneBGStyle />
      {/* <button onClick={sendMessage}>Click to test out the thing</button> */}
      <Router />      
    </div>
  );
};

export default App;
