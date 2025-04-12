// 网络连接监控服务
class NetworkService {
  constructor() {
    this.connected = true;
    this.missedCycles = 0;
    this.connectionListeners = [];
    this.lastPacketTime = Date.now();
    this.checkInterval = null;
    this.cycleTime = 1000; // 每秒检查一次
    this.maxMissedCycles = 8; // 8个周期未收到报文视为断开
  }

  // 启动连接监控
  startMonitoring() {
    if (this.checkInterval) return;
    
    this.checkInterval = setInterval(() => {
      this.checkConnection();
    }, this.cycleTime);
  }

  // 停止连接监控
  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  // 检查连接状态
  checkConnection() {
    const currentTime = Date.now();
    const timeSinceLastPacket = currentTime - this.lastPacketTime;
    
    // 如果超过一个周期未收到报文，增加计数
    if (timeSinceLastPacket > this.cycleTime) {
      this.missedCycles++;
      
      // 如果连续多个周期未收到报文，标记为断开
      if (this.missedCycles >= this.maxMissedCycles && this.connected) {
        this.connected = false;
        this.notifyListeners();
      }
    }
  }

  // 收到UDP报文时调用
  packetReceived() {
    this.lastPacketTime = Date.now();
    this.missedCycles = 0;
    
    // 如果之前是断开状态，更新为连接状态
    if (!this.connected) {
      this.connected = true;
      this.notifyListeners();
    }
  }

  // 模拟收到报文（仅用于演示）
  simulatePacket(probability = 0.7) {
    // 随机模拟收到报文
    if (Math.random() < probability) {
      this.packetReceived();
      return true;
    }
    return false;
  }

  // 添加连接状态监听器
  addConnectionListener(listener) {
    if (typeof listener === 'function' && !this.connectionListeners.includes(listener)) {
      this.connectionListeners.push(listener);
    }
  }

  // 移除连接状态监听器
  removeConnectionListener(listener) {
    const index = this.connectionListeners.indexOf(listener);
    if (index !== -1) {
      this.connectionListeners.splice(index, 1);
    }
  }

  // 通知所有监听器连接状态变化
  notifyListeners() {
    this.connectionListeners.forEach(listener => {
      listener(this.connected);
    });
  }

  // 获取当前连接状态
  isConnected() {
    return this.connected;
  }
}

// 导出单例实例
const networkService = new NetworkService();

export default networkService; 