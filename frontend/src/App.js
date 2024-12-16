// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {/* Add table headers based on your Excel structure */}
            <th>Column1</th>
            <th>Column2</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Column1}</td>
              <td>{row.Column2}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
