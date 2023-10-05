import React, { useEffect, useState } from 'react';
import SearchComponent from './components/SearchComponent';
import MessageComponent from './components/MessageComponent';
import './App.css';

function App() {
  type Sport = {
    name: string
    htmlCode: string[]
  }

  type parsedResponse = {
    name: string
    category: string
    group: string
    htmlCode: string[]
    unicode: string[]
    message: string
  }

  type Error = {
    message: string
  }

  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('Loading sports...');

  const fetchSports = async () => {
    try {
      const response = await fetch('https://emojihub.yurace.pro/api/all/category/activities');

      if (response.ok) {
        const data: parsedResponse[] = await response.json();
        return data.map(({message, category, group, unicode, ...keepDetails}) => keepDetails);
      } else {
        const data: Error = await response.json();
        return Promise.reject(data.message)
      }
    } catch (error: any) {
      return Promise.reject(error.message)
    }
  }

  useEffect(() => {
    fetchSports()
    .then((sports) => {
      setSportsList(sports.slice(0, 25));
      setMessage('Sport search');
      setHasError(false);
    })
    .catch((errorMessage) => {
      setHasError(true);
      setMessage(errorMessage);
    });
  }, []);

  return (
    <div className="App">
      <main className="main">
        <MessageComponent message={message} hasError={hasError} />
        <SearchComponent sports={sportsList} />
      </main>
    </div>
  );
}

export default App;
