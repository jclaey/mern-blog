import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

const Modal = ({ header, content, actions }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  return ReactDOM.createPortal(
    <div
      onClick={() => navigate(`/post/${id}`)}
      className="ui dimmer modals visible active"
    >
      <div 
        onClick={e => e.stopPropagation()}
        className="ui standard visible modal active"
      >
        <div className="header">
          {header}
        </div>
        <div className="content">
          {content}
        </div>
        <div className="actions">
          {actions}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
