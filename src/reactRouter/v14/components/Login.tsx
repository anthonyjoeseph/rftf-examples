import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({
  url
}: { url: string }) => (
  <div>
    <div>
      username:
      <input type="text"/>
    </div>
    <div>
      password: <input type="text"/>
    </div>
    <Link to={`${url}/loggedIn`}>
      <input type="button" value="submit" />
    </Link>
  </div>
);

export default Login;