import { useState, useEffect } from 'react'
import CustomGauge from './components/CustomGauge'
import SimpleGauge from './components/SimpleGauge'
import Header from './components/Header'
import InfoPanel from './components/InfoPanel'
import SettingsPage from './components/SettingsPage'
import ConnectionStatus from './components/ConnectionStatus'
import networkService from './services/networkService'
import udpService from './services/udpService'
import './App.css'

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // 在组件挂载时启动网络监控和UDP服务
  useEffect(() => {
    // 启动网络监控服务
    networkService.startMonitoring();
    
    // 初始化UDP服务（实际环境中会监听真实UDP数据）
    udpService.initialize();
    
    return () => {
      // 清理资源
      networkService.stopMonitoring();
      udpService.stopSimulation();
      udpService.close();
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
