import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './navigation.js';
import Totalstats from './Home.js';
import './App.css';
import iconLogo from './assets/mylogo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solarFlares: [], // Store solar flare data
      solarParticles: [], // Store solar particle data
      isLoading: true, // Loading state
    };
  }

  componentDidMount() {
    // Fetch solar flare data from the NASA API
    fetch('https://api.nasa.gov/DONKI/FLR?startDate=2024-02-01&endDate=2024-03-01&api_key=MWW5tddeORnLlIE9KVNucSorRdAYtwYayolRlmI7')
      .then(response => response.json())
      .then(data => this.setState({ solarFlares: data, isLoading: false })) // Update loading state when data is fetched
      .catch(error => {
        console.error('Error fetching solar flare data:', error);
        this.setState({ isLoading: false }); // Update loading state in case of an error
      });

    // Fetch solar particle data from the NASA API
    fetch('https://api.nasa.gov/DONKI/SEP?startDate=2024-02-01&endDate=2024-03-01&api_key=MWW5tddeORnLlIE9KVNucSorRdAYtwYayolRlmI7')
      .then(response => response.json())
      .then(data => this.setState({ solarParticles: data })) // Update loading state when data is fetched
      .catch(error => {
        console.error('Error fetching solar particle data:', error);
        this.setState({ isLoading: false }); // Update loading state in case of an error
      });
  }

  render() {
    const { solarFlares, solarParticles, isLoading } = this.state;
    const imageUrl = 'https://cdn.mos.cms.futurecdn.net/GY9JBbrzsGsz2psUv6pgdV.jpg';

    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ); // Loading spinner
    }

    return (
      <Router>
        <div className='App'>
          <NavBar />
          <div
            className="background"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          >
            <div className="content">
              <Routes>
                <Route path="/stats" element={<Totalstats />} />
              </Routes>
            </div>
            <div className='MainContainer'>
              <div className='Container4'>
                <div className='Row'>
                  <img src={iconLogo} alt="Icon" className="icon" style={{ width: '65px', height: '60px', marginTop: 30, marginLeft: 60 }} />
                  <h1 style={{ marginLeft: 40, marginTop: 35 }}>Live Space Data Project</h1>
                </div>
                {/* Display solar flare data */}
                <div className='Row'>
                  <h1 style={{ marginLeft: 40 }}>Solar Flare</h1>
                  <div className='Grid'>
                    {solarFlares.map(flare => (
                      <div key={flare.flrID} className='mini-container'>
                        <h3>{flare.classType}</h3>
                        <p><strong>Begin Time:</strong> {flare.beginTime}</p>
                        <p><strong>Peak Time:</strong> {flare.peakTime}</p>
                        <p><strong>Source Location:</strong> {flare.sourceLocation}</p>
                        <p><a href={flare.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'black' }}>More Info</a></p>
                      </div>
                    ))}
                  </div>
                  <h1 style={{ marginLeft: 40 }}>Solar Energetic Particle</h1>
                  <div className='Grid'>
                    {solarParticles.map(particle => (
                      <div key={particle.sepID} className='mini-container'>
                        <h3>{particle.instruments[0].displayName}</h3>
                        <p><strong>Event Time:</strong> {particle.eventTime}</p>
                        <p><a href={particle.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'black' }}>More Info</a></p>
                      </div>
                    ))}
                    {/* Render empty containers for the difference */}
                    {solarFlares.length > solarParticles.length &&
                      Array(solarFlares.length - solarParticles.length).fill().map((_, index) => (
                        <div key={index} className='mini-container empty'>
                          <h3>&nbsp;</h3>
                          <p><strong>Event Time:</strong> </p>
                          <p><a href="#" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'black' }}>&nbsp;</a></p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
