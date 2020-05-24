import React from 'react';

const eAddress = "boss@squirrelanalytica.com";

const FamilyError = () => (
  <div>
    We don't have any families registered yet at that route.<br/>
    If you represent that family, please email:<br/>
    <a href={`mailto:${eAddress}`}>{eAddress}</a>
  </div>
);

export default FamilyError;