import React from 'react';
import Navbar from './Navbar';

function Base(
  props: Readonly<{ children: React.ReactNode; bg: string; noNavbar?: boolean }>
) {
  return (
    <>
      {!props.noNavbar && <Navbar />}

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
