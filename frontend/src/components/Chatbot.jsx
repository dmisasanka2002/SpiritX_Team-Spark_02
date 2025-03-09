import React, { useState } from 'react';
import { Input, Button, List, Spin } from 'antd';
import axios from 'axios';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/chatbot', { message: userInput });
      setChatHistory([...chatHistory, { sender: 'User', message: userInput }, { sender: 'Spiriter', message: response.data.message }]);
      setUserInput('');
    } catch (error) {
      console.error('Error while fetching chatbot response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <List
        bordered
        dataSource={chatHistory}
        renderItem={item => (
          <List.Item>
            <strong>{item.sender}:</strong> {item.message}
          </List.Item>
        )}
      />
      <Input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onPressEnter={handleSend}
        placeholder="Ask Spiriter..."
      />
      <Button onClick={handleSend} loading={loading}>Send</Button>
    </div>
  );
};

export default Chatbot;
