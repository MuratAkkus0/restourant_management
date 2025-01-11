import { PropagateLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000037] z-10 flex justify-center items-center">
      <PropagateLoader color="rgb(220 38 38)" />
    </div>
  );
}

export default Loading;
