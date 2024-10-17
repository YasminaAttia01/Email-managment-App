import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';
import { Email } from '../models/Email';
import { InboxIcon, ArchiveIcon } from '@heroicons/react/solid';

interface InboxPageProps {
    emails: Email[];
    onMarkAsRead: (ids: string[]) => void;
    onArchive: (ids: string[]) => void;
    handleEmailSelection: (ids: string[]) => void;
    selectedEmailIds: string[];
    openEmailDetails: (emailId: string) => void;
}

const InboxPage: React.FC<InboxPageProps> = ({
    emails,
    onMarkAsRead,
    onArchive,
    handleEmailSelection,
    selectedEmailIds,
    openEmailDetails,
}) => {
    const [emailList, setEmailList] = useState<Email[]>(emails);

    useEffect(() => {
        setEmailList(emails); 
    }, [emails]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const allIds = emailList.map(email => email.id);
            handleEmailSelection(allIds);
        } else {
            handleEmailSelection([]);
        }
    };

    const markEmailsAsRead = (ids: string[]) => {
        const updatedEmails = emailList.map(email => {
            if (ids.includes(email.id)) {
                email.markAsRead();
            }
            return email;
        });
        setEmailList(updatedEmails);
        onMarkAsRead(ids);
    };

    const handleArchiveEmails = (ids: string[]) => {
        onArchive(ids); 
        const updatedEmails = emailList.filter(email => !ids.includes(email.id)); 
        setEmailList(updatedEmails); 
        handleEmailSelection([]); 
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Inbox</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">
                        Selected Emails: {selectedEmailIds.length}
                    </span>
                    <button
                        className="flex items-center text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
                        onClick={() => markEmailsAsRead(selectedEmailIds)}
                        disabled={selectedEmailIds.length === 0}
                    >
                        <InboxIcon className="h-5 w-5 mr-1" />
                        Mark as Read
                    </button>
                    <button
                        className="flex items-center bg-[#D6E2FB] text-gray-800 px-4 py-2 rounded hover:bg-[#D6E2FB] transition"
                        onClick={() => handleArchiveEmails(selectedEmailIds)}
                        disabled={selectedEmailIds.length === 0}
                    >
                        <ArchiveIcon className="h-5 w-5 mr-1" />
                        Archive
                    </button>
                </div>
            </div>

            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedEmailIds.length === emailList.length && emailList.length > 0}
                    className="mr-2"
                    aria-label="Select all emails"
                />
                <span>Select All</span>
            </div>

            <div>
                {emailList.map((email, index) => (
                    <div key={email.id}>
                        <EmailList
                            emails={[email]}
                            onMarkAsRead={markEmailsAsRead}
                            onArchive={onArchive}
                            handleEmailSelection={handleEmailSelection}
                            selectedEmailIds={selectedEmailIds}
                            onDoubleClick={() => openEmailDetails(email.id)}
                        />
                        {index < emailList.length - 1 && (
                            <hr className="border-t border-gray-300 my-4" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InboxPage;
