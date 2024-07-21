import React from "react";
import "./App.css";
import OffcanvasExample from "./components/Navbar/OffcanvasExample";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormExample from "./components/FormExemple/FormExemple.jsx";
import Article from "./components/ArticleComponent/Article.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Company from "./components/Companies/Company.jsx";
import FormAddServiceCase from "./components/AddServiceCase/FormAddServiceCase.jsx";
import CompanyList from "./components/CompaniesList/CompanyList.jsx";

function App() {
  return (
    <Router>
      <div>
        <OffcanvasExample />
       
        <Routes>
          <Route path="/" element={<FormExample />} />
          <Route path="/article" element={<Article />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/addService" element={<FormAddServiceCase />} />

          <Route path="/Companylist" element={<CompanyList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
