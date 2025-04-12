import { useState, useEffect } from 'react';
import udpService from '../services/udpService';
import './InfoPanel.css';

const InfoPanel = () => {
  const [data, setData] = useState({
    driveMode: 0,
    workHours: 0,
    mileage: 0,
    distanceFromMainShaft: 0,
    targetDistance: 0
  });

  useEffect(() => {
    // 从UDP服务获取初始数据
    const initialData = udpService.getLastData();
    if (initialData) {
      setData({
        driveMode: initialData.driveMode,
        workHours: initialData.workHours,
        mileage: initialData.mileage,
        distanceFromMainShaft: initialData.distanceFromMainShaft,
        targetDistance: initialData.targetDistance
      });
    }

    // 添加数据更新监听器
    const handleDataUpdate = (newData) => {
      setData({
        driveMode: newData.driveMode,
        workHours: newData.workHours,
        mileage: newData.mileage,
        distanceFromMainShaft: newData.distanceFromMainShaft,
        targetDistance: newData.targetDistance
      });
    };

    udpService.addDataListener(handleDataUpdate);

    // 确保UDP服务已初始化
    udpService.initialize();

    // 组件卸载时移除监听器
    return () => {
      udpService.removeDataListener(handleDataUpdate);
    };
  }, []);

  // 获取驾驶模式文本描述
  const getDriveMode = (mode) => {
    return udpService.constructor.getDriveModeText(mode);
  };

  return (
    <div className="info-panel">
      <div className="info-items-container">
        <div className="info-item" id="drive-mode">
          <div className="info-label">驾驶模式</div>
          <div className="info-value">{getDriveMode(data.driveMode)}</div>
        </div>
        <div className="info-item" id="work-hours">
          <div className="info-label">工作时长</div>
          <div className="info-value">{data.workHours}h</div>
        </div>
        <div className="info-item" id="mileage">
          <div className="info-label">运行里程</div>
          <div className="info-value">{data.mileage}km</div>
        </div>
        <div className="info-item" id="current-location">
          <div className="info-label">当前位置</div>
          <div className="info-value">距主井口{data.distanceFromMainShaft}米</div>
        </div>
        <div className="info-item" id="target-distance">
          <div className="info-label">目标距离</div>
          <div className="info-value">{data.targetDistance}m</div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel; 