/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email } from '../models/Email';

export const fetchEmails = async (): Promise<Email[]> => {
    const response = await fetch('https://659265b3bb129707198faf38.mockapi.io/api/v1/list/emails');
    const data = await response.json();
    return data.map((emailData: any) => new Email(emailData.id, emailData.subject, emailData.body, emailData.sender, emailData.recipient, emailData.timestamp));
};
