import { useRef } from "react";
import TypeWriter from "./components/TypeWriter";
import useScroll from "./hook/useScroll";

function App()
{
  const ref = useRef(null);

  const greeting = useScroll(ref, 0, 50);
  const signature = useScroll(ref, 50, 100);

  return(
    <>
      <div className="h-100 bg-red-500"></div>
      <div 
        ref={ref}
        className="h-[200vh]"
      >
        <div className="h-dvh sticky top-0 left-0">
            <TypeWriter text={"HELLO, THERE!"} fontSize="10rem" width={greeting}></TypeWriter>
            <TypeWriter text={"-neunet-"} fontSize="1rem" width={signature}></TypeWriter>
        </div>
      </div>
      <div className="h-100 bg-green-500"></div>
    </>
  );
}

export default App;