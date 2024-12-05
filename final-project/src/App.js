import './App.css';
import { useState } from 'react';


function App() {

  const [name, setName] = useState("First Text");
  const [number, setNumber] = useState("Second Text");

    // Function to handle CSV generation and download
  const handleDownload = () => {
    // Validate inputs
    if (!name || !number) {
      alert("Please fill out both fields.");
      return;
    }
  
    // Prepare data for CSV
    const data = [{ name, number }];
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((obj) => Object.values(obj).join(",")).join("\n");
    const csvContent = header + "\n" + rows;
  
    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ridesSheet.csv";
    link.click();
  }

  return (
      <div className='App'>
        <header>Name:</header>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <header>Phone Number:</header>
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
        <div>
          <button onClick={handleDownload}>Submit</button>
        </div>
      </div>
  );
}

export default App;
