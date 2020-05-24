import React from 'react';
import { Link } from 'react-router-dom';

const SquirrelList = ({
  url,
  squirrelIDs,
}: {
  url: string;
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
        to={`${url}/${squirrelID}`}
      >
        {squirrelID}
      </Link>
    ))}
  </div>
);

export default SquirrelList;