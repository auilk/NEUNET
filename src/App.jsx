import TypeWriter from "./components/TypeWriter";

function App()
{
  return(
    <div className="w-dvw h-dvh flex flex-col justify-center items-center">
      <TypeWriter text={"HELLO, THERE"} fontSize="10rem" width={100}></TypeWriter>
    </div>
  );
}

export default App;