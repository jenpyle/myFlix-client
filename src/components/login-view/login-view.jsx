import React, { useState } from 'react'; //useState is a react hook

export function LoginView(props) {
  //excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');

  console.log('in login view');
  const handleSubmit = (e) => {
    console.log('===============inside handleSubmit');
    //the callback function
    e.preventDefault(); //prevents the default refresh/change of the page
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    console.log('===============inside handleRegister');
    props.onRegisterNewUser(username);
  };

  return (
    <form>
      <button type="button" onClick={handleRegister}>
        Register New User
      </button>
      <br></br>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
