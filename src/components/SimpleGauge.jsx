import { GaugeComponent } from 'react-gauge-component'
import { useState, useEffect } from 'react'
import udpService from '../services/udpService'
import './SimpleGauge.css'

const SimpleGauge = () => {
  const [value, setValue] = useState(48)  // 初始值设为48%

  // 从UDP服务获取电量数据
  useEffect(() => {
    // 获取初始数据
    const initialData = udpService.getLastData();
    if (initialData && initialData.batteryLevel !== undefined) {
      setValue(initialData.batteryLevel);
    }

    // 添加数据更新监听器
    const handleDataUpdate = (newData) => {
      if (newData.batteryLevel !== undefined) {
        setValue(newData.batteryLevel);
      }
    };

    udpService.addDataListener(handleDataUpdate);

    // 组件卸载时移除监听器
    return () => {
      udpService.removeDataListener(handleDataUpdate);
    };
  }, []);

  return (
    <div className="gauge-container battery-gauge">
      <GaugeComponent
        type="semicircle"
        pointer={{
          type: "arrow",
          elastic: true,
          animationDelay: 0,
          width: 8,
          color: '#fff'
        }}
        arc={{
          width: 0.2,
          padding: 0,
          cornerRadius: 0,
          gradient: true,
          subArcs: [
            { limit: 20, color: '#FF4646' },    // 红色 (0-20%)
            { limit: 40, color: '#FFA500' },    // 橙色 (20-40%)
            { limit: 60, color: '#32CD32' },    // 绿色 (40-60%)
            { limit: 80, color: '#32CD32' },    // 绿色 (60-80%)
            { color: '#32CD32' }                // 绿色 (80-100%)
          ]
        }}
        labels={{
          valueLabel: {
            formatTextValue: value => Math.round(value) + '%',
            style: { 
              fontSize: '25px',
              fill: '#fff',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              fontWeight: 'bold'
            }
          },
          tickLabels: {
            type: 'outer',
            valueConfig: {
              formatTextValue: value => value + '%',
              fontSize: '20px',
              color: '#fff'
            },
            ticks: [
              { value: 0 },
              { value: 20 },
              { value: 40 },
              { value: 60 },
              { value: 80 },
              { value: 100 }
            ]
          }
        }}
        value={value}
        minValue={0}
        maxValue={100}
        style={{ width: '100%', maxWidth: '700px' }}
      />
    </div>
  )
}

export default SimpleGauge 