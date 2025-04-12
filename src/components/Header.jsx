import { useState, useEffect } from 'react';
import { FiWifi, FiSettings } from 'react-icons/fi';  // 使用 react-icons 提供的图标
import './Header.css';

const Header = ({ onSettingsClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
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
        <FiWifi className="icon" />
        <FiSettings className="icon" onClick={onSettingsClick} />
      </div>
    </div>
  );
};

export default Header; 