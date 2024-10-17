import React from 'react';
import { Email } from '../models/Email';
import { InboxIcon, ArchiveIcon } from '@heroicons/react/solid';

interface EmailModalProps {
  isOpen: boolean;
  emails: Email[] | null;
  onRequestClose: () => void;
  onMarkAsRead: (id: string[]) => void;
  onArchive: (id: string[]) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  emails,
  onRequestClose,
  onMarkAsRead,
  onArchive,
}) => {
 
  if (!isOpen || !emails || emails.length === 0) return null;

 
  const emailIds = emails.map(email => email.id);

  const handleArchive = () => {
    onArchive(emailIds);
    onRequestClose();
  };

  const handleMarkAsRead = () => {
    onMarkAsRead(emailIds); 
    onRequestClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onRequestClose}
    >
      <div
        className="bg-white w-full h-3/4 max-w-lg rounded-lg shadow-lg p-6 relative overflow-hidden sm:w-11/12 md:w-3/4 lg:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onRequestClose}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
        >
          <div className="h-6 w-6 font-semibold">X</div>
        </button>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {emails.length > 1 ? `${emails.length} Emails Selected` : emails[0].subject}
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={handleMarkAsRead}
              className="flex items-center text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              <InboxIcon className="h-5 w-5 mr-1" />
              Mark as Read
            </button>
            <button
              onClick={handleArchive}
              className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-[#D6E2FB] transition"
            >
              <ArchiveIcon className="h-5 w-5 mr-1" />
              Archive
            </button>
          </div>
        </div>

        
        <div className="flex flex-col justify-center items-center mb-4 overflow-y-auto max-h-[calc(100%-100px)]">
          {emails.map((email, index) => (
            <div key={email.id} className="mb-4 w-full text-center"> 
              <div className="flex justify-between text-gray-500 text-sm mb-1">
                <span>From: {email.sender}</span>
                <span>To: {email.recipient}</span>
              </div>
              <p className="text-gray-700 mt-2">{email.body}</p> 

              
              {index < emails.length - 1 && (  
                <hr className="border-t border-gray-700 my-4" /> 
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
