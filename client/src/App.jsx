import './App.css';
import HomePage from './routes/HomePage';
import JournalsPage from './routes/JournalsPage';
import JournalDetail from './routes/JournalDetail';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import RegistrationPage from './routes/RegistrationPage';
import { useSession } from "./contexts/session";
import { LoginPage } from "./routes/LoginPage";
import Calls from './utils/api';
import Footer from './components/Footer';

export function App() {
  const { session, setSession } = useSession();

  const handleLogoutClick = () => {
    Calls.journalDelete("/api/auth")
      .finally(() => setSession({ data: null, status: "unauthorized" }));
  };

  return (
    <Router>
      <div id="root" className="d-flex flex-column">
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src="/journal.png" alt="Site logo" className='site-logo' />
            </Link>
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <Link to="/" className="">Home</Link>
              </li>
              <li className="nav-item ms-3">
                <Link to="/journals" className="">Journals</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {session.data ? (
                <>
                  <li className="nav-item me-2">{session.data.email}</li>
                  <li className="nav-item me-2">
                    <button className="btn btn-sm btn-secondary" onClick={handleLogoutClick}>
                      Odhlásit se
                    </button>
                  </li>
                </>
              ) : session.status === "loading" ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <li className="nav-item me-3">
                    <Link to={"/register"} className=''>Registrace</Link>
                  </li>
                  <li className="nav-item me-3">
                    <Link to={"/login"} className=''>Přihlásit se</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <main className="container flex-grow-1 mt-5 pt-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journals" element={<JournalsPage />} />
            <Route path="/journals/:journalId" element={<JournalDetail />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
