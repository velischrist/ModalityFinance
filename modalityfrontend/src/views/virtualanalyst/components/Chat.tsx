import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState<string>('')

  // Function to load initial messages (placeholder function)
  const loadMessages = async () => {
    try {
      // Here you can load initial messages if needed
      // For now, we'll start with an empty array
      setMessages([]);
    } catch (error) {
      console.error('Error loading messages:', error);
    }

  // Function to send a new message
  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user'
      };

      setMessages([...messages, newMessage]);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/respond/', { message: inputMessage });
        const responseText = response.data.response;
        const responseMessage: Message = {
          id: messages.length + 2,
          text: responseText,
          sender: 'ai'
        };

        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }

    useEffect(() => {
        loadMessages()
    }, [])

  return (
    <div className="chat-container" style={{ width: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div className="messages" style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`} style={{ textAlign: message.sender === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container" style={{ display: 'flex' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', marginLeft: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent
