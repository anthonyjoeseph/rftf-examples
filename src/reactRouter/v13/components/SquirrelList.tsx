import React from 'react';
import { Link } from 'react-router-dom';

const SquirrelList = ({
  appVersion,
  familyName,
  squirrelIDs,
}: {
  appVersion: string;
  familyName: string;
  squirrelIDs: number[];
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div>Squirrel list by id:</div>
    {squirrelIDs.map((squirrelID) => (
      <Link
        key={squirrelID}
        to={`${appVersion}/${familyName}/${squirrelID}`}
      >
        {squirrelID}
      </Link>
    ))}
  </div>
);

export default SquirrelList;