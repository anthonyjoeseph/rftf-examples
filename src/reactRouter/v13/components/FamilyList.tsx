import React from 'react';
import { Link } from 'react-router-dom';

const FamilyList = ({
  appVersion,
  squirrelFamilyNames,
}: {
  appVersion: string;
  squirrelFamilyNames: string[];
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div>Family list:</div>
    {squirrelFamilyNames.map((squirrelFamilyName) => (
      <Link
        key={squirrelFamilyName}
        to={`${appVersion}/loggedIn/${squirrelFamilyName}`}
      >
        {squirrelFamilyName}
      </Link>
    ))}
  </div>
);

export default FamilyList;