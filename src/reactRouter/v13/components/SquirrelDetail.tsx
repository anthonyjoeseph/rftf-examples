import React from 'react';

const SquirrelDetail = ({
  firstName,
  favoriteColor,
}: {
  firstName: string;
  favoriteColor: string;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div>squirrel detail:</div>
    <div>squirrel first name: {firstName}</div>
    <div>squirrel favorite color: {favoriteColor}</div>
  </div>
);

export default SquirrelDetail;