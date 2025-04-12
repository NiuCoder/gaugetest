import { useState, useEffect } from 'react'
import CustomGauge from './components/CustomGauge'
import SimpleGauge from './components/SimpleGauge'
import Header from './components/Header'
import InfoPanel from './components/InfoPanel'
import SettingsPage from './components/SettingsPage'
import ConnectionStatus from './components/ConnectionStatus'
import networkService from './services/networkService'
import './App.css'

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // 在组件挂载时启动网络监控
  useEffect(() => {
    // 启动网络监控服务
    networkService.startMonitoring();
    
    // 模拟UDP报文接收（实际应用中应替换为真实UDP接收逻辑）
    const simulationInterval = setInterval(() => {
      networkService.simulatePacket(0.7); // 70%的概率收到报文
    }, 1000);
    
    return () => {
      networkService.stopMonitoring();
      clearInterval(simulationInterval);
    };
  }, []);

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
      
      {/* 网络连接状态通知 */}
      <ConnectionStatus />
    </div>
  )
}

export default App
