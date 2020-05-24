import React from 'react';
import { Link } from 'react-router-dom';

const FamilyList = ({
  url,
  squirrelFamilyNames,
}: {
  url: string;
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
        to={`${url}/${squirrelFamilyName}`}
      >
        {squirrelFamilyName}
      </Link>
    ))}
  </div>
);

export default FamilyList;