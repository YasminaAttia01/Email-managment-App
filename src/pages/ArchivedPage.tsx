import React from 'react';
import EmailList from '../components/EmailList';
import { Email } from '../models/Email';

interface ArchivedPageProps {
  emails: Email[];
  onMarkAsRead: (ids: string[]) => void;
  onArchive: (ids: string[]) => void;
  handleEmailSelection: (ids: string[]) => void;
  selectedEmailIds: string[];
  openEmailDetails: (emailId: string) => void;
}

const ArchivedPage: React.FC<ArchivedPageProps> = ({
  emails,
  onMarkAsRead,
  onArchive,
  handleEmailSelection,
  selectedEmailIds,
  openEmailDetails,
}) => {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = emails.map((email) => email.id);
      handleEmailSelection(allIds);
    } else {
      handleEmailSelection([]);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Archived</h2>
      </div>

      <div>
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={selectedEmailIds.length === emails.length && emails.length > 0}
          className="mr-2"
          aria-label="Select all emails"
        />
        Select All
      </div>

      <EmailList
        emails={emails}
        onMarkAsRead={onMarkAsRead}
        onArchive={onArchive}
        handleEmailSelection={handleEmailSelection}
        selectedEmailIds={selectedEmailIds}
        onDoubleClick={(email) => openEmailDetails(email.id)}
      />
    </div>
  );
};

export default ArchivedPage;
