import React from 'react';

import { ErrorMessage, SuccessMessage } from './NotificationElements';

export const Notification = ({ isError, message }) => {
  if (!message) return null;

  return (
    <>
      {isError ? (
        <ErrorMessage>{message}</ErrorMessage>
      ) : (
        <SuccessMessage>{message}</SuccessMessage>
      )}
    </>
  );
};
