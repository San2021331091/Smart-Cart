import { useState, useRef, useEffect } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import {AIService} from '../../models/api/aiApi.ts';
import {Message} from '../../models/message/Message.ts';

const useAIChat = ()=> {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);
  const askAI = new AIService();

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: trimmed,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    Keyboard.dismiss();
    setLoading(true);

    try {
      const { answer, products } = await askAI.ask(trimmed);

      const botMessage: Message = {
        id: messages.length + 2,
        text: answer,
        isUser: false,
        products,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: '⚠️ Error connecting to AI assistant.',
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return {
    messages,
    inputText,
    setInputText,
    loading,
    handleSend,
    scrollRef,
  };
}
export default useAIChat;