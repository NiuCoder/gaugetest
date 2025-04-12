import { GaugeComponent } from 'react-gauge-component'
import { useState, useEffect } from 'react'
import udpService from '../services/udpService'
import './CustomGauge.css'

const CustomGauge = () => {
  const [value, setValue] = useState(0.9)  // 初始值设为0.9 m/s

  // 从UDP服务获取速度数据
  useEffect(() => {
    // 获取初始数据
    const initialData = udpService.getLastData();
    if (initialData && initialData.speed !== undefined) {
      setValue(initialData.speed);
    }

    // 添加数据更新监听器
    const handleDataUpdate = (newData) => {
      if (newData.speed !== undefined) {
        setValue(newData.speed);
      }
    };

    udpService.addDataListener(handleDataUpdate);

    // 组件卸载时移除监听器
    return () => {
      udpService.removeDataListener(handleDataUpdate);
    };
  }, []);

  return (
    <div className="gauge-container speed-gauge">
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0,
          cornerRadius: 1,
          gradient: true,
          subArcs: [
            { limit: 0.5, color: '#97CE00' },  // 绿色
            { limit: 1.0, color: '#B5CE00' }, // 黄绿色
            { limit: 1.5, color: '#E1CE00' }, // 黄色
            { limit: 2.0, color: '#E19600' }, // 橙黄色
            { limit: 2.5, color: '#E16500' }, // 橙色
            { color: '#E13200' }               // 红橙色
          ]
        }}
        pointer={{
          type: "arrow",
          elastic: false,
          width: 8,
          color: '#fff'
        }}
        labels={{
          valueLabel: {
            formatTextValue: value => value.toFixed(2) + ' m/s',
            style: { 
              fontSize: '30px',
              fill: '#fff',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              fontWeight: 'bold'
            }
          },
          tickLabels: {
            type: 'outer',
            valueConfig: {
              formatTextValue: value => value.toFixed(1) + ' m/s',
              fontSize: '20px',
              color: '#fff'
            },
            ticks: [
              { value: 0 },
              { value: 0.1 },
              { value: 0.2 },
              { value: 0.3 },
              { value: 0.4 },
              { value: 0.5 },
              { value: 0.6 },
              { value: 0.7 },
              { value: 0.8 },
              { value: 0.9 },
              { value: 1.0 },
              { value: 1.5 },
              { value: 2.0 },
              { value: 2.5 },
              { value: 3.0 }
            ]
          }
        }}
        value={value}
        minValue={0}
        maxValue={3.0}
        style={{ width: '100%', maxWidth: '700px' }}
      />
    </div>
  )
}

export default CustomGauge 