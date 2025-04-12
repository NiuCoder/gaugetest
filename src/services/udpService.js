import networkService from './networkService';

// UDP报文解析服务
class UDPService {
  constructor() {
    this.socket = null;
    this.isInitialized = false;
    this.remoteIp = '172.25.109.2';
    this.localPort = 10086;
    this.listeners = [];
    this.lastData = {
      frameType: 0x86,
      lifeSignal: 0,
      driveMode: 0,
      workHours: 0,
      mileage: 0,
      distanceFromMainShaft: 0,
      targetDistance: 0,
      speed: 0,       // 新增速度字段
      batteryLevel: 0 // 新增电量字段
    };
  }

  // 初始化UDP服务
  async initialize() {
    if (this.isInitialized) return;

    try {
      // 注意：在浏览器环境中，无法直接创建UDP套接字
      // 这里使用WebSocket模拟，实际环境中应该使用Node.js或其他支持UDP的后端
      console.log('初始化UDP服务，监听端口:', this.localPort);
      this.isInitialized = true;
      
      // 模拟UDP接收循环
      this.startSimulation();
    } catch (error) {
      console.error('UDP服务初始化失败:', error);
    }
  }

  // 关闭UDP服务
  close() {
    if (this.socket) {
      console.log('关闭UDP服务');
      this.socket = null;
    }
    this.isInitialized = false;
  }

  // 解析UDP报文
  parseUDPPacket(data) {
    try {
      // 检查数据长度是否合法（至少15字节，包含新增的速度和电量字段）
      if (data.length < 15) {
        console.error('UDP报文长度不足');
        return null;
      }

      // 检查帧类型是否正确
      if (data[0] !== 0x86) {
        console.error('UDP报文帧类型错误:', data[0]);
        return null;
      }

      // 解析各字段
      const frameType = data[0];
      const lifeSignal = (data[1] << 8) | data[2]; // 大端编码
      const driveMode = data[3];
      const workHours = (data[4] << 8) | data[5]; // 大端编码
      const mileage = (data[6] << 8) | data[7]; // 大端编码
      const distanceFromMainShaft = (data[8] << 8) | data[9]; // 大端编码
      const targetDistance = (data[10] << 8) | data[11]; // 大端编码
      
      // 新增：解析速度和电量
      const speedRaw = (data[12] << 8) | data[13]; // 大端编码
      const speed = speedRaw / 100; // 单位是0.01米/秒，转换为米/秒
      const batteryLevel = data[14]; // 电量百分比

      return {
        frameType,
        lifeSignal,
        driveMode,
        workHours,
        mileage,
        distanceFromMainShaft,
        targetDistance,
        speed,
        batteryLevel
      };
    } catch (error) {
      console.error('解析UDP报文失败:', error);
      return null;
    }
  }

  // 添加数据监听器
  addDataListener(listener) {
    if (typeof listener === 'function' && !this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  // 移除数据监听器
  removeDataListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  // 通知所有监听器数据更新
  notifyListeners(data) {
    this.listeners.forEach(listener => {
      listener(data);
    });
  }

  // 获取最新数据
  getLastData() {
    return { ...this.lastData };
  }

  // 解析驾驶模式为文本
  static getDriveModeText(mode) {
    switch (mode) {
      case 0: return '人工';
      case 1: return '远程';
      case 2: return '自动';
      default: return '未知';
    }
  }

  // 模拟UDP报文接收（仅用于演示）
  startSimulation() {
    let lifeSignal = 0;
    
    const simulateReceive = () => {
      // 创建模拟UDP报文（现在需要15字节）
      const buffer = new Uint8Array(15);
      
      // 第1个字节：帧类型
      buffer[0] = 0x86;
      
      // 第2-3字节：生命信号，大端编码
      buffer[1] = (lifeSignal >> 8) & 0xFF;
      buffer[2] = lifeSignal & 0xFF;
      lifeSignal = (lifeSignal + 1) % 65536; // 生命信号递增
      
      // 第4字节：驾驶模式，0-2之间随机
      buffer[3] = Math.floor(Math.random() * 3);
      
      // 第5-6字节：工作时长，模拟随机增加
      const workHours = Math.floor(100 + Math.random() * 10);
      buffer[4] = (workHours >> 8) & 0xFF;
      buffer[5] = workHours & 0xFF;
      
      // 第7-8字节：运行里程，模拟随机增加
      const mileage = Math.floor(50 + Math.random() * 5);
      buffer[6] = (mileage >> 8) & 0xFF;
      buffer[7] = mileage & 0xFF;
      
      // 第9-10字节：距主井口的距离
      const distanceFromMainShaft = Math.floor(100 + Math.random() * 10);
      buffer[8] = (distanceFromMainShaft >> 8) & 0xFF;
      buffer[9] = distanceFromMainShaft & 0xFF;
      
      // 第11-12字节：目标距离
      const targetDistance = Math.floor(30 + Math.random() * 10);
      buffer[10] = (targetDistance >> 8) & 0xFF;
      buffer[11] = targetDistance & 0xFF;
      
      // 新增：第13-14字节：速度（单位是0.01米/秒）
      // 生成一个0.5m/s到2.0m/s之间的速度
      const speedRaw = Math.floor(50 + Math.random() * 150); // 50-200之间的值，代表0.5-2.0m/s
      buffer[12] = (speedRaw >> 8) & 0xFF;
      buffer[13] = speedRaw & 0xFF;
      
      // 新增：第15字节：电量百分比
      buffer[14] = Math.floor(10 + Math.random() * 90); // 10%-100%之间的电量
      
      // 解析并处理数据
      this.handleReceivedData(buffer);
    };
    
    // 每秒模拟接收一次数据
    this.simulationInterval = setInterval(simulateReceive, 1000);
    
    // 初始调用一次
    simulateReceive();
  }
  
  // 处理接收到的数据
  handleReceivedData(data) {
    // 通知网络服务收到UDP报文
    networkService.packetReceived();
    
    // 解析UDP报文
    const parsedData = this.parseUDPPacket(data);
    
    if (parsedData) {
      // 更新最新数据
      this.lastData = parsedData;
      
      // 通知监听器数据更新
      this.notifyListeners(parsedData);
    }
  }
  
  // 停止模拟
  stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }
}

// 导出单例实例
const udpService = new UDPService();

export default udpService; 