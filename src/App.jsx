import { Navbar } from "./components/Navbar";
import Navlink from "./components/Navlink";

function App()
{
  return(
    <header>
      <Navbar gap="25px">

        <span
          className="font-jetbrains-mono font-black pointer-events-none"
          position="left"
        >
          .//NEUNET
        </span>

        <Navlink position="right" label="LINK"></Navlink>
        <Navlink position="right" label="LINK"></Navlink>
        <Navlink position="right" label="LINK"></Navlink>
      </Navbar>
    </header>
  );
}

export default App;