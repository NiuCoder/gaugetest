import { useState, useEffect } from 'react';
import './InfoPanel.css';

const InfoPanel = () => {
  // 模拟 UDP 数据，实际项目中应该从 UDP 获取
  const [data, setData] = useState({
    driveMode: 0,
    workHours: 0,
    mileage: 0,
    currentLocation: '未知',
    targetDistance: 0
  });

  const getDriveMode = (mode) => {
    switch(mode) {
      case 0: return '人工';
      case 1: return '远程';
      case 2: return '自动';
      default: return '未知';
    }
  };

  const getTargetDistance = (distance, mode) => {
    return mode === 2 ? `${distance} m` : '-';
  };

  return (
    <div className="info-panel">
      <div className="info-item">
        <span className="info-label">驾驶模式</span>
        <span className="info-value">{getDriveMode(data.driveMode)}</span>
      </div>
      <div className="info-item">
        <span className="info-label">工作时长</span>
        <span className="info-value">{data.workHours} h</span>
      </div>
      <div className="info-item">
        <span className="info-label">运行里程</span>
        <span className="info-value">{data.mileage} km</span>
      </div>
      <div className="info-item">
        <span className="info-label">当前位置</span>
        <span className="info-value">{data.currentLocation}</span>
      </div>
      <div className="info-item">
        <span className="info-label">目标距离</span>
        <span className="info-value">{getTargetDistance(data.targetDistance, data.driveMode)}</span>
      </div>
    </div>
  );
};

export default InfoPanel; 