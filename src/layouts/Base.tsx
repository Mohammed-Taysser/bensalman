import Navbar from './Navbar';

function Base(props: Readonly<BaseLayoutProps>) {
  return (
    <>
      {!props.noNavbar && <Navbar />}

      <div className='blank-page'>{props.children}</div>
    </>
  );
}

export default Base;
