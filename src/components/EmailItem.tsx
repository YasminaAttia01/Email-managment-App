import React from 'react';
import { Email } from '../models/Email';

interface EmailItemProps {
  email: Email;
  onSelectEmail: () => void;
  onMarkAsRead: () => void;
  onArchive: () => void;
  isSelected: boolean;
  onDoubleClick: () => void;
}

const EmailItem: React.FC<EmailItemProps> = ({
  email,
  onSelectEmail,
  isSelected,
  onDoubleClick,
}) => {
  return (
    <div
      onClick={onSelectEmail}
      onDoubleClick={onDoubleClick}
      className={`flex justify-between items-center p-2 my-2 rounded cursor-pointer transition ${email.isRead ? 'bg-gray-200' : isSelected ? 'bg-[#D6E2FB]' : 'bg-white'
        }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelectEmail}
          className="mr-2"
          aria-label={`Select email: ${email.subject}`}
        />
        <h3 className="font-semibold">{email.subject}</h3>
      </div>
      <div>
      </div>
    </div>
  );
};

export default EmailItem;
