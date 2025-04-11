import CustomGauge from './components/CustomGauge'
import SimpleGauge from './components/SimpleGauge'
import Header from './components/Header'
import InfoPanel from './components/InfoPanel'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <InfoPanel />
      <div className="gauges-container">
        <div className="gauge-wrapper">
          <CustomGauge />
        </div>
        <div className="gauge-wrapper">
          <SimpleGauge />
        </div>
      </div>
    </div>
  )
}

export default App
