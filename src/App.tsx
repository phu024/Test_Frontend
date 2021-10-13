
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from "./components/AppBar";
import CreatePatient from "./components/CreatePatient";


export default function App() {
  return (
    <Router>
      <div>
        <AppBar />
        <CreatePatient />
      </div>
    </Router>
  );
}
