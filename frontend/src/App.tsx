import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Button, TextField, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const fetchedMessages = await backend.getMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  const handleAddMessage = async () => {
    if (newMessage.trim()) {
      setLoading(true);
      try {
        await backend.addMessage(newMessage);
        setNewMessage('');
        await fetchMessages();
      } catch (error) {
        console.error('Error adding message:', error);
      }
      setLoading(false);
    }
  };

  const handleClearMessages = async () => {
    setLoading(true);
    try {
      await backend.clearMessages();
      await fetchMessages();
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Simple Message Board</h1>
      <div className="mb-4 flex">
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a message"
          variant="outlined"
          fullWidth
          className="mr-2"
        />
        <Button
          onClick={handleAddMessage}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Add
        </Button>
      </div>
      <Button
        onClick={handleClearMessages}
        variant="outlined"
        color="secondary"
        className="mb-4"
        disabled={loading}
      >
        Clear All
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default App;