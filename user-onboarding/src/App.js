import React, { useState } from 'react';
import './App.css';
import SignupForm from './components/Form.js'

const[users, setUsers] = useState([]);

function App() {
  return (
    <div className="App">
      <SignupForm users={users} setUsers={setUsers}/>
      {
        users.map(user=>{
          return(
            <div className="user">
              <p>Name: {user.fullName}</p>
              <p>Name: {user.email}</p>
              <p>Name: {user.id}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
