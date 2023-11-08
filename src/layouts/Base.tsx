import React from 'react';
import Navbar from './Navbar';

function Base(props: { children: React.ReactNode; bg: string }) {
  return (
    <>
      <Navbar />

      <div
        className='blank-page'
        style={{
          backgroundImage: `url('${props.bg}')`,
        }}
      >
        {props.children}
      </div>
    </>
  );
}

export default Base;
