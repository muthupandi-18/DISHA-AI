import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

// Helper to sanitize any raw LaTeX expressions into readable text
const cleanMarkdownText = (text: string) => {
  if (!text) return '';
  return text
    .replace(/\\\([^\)]+\\\)/g, (match) => match.replace(/\\/g, ''))
    .replace(/\$\$(.*?)\$\$/gs, (_, formula) => {
      const cleanFormula = formula
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
        .replace(/\\left\(|\\right\)/g, '')
        .replace(/\\/g, '')
        .trim();
      return `\n> **Formula:** \`${cleanFormula}\`\n`;
    })
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');
};

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Vanakkam! I am DISHA AI, your Tamil Nadu College & Career Assistant. Ask me about TNEA cutoffs, Engineering, NEET, Agriculture, or Arts colleges!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply || "I am here to assist with your TNEA cutoffs and college choices.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error("Chat response failed");
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "For TNEA Engineering, Cutoff = Mathematics + (Physics / 2) + (Chemistry / 2). For Agriculture, Cutoff = (Biology / 2) + (Mathematics / 2) + (Physics / 2) + (Chemistry / 2). You can enter your subject marks in the DISHA AI Form for an accurate list of matched colleges!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="ai-chat-floating-btn"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-2xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-cyan-200" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
        </div>
        <span className="hidden sm:inline">Ask DISHA AI</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
      </button>

      {/* Floating Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[530px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-950 dark:to-blue-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  DISHA AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">12th TN College & Counseling Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              id="close-chat-box-btn"
              className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-200/80 dark:bg-slate-800/80 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-bl-none shadow-sm dark:shadow-none'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div className="space-y-1.5 text-xs leading-relaxed [&>h3]:font-bold [&>h3]:text-cyan-600 dark:[&>h3]:text-cyan-400 [&>h3]:text-xs [&>h3]:mt-1.5 [&>h3]:mb-1 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:space-y-1 [&>p]:mb-1 [&>code]:bg-slate-200 dark:[&>code]:bg-slate-700/80 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-[11px] [&>blockquote]:border-l-2 [&>blockquote]:border-cyan-500 [&>blockquote]:pl-2 [&>blockquote]:italic [&>hr]:my-2 [&>hr]:border-slate-300 dark:[&>hr]:border-slate-700">
                      <ReactMarkdown>{cleanMarkdownText(msg.text)}</ReactMarkdown>
                    </div>
                  )}
                  <span className="block text-[9px] text-slate-400 text-right mt-1 opacity-70">
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-xs text-slate-500 dark:text-slate-400 italic">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-spin" />
                <span>DISHA AI is analyzing TN cutoff data...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => { setInput("How is Engineering cutoff calculated in TNEA?"); }}
              className="px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 whitespace-nowrap cursor-pointer"
            >
              TNEA Formula
            </button>
            <button
              onClick={() => { setInput("Which is best: CSE or AI & DS?"); }}
              className="px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 whitespace-nowrap cursor-pointer"
            >
              CSE vs AI & DS
            </button>
            <button
              onClick={() => { setInput("Top engineering colleges in Chennai and Coimbatore?"); }}
              className="px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 whitespace-nowrap cursor-pointer"
            >
              Top Colleges
            </button>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-2.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about TNEA cutoffs, colleges, courses..."
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              id="send-chat-msg-btn"
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
