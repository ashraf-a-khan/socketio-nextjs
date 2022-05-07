import io from 'socket.io-client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io();

      setSocket(socket);
      socket.on('connect', () => {
        console.log('connect');
        socket.emit('hello');
      });

      socket.on('a user connected', () => {
        console.log('a user connected');
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });

      socket.on('pong', () => {
        console.log(' <<< PONG received back');
      });
    });
  }, []); // Added [] as useEffect filter so it will be executed only once, when component is mounted

  const handlePing = () => {
    console.log('PING SENT >>>');
    socket.emit('ping', { foo: 'bar' });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-5xl'>Socket io demo</h1>
      <h2>I am on the client AKA browser</h2>

      <button className='p-2 bg-red-500' onClick={handlePing}>
        PING the server
      </button>
    </div>
  );
}
