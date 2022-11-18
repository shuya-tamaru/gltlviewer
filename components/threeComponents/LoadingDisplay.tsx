import { Loader } from '@react-three/drei';

const containerStyles = {
  background: '#283b4f',
  width: '100%',
};
const barStyles = {
  transformOrigin: 'center',
};

const innerStyles = {
  width: '100%',
};

const dataStyles = {
  fontSize: '1.5rem',
};

function LoadingDisplay() {
  return (
    <>
      <Loader
        containerStyles={containerStyles}
        innerStyles={innerStyles}
        barStyles={barStyles}
        dataStyles={dataStyles}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </>
  );
}

export default LoadingDisplay;
