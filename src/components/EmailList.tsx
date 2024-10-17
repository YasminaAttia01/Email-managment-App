import React from 'react';
import EmailItem from './EmailItem';
import { Email } from '../models/Email';

interface EmailListProps {
  emails: Email[];
  onMarkAsRead: (ids: string[]) => void;
  onArchive: (ids: string[]) => void;
  handleEmailSelection: (ids: string[]) => void;
  selectedEmailIds: string[];
  onDoubleClick: (email: Email) => void; 
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  onMarkAsRead,
  onArchive,
  handleEmailSelection,
  selectedEmailIds,
  onDoubleClick, 
}) => {
  return (
    <div>
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          email={email}
          onSelectEmail={() => {
            const newSelectedIds = selectedEmailIds.includes(email.id)
              ? selectedEmailIds.filter(id => id !== email.id)
              : [...selectedEmailIds, email.id];
            handleEmailSelection(newSelectedIds);
          }}
          onMarkAsRead={() => onMarkAsRead([email.id])}
          onArchive={() => onArchive([email.id])}
          isSelected={selectedEmailIds.includes(email.id)}
          onDoubleClick={() => onDoubleClick(email)} 
        />
      ))}
    </div>
  );
};

export default EmailList;
