import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function App() {

  const [text, setText] = useState("First Text");
  const [text2, setText2] = useState("Second Text");

  return (
      <div className='App'>
        <header>Name:</header>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <header>Phone Number:</header>
        <input type="text" value={text2} onChange={(e) => setText2(e.target.value)} />
      </div>
  );
}

export default App;
