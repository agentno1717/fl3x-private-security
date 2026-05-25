import { useMemo, useState } from 'react';
import { chatMessages } from '../data';
import { Message } from '../types';

export default function Chat() {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>(chatMessages);

  const unreadCount = useMemo(
    () => messages.filter((message) => message.sender === 'contact').length,
    [messages]
  );

  const sendMessage = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setMessages([
      ...messages,
      {
        id: `msg-${Date.now()}`,
        sender: 'you',
        text: trimmed,
        time: 'Now'
      }
    ]);
    setDraft('');
  };

  return (
    <div className="chat-pane glass-card">
      <div className="section-title">
        <div>
          <p className="eyebrow">Chat</p>
          <h2>Secure team conversations</h2>
        </div>
        <div className="pill-badge">{unreadCount} unread</div>
      </div>

      <div className="chat-window">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <p>{message.text}</p>
            <div className="meta">{message.time}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message to your team..."
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}
