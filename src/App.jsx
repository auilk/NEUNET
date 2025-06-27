import { use, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import Navlink from "./components/Navlink";

function App()
{
  const [reveal, setReveal] = useState(false);

  useEffect(() =>
  {
    setTimeout(() => setReveal(true), 2000);
  }, []);

  return(
    <header>
      <Navbar gap="25px" reveal={reveal} duration={200}>

        <span
          position="left"
          className="font-jetbrains-mono font-black pointer-events-none relative transition-[opacity_transform]"
          style={{
            transform: `translateX(calc(-100px * ${reveal ? 0 : 1}))`,
            opacity: reveal ? 1 : 0
          }}
        >
          .//NEUNET
        </span>

        <Navlink
          position="right" 
          label="MISSION" 
          hide={!reveal} 
          duration={300}
        ></Navlink>

        <Navlink
          position="right" 
          label="PROTOCOL" 
          hide={!reveal} 
          duration={300}
        ></Navlink>

        <Navlink
          position="right" 
          label="AGENTS" 
          hide={!reveal} 
          duration={300}
        ></Navlink>

        <Navlink
          position="right" 
          label="TRAINING" 
          hide={!reveal} 
          duration={300}
        ></Navlink>

        <Navlink
          position="right" 
          label="JOIN" 
          hide={!reveal} 
          duration={300}
        ></Navlink>
      </Navbar>
    </header>
  );
}

export default App;