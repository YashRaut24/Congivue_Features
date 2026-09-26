import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setStatus("Backend connection failed");
      });
  }, []);

  return (
    <div>
      <h1>Knowledge Mastery Modeling</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;