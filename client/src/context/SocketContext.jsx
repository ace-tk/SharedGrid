import React, { createContext, useEffect, useState } from 'react';
import { socket } from '../services/socket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [lastClaimedBlock, setLastClaimedBlock] = useState(null);

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      setIsConnected(true);
      setIsReconnecting(false);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onReconnectAttempt = () => {
      setIsReconnecting(true);
    };

    const onConnectError = (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    };

    const onOnlineUsers = (data) => {
      setOnlineUsers(data.onlineUsers);
    };

    const onBlockClaimed = (data) => {
      setLastClaimedBlock(data.block);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('reconnect_attempt', onReconnectAttempt);
    socket.on('connect_error', onConnectError);
    socket.on('online-users', onOnlineUsers);
    socket.on('block-claimed', onBlockClaimed);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('reconnect_attempt', onReconnectAttempt);
      socket.off('connect_error', onConnectError);
      socket.off('online-users', onOnlineUsers);
      socket.off('block-claimed', onBlockClaimed);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, isReconnecting, onlineUsers, lastClaimedBlock, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
