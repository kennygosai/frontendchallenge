/*
 * Filename: \client\src\App.js
 * Created Date: Friday, January 8th 2021
 * Author: Kenny Gosai
 */

import React from "react";
import "./App.css";
import PaginatedTable from "./components/Table/PaginatedTable";

function App() {
  return (
    <div className="App-body">
        <PaginatedTable></PaginatedTable>
    </div>
  );
}

export default App;
