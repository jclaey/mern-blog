import React from 'react';

const Message = ({ type, children }) => {
  const onMessageDismiss = () => {
    const message = document.querySelector('.message');
    message.style.display = 'none';
  };

  return (
    <div class={`ui ${type} message`}>
      <i onClick={() => onMessageDismiss()} class="close icon"></i>
      <div class="header">
        {children}
      </div>
    </div>
  );
};

export default Message;


