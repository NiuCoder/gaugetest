import { useState, useEffect } from 'react';
import { FiWifi, FiSettings, FiWifiOff } from 'react-icons/fi';  // 添加WiFi断开图标
import networkService from '../services/networkService';
import './Header.css';

const Header = ({ onSettingsClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(networkService.isConnected());

  // 监听网络状态和时间更新
  useEffect(() => {
    // 设置网络状态监听器
    const handleConnectionChange = (connected) => {
      setIsConnected(connected);
    };
    
    // 启动网络监控
    networkService.addConnectionListener(handleConnectionChange);
    networkService.startMonitoring();
    
    // 在开发环境中模拟UDP报文
    // 在实际应用中，应当在收到真实UDP报文时调用networkService.packetReceived()
    const simulationInterval = setInterval(() => {
      networkService.simulatePacket(0.7); // 70%概率收到报文
    }, 1000);
    
    // 时钟更新定时器
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 清理函数
    return () => {
      networkService.removeConnectionListener(handleConnectionChange);
      networkService.stopMonitoring();
      clearInterval(simulationInterval);
      clearInterval(clockTimer);
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
  };

  return (
    <div className="header">
      <div className="time">{formatDate(currentTime)}</div>
      <div className="icons">
        {isConnected ? (
          <FiWifi className="icon" title="网络已连接" />
        ) : (
          <FiWifiOff className="icon wifi-disconnected" title="网络已断开" />
        )}
        <FiSettings className="icon" onClick={onSettingsClick} />
      </div>
    </div>
  );
};

export default Header; 