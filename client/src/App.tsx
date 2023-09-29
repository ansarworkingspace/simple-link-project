import React from "react";
import "./App.css";
import MainRoutes from "./Routes";
import AppBar from "./Components/AppBar/AppBar";

function App() {
  return (

<div className="app">

{/* header */}
<AppBar/>
{/* innerpage */}
<MainRoutes />

</div>

  );
}

export default App;
