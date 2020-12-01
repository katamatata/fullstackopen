import React from 'react';

const Notification = ({ isError, message }) => {
  if (!message) return null;

  return <div className={isError ? 'error' : 'notification'}>{message}</div>;
};

export default Notification;
