import { useState, useEffect } from 'react';
import { FiWifi, FiWifiOff } from 'react-icons/fi';
import networkService from '../services/networkService';
import './ConnectionStatus.css';

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(networkService.isConnected());
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // 网络状态变化时显示状态提示
    const handleConnectionChange = (connected) => {
      setIsConnected(connected);
      setShowStatus(true);
      
      // 5秒后隐藏状态提示
      setTimeout(() => {
        setShowStatus(false);
      }, 5000);
    };
    
    networkService.addConnectionListener(handleConnectionChange);
    
    return () => {
      networkService.removeConnectionListener(handleConnectionChange);
    };
  }, []);

  // 如果没有状态变化需要显示，则不渲染
  if (!showStatus) return null;

  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      {isConnected ? (
        <>
          <FiWifi className="status-icon" />
          <span>网络已连接</span>
        </>
      ) : (
        <>
          <FiWifiOff className="status-icon" />
          <span>网络已断开</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus; 