import React from 'react';

const Message = ({ type, children }) => {
  const onMessageDismiss = () => {
    const message = document.querySelector('.message');
    message.style.display = 'none';
  };

  return (
    <div className={`ui ${type} message`}>
      <i onClick={() => onMessageDismiss()} className="close icon"></i>
      <div className="header">
        {children}
      </div>
    </div>
  );
};

export default Message;


