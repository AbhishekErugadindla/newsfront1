import React from 'react';
import Hero from '../components/Hero';
import FetchData from '../components/FetchData';
import '../styles/Home.css'; // Import your CSS file

const Home = () => {
  return (
    <div className="home-background">
      <Hero />
      <FetchData />
    </div>
  );
};

export default Home;
