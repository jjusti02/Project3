import './App.css';
import { useState } from 'react';


function App() {

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

    // Function to handle CSV generation and download
  const handleSubmit = async () => {
    // Validate inputs
    if (!name || !number) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number }),
      });

      if (response.ok) {
        alert("Submission successful!");
        setName("");
        setNumber("");
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data.");
    }
  }
  
  // Handle CSV download
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:5000/download");
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.csv";
        link.click();
      } else {
        alert("No data available to download!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while downloading the file.");
    }
  };


  return (
      <div className='App'>
        <header>Name:</header>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <header>Phone Number:</header>
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
        <div>
          <button onClick={handleSubmit}>Add name and number</button>
        </div>
      </div>
  );
}

export default App;
