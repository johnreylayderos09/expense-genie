import React, { useEffect, useState } from "react";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Body from './components/Body.jsx';
import LandingPage from "./components/LandingPage.jsx";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Main Content (grows to fill available space) */}
      <div className="flex-grow">
        {isLoggedIn ? <Body /> : <LandingPage />}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
