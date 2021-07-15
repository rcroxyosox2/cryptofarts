import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './Router';
import Logo from 'components/Logo';
import { saveDay } from 'redux/summary';
import socket from 'services/socket';

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
    // socket.off(socketname, daySocketFn).on(socketname, daySocketFn);
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
