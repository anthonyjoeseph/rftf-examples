import React from 'react';

const BeautyContainer = ({
  backgroundColor,
  children,
}: { backgroundColor: string, children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor,
      width: 200,
      height: 300,
    }}
  >
    {children}
  </div>
);

export default BeautyContainer;
