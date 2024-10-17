export class Email {
  id: string;
  subject: string;
  body: string;
  sender: string;
  recipient: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;

  constructor(
    id: string,
    subject: string,
    body: string,
    sender: string,
    recipient: string,
    timestamp: string,
    isRead: boolean = false,
    isArchived: boolean = false
  ) {
    this.id = id;
    this.subject = subject;
    this.body = body;
    this.sender = sender;
    this.recipient = recipient;
    this.timestamp = timestamp;
    this.isRead = isRead;
    this.isArchived = isArchived;
  }

  markAsRead(): void {
    this.isRead = true;
  }

  markAsUnread(): void {
    this.isRead = false;
  }

  archive(): void {
    this.isArchived = true;
  }
  unarchive(): void {
    this.isArchived = false;
  }
}
