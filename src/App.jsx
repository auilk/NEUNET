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

        <Navlink position="right" label="MISSION"></Navlink>
        <Navlink position="right" label="PROTOCOL"></Navlink>
        <Navlink position="right" label="AGENTS"></Navlink>
        <Navlink position="right" label="TRAINING"></Navlink>
        <Navlink position="right" label="JOIN"></Navlink>
      </Navbar>
    </header>
  );
}

export default App;