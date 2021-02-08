import React from 'react';
import PropTypes from 'prop-types';

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

Notification.propTypes = {
  isError: PropTypes.bool,
  message: PropTypes.string,
};
