import { useEffect } from 'react';
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import Router from './Router';
import Logo from 'components/Logo';
import { saveDay } from 'redux/summary';

const App = () => { 
  const socket = io();
  const dispatch = useDispatch();
  useEffect(() => {
    // socket.on('chat message', function(msg) {
    //   console.log(msg);
    // });
    // saveDay
    socket.on('day', (day) => {
      dispatch(saveDay(day));
    });
    // socket.on('test', (msg) => {
    //   console.log('msg', msg)
    // });
  }, [])

  const sendMessage = () => {
    socket.emit('chat message', 'here is the message...');
  }

  return (
    <div>
      {/* <button onClick={sendMessage}>Click to test out the thing</button> */}
      <Router />
    </div>
  );
};

export default App;
