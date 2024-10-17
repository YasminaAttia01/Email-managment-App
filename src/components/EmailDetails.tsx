
import React from 'react';
import { Email } from '../models/Email';

interface EmailDetailsProps {
  email: Email;
  onArchive: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onBack: () => void;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email, onArchive, onMarkAsRead, onBack }) => {
  const handleMarkAsRead = () => {
    onMarkAsRead(email.id);
  };

  const handleArchive = () => {
    onArchive(email.id);
  };

  return (
    <div className="email-details">
      <button onClick={onBack}>Back to Inbox</button>
      <h3>{email.subject}</h3>
      <p>From: {email.sender}</p>
      <div>{email.body}</div>
      <div className="actions">
        <button onClick={handleMarkAsRead}>Mark as Read</button>
        <button onClick={handleArchive}>Archive</button>
      </div>
    </div>
  );
};

export default EmailDetails;
