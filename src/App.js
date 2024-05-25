import "./styles.css";
import DynamicElement from "./DynamicElement";
import input from "./input.json";

const App = () => {
  return (
    <div className="App">
      {input.map((elm) => (
        <DynamicElement element={elm} />
      ))}
    </div>
  );
};

export default App;
