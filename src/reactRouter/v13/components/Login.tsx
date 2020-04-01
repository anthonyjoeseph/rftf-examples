import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({
  appVersion
}: { appVersion: string }) => (
  <div>
    <div>
      username:
      <input type="text"/>
    </div>
    <div>
      password: <input type="text"/>
    </div>
    <Link to={`${appVersion}/loggedIn`}>
      <input type="button" value="submit" />
    </Link>
  </div>
);

export default Login;