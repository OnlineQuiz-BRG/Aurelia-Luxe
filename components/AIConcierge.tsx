
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', parts: [{ text: userMsg }] }]);
    setIsTyping(true);

    const geminiHistory = chatHistory.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: h.parts
    }));

    const responseText = await getGeminiResponse(userMsg, geminiHistory);
    
    setIsTyping(false);
    setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: responseText || "My apologies, I am at a loss for words." }] }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="glass shadow-2xl rounded-2xl w-80 sm:w-96 flex flex-col h-[500px] border border-gold/30 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-charcoal text-cream rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles size={18} className="text-gold" />
              <div>
                <h3 className="text-sm font-serif tracking-widest font-bold">Jewelry Concierge</h3>
                <p className="text-[10px] text-gold/80 italic">At your service</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-cream/30">
            {chatHistory.length === 0 && (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles size={24} className="text-gold" />
                </div>
                <p className="text-xs text-charcoal/60 italic px-6">
                  "Welcome to Aurelia Luxe. May I assist you in finding the perfect piece for your collection, or perhaps explain the nuances of the 4Cs?"
                </p>
              </div>
            )}
            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  chat.role === 'user' 
                    ? 'bg-gold text-white rounded-br-none' 
                    : 'bg-white border border-gold/10 text-charcoal rounded-bl-none shadow-sm'
                }`}>
                  {chat.parts[0].text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gold/10 p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gold/10">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask our concierge..."
                className="flex-grow bg-white border border-gold/20 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button 
                onClick={handleSend}
                className="bg-charcoal text-gold p-2 rounded-full hover:bg-gold hover:text-charcoal transition-all shadow-md"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-charcoal text-gold p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center space-x-2 group border border-gold/30"
        >
          <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-serif tracking-widest uppercase pr-2">Concierge</span>
        </button>
      )}
    </div>
  );
};

export default AIConcierge;
