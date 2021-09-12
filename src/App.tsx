
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from "./components/AppBar";
import CreateData from "./components/Patient_reg";


export default function App() {
  return (
    <Router>
      <div>
        <AppBar />
        <CreateData />
      </div>
    </Router>
  );
}
