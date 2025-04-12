import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import './SettingsPage.css';

const SettingsPage = ({ onBack }) => {
  // IP设置初始值
  const [ipSettings, setIpSettings] = useState({
    ipAddress: '172.17.102.218',
    subnetMask: '255.255.252.0',
    gateway: '172.17.101.254'
  });

  // 时间设置初始值
  const [dateSettings, setDateSettings] = useState({
    year: 2025,
    month: 1,
    day: 1,
    hours: 10,
    minutes: 10,
    seconds: 10
  });

  // 处理IP设置变化
  const handleIpChange = (e) => {
    const { name, value } = e.target;
    setIpSettings({
      ...ipSettings,
      [name]: value
    });
  };

  // 处理时间设置变化
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateSettings({
      ...dateSettings,
      [name]: parseInt(value, 10)
    });
  };

  // 提交IP设置
  const submitIpSettings = () => {
    // 这里可以添加验证逻辑
    console.log('提交IP设置:', ipSettings);
    alert('IP设置已更新');
  };

  // 提交时间设置
  const submitDateSettings = () => {
    // 这里可以添加验证逻辑
    console.log('提交时间设置:', dateSettings);
    alert('时间设置已更新');
  };

  // 生成月份选项
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // 生成日期选项（简化版，没有考虑每月天数不同）
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="settings-page">
      <div className="back-button" onClick={onBack}>
        <FiArrowLeft />
        <span>返回</span>
      </div>
      
      <div className="settings-container">
        <h1 className="page-title">系统设置</h1>
        
        <div className="settings-section">
          <h2 className="section-title">IP设置</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>IP地址:</label>
              <input
                type="text"
                name="ipAddress"
                value={ipSettings.ipAddress}
                onChange={handleIpChange}
              />
            </div>
            <div className="form-group">
              <label>子网掩码:</label>
              <input
                type="text"
                name="subnetMask"
                value={ipSettings.subnetMask}
                onChange={handleIpChange}
              />
            </div>
            <div className="form-group">
              <label>网关:</label>
              <input
                type="text"
                name="gateway"
                value={ipSettings.gateway}
                onChange={handleIpChange}
              />
            </div>
            <button className="submit-btn" onClick={submitIpSettings}>确定</button>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">时间设置</h2>
          <div className="settings-form">
            <div className="date-time-form">
              <div className="form-group">
                <label>年:</label>
                <input
                  type="number"
                  name="year"
                  min="2000"
                  max="2100"
                  value={dateSettings.year}
                  onChange={handleDateChange}
                />
              </div>
              <div className="form-group">
                <label>月:</label>
                <select
                  name="month"
                  value={dateSettings.month}
                  onChange={handleDateChange}
                >
                  {monthOptions.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>日:</label>
                <select
                  name="day"
                  value={dateSettings.day}
                  onChange={handleDateChange}
                >
                  {dayOptions.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>时:</label>
                <input
                  type="number"
                  name="hours"
                  min="0"
                  max="23"
                  value={dateSettings.hours}
                  onChange={handleDateChange}
                />
              </div>
              <div className="form-group">
                <label>分:</label>
                <input
                  type="number"
                  name="minutes"
                  min="0"
                  max="59"
                  value={dateSettings.minutes}
                  onChange={handleDateChange}
                />
              </div>
              <div className="form-group">
                <label>秒:</label>
                <input
                  type="number"
                  name="seconds"
                  min="0"
                  max="59"
                  value={dateSettings.seconds}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <button className="submit-btn" onClick={submitDateSettings}>确定</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 