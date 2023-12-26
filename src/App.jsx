import "./App.css";
import Home from "./Home";
import ReducerProvider from "./context/Context";

function App() {
  return (
    <ReducerProvider>
      <div className="appContainer">
        <Home />
      </div>
    </ReducerProvider>
  );
}

export default App;
