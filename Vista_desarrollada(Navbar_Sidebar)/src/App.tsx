import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

export default function App() {
  const [seccion, setSeccion] = useState<string>("Inicio");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        backgroundColor: "black",
        color: "yellow",
      }}
    >
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar setSeccion={setSeccion} />
        <Content seccion={seccion} />
      </div>
    </div>
  );
}
