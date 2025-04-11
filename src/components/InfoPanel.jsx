import './InfoPanel.css';

const InfoPanel = () => {
  return (
    <div className="info-panel">
      <div className="info-items-container">
        <div className="info-item" id="drive-mode">
          <div className="info-label">驾驶模式</div>
          <div className="info-value">人工</div>
        </div>
        <div className="info-item" id="work-hours">
          <div className="info-label">工作时长</div>
          <div className="info-value">100h</div>
        </div>
        <div className="info-item" id="mileage">
          <div className="info-label">运行里程</div>
          <div className="info-value">50km</div>
        </div>
        <div className="info-item" id="current-location">
          <div className="info-label">当前位置</div>
          <div className="info-value">距主井口100米</div>
        </div>
        <div className="info-item" id="target-distance">
          <div className="info-label">目标距离</div>
          <div className="info-value">35m</div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel; 