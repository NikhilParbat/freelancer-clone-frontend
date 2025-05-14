import React from "react";
import "./App.css";
import Header from "./common/Header";
import VideoBanner from "./common/VideoBanner";
import Brands from "./common/Brands";
import Features from "./common/Features";
import Content from "./common/Content";
import Projects from "./common/Projects";
import Category from "./common/Category";
import Portfolio from "./common/Portfolio";
import JobCategory from "./common/JobCategory";
import Footer from "./common/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Signup from "./common/Signup";
import Login from "./common/Login";
import PostJob from "./admin/PostProject";
import Dashboard from "./admin/F_Dashboard";
import F_Dashboard from "./admin/F_Dashboard";
import C_Dashboard from "./admin/C_Dashboard";
import JobDetail from "./admin/JobDetailPage";
import ViewJobDetail from "./admin/ViewJobPage";
import F_Profile from "./admin/F_Profile";
import C_Profile from "./admin/C_Profile";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/post-job" element={<PostJob />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/freelancer-dashboard" element={<F_Dashboard />} />
          <Route path="/client-dashboard" element={<C_Dashboard />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/job/view/:id" element={<ViewJobDetail />} />
          <Route path="/freelancer/:id" element={<F_Profile />} />
          <Route path="/client/:id" element={<C_Profile />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
                <Footer />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <VideoBanner />
                <Brands />
                <Features />
                <Content />
                <Projects />
                <Category />
                <Portfolio />
                <JobCategory />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
