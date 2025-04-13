// components/UI/MessageArea.jsx
import React, { useEffect, useState } from 'react';

export default function MessageArea({ message }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (message && !messages.includes(message)) {
            setMessages(prev => [message, ...prev].slice(0, 5)); // Keep the last 5 messages
        }
    }, [message]);

    if (!message && messages.length === 0) return null;

    return (
        <div className="bg-black/50 mb-4 rounded-lg p-3 text-center border border-yellow-500">
            <p className="text-yellow-300">{message || messages[0]}</p>

        </div>
    );
}