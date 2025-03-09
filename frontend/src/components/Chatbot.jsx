import React, { useState, useEffect } from "react";
import { Card, Input, Button, List, Typography, Avatar, ConfigProvider, theme } from "antd";
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { getChatResponse } from "../api/chat"; // Import API function

const { Title, Text } = Typography;

const Chatbot = ({ baseMassage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to send a message
  const sendMessage = async (messageText, senderType) => {
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { type: senderType, text: messageText }]);
    
    if (senderType === "user") {
      setLoading(true);
      try {
        const response = await getChatResponse(messageText);
        setMessages((prev) => [...prev, { type: "bot", text: response.reply }]);
      } catch (error) {
        setMessages((prev) => [...prev, { type: "bot", text: "Error getting response." }]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Send baseMassage when chatbot loads (only once)
  useEffect(() => {
    if (baseMassage) {
      sendMessage(baseMassage, "user");
    }
  }, [baseMassage]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: '#FF9900', borderRadius: 6, colorBgContainer: 'rgba(30, 30, 30, 0.9)' },
        components: { Button: { colorPrimary: '#FF9900' }, Input: { colorBgContainer: 'rgba(50, 50, 50, 0.7)' } }
      }}
    >
      <Card style={{ borderColor: '#FF9900', backgroundColor: 'rgba(30, 30, 30, 0.9)', width: '600px', margin: '0 auto' }}>
        <Title level={2} style={{ color: '#FF9900', textAlign: 'center' }}>CHAT WITH SPIRITER</Title>
        <Card style={{ backgroundColor: 'rgba(20, 20, 20, 0.7)', marginBottom: 16 }}>
          <List
            dataSource={messages.length ? messages : [{ type: 'bot', text: 'Hello! I am Spiriter, your cricket team assistant. How can I help you today?' }]}
            renderItem={(message) => (
              <List.Item style={{ backgroundColor: message.type === "user" ? 'rgba(255, 153, 0, 0.1)' : 'transparent' }}>
                <div style={{ display: 'flex', justifyContent: message.type === "user" ? 'flex-end' : 'flex-start' }}>
                  {message.type !== "user" && <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#FF9900', color: '#1A1A1A' }} />}
                  <div style={{ backgroundColor: message.type === "user" ? 'rgba(50, 50, 50, 0.8)' : 'rgba(255, 153, 0, 0.2)', padding: '8px 12px', borderRadius: '8px' }}>
                    <Text style={{ color: message.type === "user" ? 'white' : '#FF9900' }}>
                      {message.type === "user" ? "You" : "Spiriter"}
                    </Text>
                    <div style={{ marginTop: '4px' }}><Text style={{ color: '#e0e0e0' }}>{message.text}</Text></div>
                  </div>
                  {message.type === "user" && <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#FF9900', color: '#1A1A1A' }} />}
                </div>
              </List.Item>
            )}
            style={{ height: "450px", overflowY: "auto", scrollBehavior: "smooth" }}
          />
        </Card>
        
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onPressEnter={() => sendMessage(input, "user")}
          disabled={loading}
          suffix={<SendOutlined onClick={() => sendMessage(input, "user")} style={{ color: '#FF9900', cursor: 'pointer' }} />}
        />
        <Button type="primary" onClick={() => sendMessage(input, "user")} icon={<SendOutlined />} loading={loading} style={{ width: "100%", marginTop: 10 }}>
          Send Message
        </Button>
      </Card>
    </ConfigProvider>
  );
};

export default Chatbot;
