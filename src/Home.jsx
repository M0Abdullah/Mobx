import React from 'react';
import './Home.css';
import { observer } from 'mobx-react-lite';
import userstore from './Store/Userstore';

function Home() {
  const newmarks = () => {
    userstore.setmath('90');
  };

  const getmathmarks = () => {
    userstore.getApiMarks();

  };

  return (
    <div>
      <h1>
        UserName:
        {userstore.username}
        <br />
        User ID: {userstore.userid}
        <br />
        Math Marks: {userstore.math}
        <br />
        Urdu Marks: {userstore.urdu}
      </h1>
      <p>Total Marks: {userstore.totalmarks}</p>
      <p>Percentage: {userstore.percentage}%</p>
      <button onClick={newmarks}>Update Math Marks</button>
      <button onClick={getmathmarks}>Fetch Marks from API</button>

    </div>
  );
}

export default observer(Home);
