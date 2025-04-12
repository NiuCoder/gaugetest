import { useState } from 'react'
import CustomGauge from './components/CustomGauge'
import SimpleGauge from './components/SimpleGauge'
import Header from './components/Header'
import InfoPanel from './components/InfoPanel'
import SettingsPage from './components/SettingsPage'
import './App.css'

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="App">
      <Header onSettingsClick={toggleSettings} />
      
      {showSettings ? (
        <SettingsPage onBack={toggleSettings} />
      ) : (
        <>
          <InfoPanel />
          <div className="gauges-container">
            <div className="gauge-wrapper">
              <CustomGauge />
            </div>
            <div className="gauge-wrapper">
              <SimpleGauge />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
