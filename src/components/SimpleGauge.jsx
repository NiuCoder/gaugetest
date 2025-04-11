import { GaugeComponent } from 'react-gauge-component'
import { useState, useEffect } from 'react'
import './SimpleGauge.css'

const SimpleGauge = () => {
  const [value, setValue] = useState(48)  // 初始值设为48%

  // 模拟百分比变化
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        const newValue = prev + (Math.random() * 10 - 5) // 随机增减值
        return Math.min(Math.max(newValue, 0), 100) // 确保值在 0-100 之间
      })
    }, 2000) // 每2秒更新一次

    return () => clearInterval(interval)
  }, [])

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