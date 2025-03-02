import React, { useState } from 'react';

function Home() {
  const [hostname, setHostname] = useState('');
  const [port, setPort] = useState('');
  const [route, setRoute] = useState('');
  const [response, setResponse] = useState(null);

  const handleCallApi = async () => {
    try {
      const url = `http://${hostname}:${port}/${route}`;
      const res = await fetch(url);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  const handleConnect = async () => {
    try {
      const url = `http://${hostname}:${port}/health`; // Assuming your node.js has a /health endpoint
      const res = await fetch(url);
      if (res.ok) {
        alert('Connection successful!');
      } else {
        alert('Connection failed.');
      }
    } catch (error) {
      alert('Connection failed: ' + error.message);
    }
  };

  return (
    <div>
      <div>
        <label>Hostname:</label>
        <input type="text" value={hostname} onChange={(e) => setHostname(e.target.value)} />
      </div>
      <div>
        <label>Port:</label>
        <input type="number" value={port} onChange={(e) => setPort(e.target.value)} />
      </div>
      <div>
        <label>Route:</label>
        <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} />
      </div>
      <button onClick={handleCallApi}>Call API</button>
      <button onClick={handleConnect}>Connect</button>

      {response && (
        <div>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Home;