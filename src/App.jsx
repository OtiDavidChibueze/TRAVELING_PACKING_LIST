import { useState } from "react";
import "./App.css";
import TravelingPackingList from "./Components/Traveling_Packing_List";

const demoItems = [
  {
    id: 124,
    item: "bag",
    count: 3,
    packed: false,
  },
  {
    id: 224,
    item: "shoe",
    count: 1,
    packed: false,
  },
  {
    id: 243,
    item: "canvas",
    count: 5,
    packed: false,
  },
];

export default function App() {
  return (
    <div>
      <TravelingPackingList />
    </div>
  );
}
