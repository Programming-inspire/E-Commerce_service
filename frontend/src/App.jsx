import React, { useEffect, useState } from 'react';

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/hello'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessage(data.message);
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        };

        fetchMessage();
    }, []);

    return (
        <div>
            <h1>Welcome to My E-Commerce App</h1>
            <p>{message}</p>
        </div>
    );
};

export default App;
