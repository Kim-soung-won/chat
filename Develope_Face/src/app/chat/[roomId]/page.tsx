'use client'

import { useState } from 'react'
import styles from './page.module.css'

// Dummy message data
const messages = [
  {
    id: 1,
    text: 'Hello there!',
    sender: 'other',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    timestamp: '10:30',
  },
  {
    id: 2,
    text: 'Hi! How are you?',
    sender: 'me',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    timestamp: '10:31',
  },
  {
    id: 3,
    text: 'I am good, thanks! And you?',
    sender: 'other',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    timestamp: '10:32',
  },
  {
    id: 4,
    text: 'Doing great! This chat UI looks nice. This is a longer message to test the max-width property of the chat bubbles.',
    sender: 'me',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    timestamp: '10:33',
  },
  {
    id: 5,
    text: 'Yes, it does. I like the design.',
    sender: 'other',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    timestamp: '10:34',
  },
  {
    id: 6,
    text: 'The speech bubbles look cool.',
    sender: 'me',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    timestamp: '10:35',
  },
  {
    id: 7,
    text: 'And the timestamps are a nice touch.',
    sender: 'other',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    timestamp: '10:36',
  },
  {
    id: 8,
    text: 'Agreed. It feels very intuitive.',
    sender: 'me',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    timestamp: '10:37',
  },
]

export default function ChatRoomPage({ params }: { params: { roomId: string } }) {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return
    // Add message sending logic here
    console.log(`Sending message: ${newMessage}`)
    setNewMessage('')
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chatContainer}>
        <header className={styles.header}>
          <h1>Chat Room #{params.roomId}</h1>
        </header>

        <main className={styles.main}>
          <div className={styles.messageList}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageRow} ${
                  message.sender === 'me' ? styles.messageRowMe : ''
                }`}
              >
                {message.sender === 'other' && (
                  <img
                    src={message.avatar}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                )}
                {message.sender === 'me' && (
                  <span className={styles.timestamp}>{message.timestamp}</span>
                )}
                <div
                  className={`${styles.messageBubble} ${
                    message.sender === 'me'
                      ? styles.myMessage
                      : styles.otherMessage
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                {message.sender === 'other' && (
                  <span className={styles.timestamp}>{message.timestamp}</span>
                )}
                {message.sender === 'me' && (
                  <img
                    src={message.avatar}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                )}
              </div>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>
          <form onSubmit={handleSendMessage} className={styles.form}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 3 3 9-3 9 19-9Z" />
                <path d="M6 12h16" />
              </svg>
            </button>
          </form>
        </footer>
      </div>
    </div>
  )
}