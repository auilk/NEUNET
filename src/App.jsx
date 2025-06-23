import { Navbar } from "./components/Navbar";
import Navlink from "./components/Navlink";

function App()
{
  return(
    <header>
      <Navbar>
        <Navlink position="left"></Navlink>
        <Navlink position="center"></Navlink>
        <Navlink position="right"></Navlink>
      </Navbar>
    </header>
  );
}

export default App;