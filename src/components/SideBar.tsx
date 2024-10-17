 
import React, { useState } from 'react';
import { InboxIcon, ArchiveIcon } from '@heroicons/react/solid';

interface EmailSidebarProps {
    inboxCount: number;
    archiveCount: number;
    onSelectInbox: () => void;
    onSelectArchive: () => void;
}

const EmailSidebar: React.FC<EmailSidebarProps> = ({
    inboxCount,
    archiveCount,
    onSelectInbox,
    onSelectArchive,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>

            <button
                className="lg:hidden p-4 text-gray-600"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? 'Close' : 'Open'}
            </button>
            <div
                className={`fixed inset-y-0 left-0 bg-[#D6E2FB] border-r border-gray-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
                style={{
                    width: '260px',
                    padding: '20px 0',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '10px',
                }}
            >
                <div className="flex flex-col h-full px-6">
                    <h2 className="text-lg font-bold mb-6 text-black">Email Manager</h2>
                    <ul className="space-y-4"> 
                        <li>
                            <button
                                className="flex items-center justify-between w-full text-left px-4 py-2 text-black rounded-3xl transition relative hover:bg-[#D6E2FB]"
                                onClick={onSelectInbox}
                            >
                                <div className="flex items-center">
                                    <InboxIcon className="h-5 w-5 text-black mr-2" />
                                    Inbox
                                </div>
                                <span className="text-gray-800">{inboxCount}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center justify-between w-full text-left px-4 py-2 text-black rounded-3xl transition relative hover:bg-[#D6E2FB]"
                                onClick={onSelectArchive}
                            >
                                <div className="flex items-center">
                                    <ArchiveIcon className="h-5 w-5 text-black mr-2" />
                                    Archive
                                </div>
                                <span className="text-gray-800">{archiveCount}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EmailSidebar;
