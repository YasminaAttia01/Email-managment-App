/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { fetchEmails } from './services/emailService';
import InboxPage from './pages/InboxPage';
import ArchivedPage from './pages/ArchivedPage';
import EmailSidebar from './components/SideBar';
import { Email } from './models/Email';
import EmailModal from './components/EmailModal';

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);

  useEffect(() => {
    fetchEmails()
      .then((fetchedEmails) => {
        const initializedEmails: Email[] = fetchedEmails.map(
          (email) =>
            new Email(
              email.id,
              email.subject,
              email.body,
              email.sender,
              email.recipient,
              email.timestamp,
              email.isRead || false,
              email.isArchived || false
            )
        );
        setEmails(initializedEmails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMarkAsRead = (ids: string[]) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) => {
        if (ids.includes(email.id)) {
          email.markAsRead();
        }
        return email;
      })
    );
    setSelectedEmailIds([]);
  };

  const handleArchive = (ids: string[]) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) => {
        if (ids.includes(email.id)) {
          email.archive();
        }
        return email;
      })
    );
    setSelectedEmailIds([]);
  };

  const handleOpenEmailDetails = (emailId: string) => {
    const email = emails.find((email) => email.id === emailId);
    if (email) {
      setSelectedEmail(email);
      if (!email.isRead) {
        handleMarkAsRead([emailId]);
      }
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmail(null);
  };

  const inboxEmails = emails.filter((email) => !email.isArchived);
  const archiveEmails = emails.filter((email) => email.isArchived);

  return (
    <div className="flex h-screen">
      <EmailSidebar
        inboxCount={inboxEmails.length}
        archiveCount={archiveEmails.length}
        onSelectInbox={() => setShowArchived(false)}
        onSelectArchive={() => setShowArchived(true)}
      />

      <div className="flex-grow p-6 ml-64">
        {showArchived ? (
          <ArchivedPage
            emails={archiveEmails}
            onMarkAsRead={handleMarkAsRead}
            onArchive={handleArchive}
            handleEmailSelection={setSelectedEmailIds}
            selectedEmailIds={selectedEmailIds}
            openEmailDetails={handleOpenEmailDetails}
          />
        ) : (
          <InboxPage
            emails={inboxEmails}
            onMarkAsRead={handleMarkAsRead}
            onArchive={handleArchive}
            handleEmailSelection={setSelectedEmailIds}
            selectedEmailIds={selectedEmailIds}
            openEmailDetails={handleOpenEmailDetails}
          />
        )}

        <EmailModal
          isOpen={isModalOpen}
          emails={emails.filter(email => selectedEmailIds.includes(email.id))}
          onRequestClose={closeModal}
          onMarkAsRead={handleMarkAsRead}
          onArchive={handleArchive}
        />
      </div>
    </div>
  );
};

export default App;
