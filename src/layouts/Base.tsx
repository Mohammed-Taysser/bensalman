import welcomeBG from '../assets/images/background/welcome.jpeg';
import Navbar from './Navbar';

function Base(props: BaseLayoutProps) {
  return (
    <>
      {!props.noNavbar && <Navbar />}

      <div
        className='blank-page'
        style={{
          backgroundImage: `url('${props.bg ?? welcomeBG}')`,
        }}
      >
        {props.children}
      </div>
    </>
  );
}

export default Base;
