import React from 'react';

import { Message } from './NotificationElements';

export const Notification = ({ notification }) => {
  if (!notification) return null;

  return <Message>{notification}</Message>;
};
