<template>
  <div class="about">
    <h1>贪吃蛇游戏</h1>
    <div class="game-container">
      <canvas ref="gameCanvas" width="400" height="400" class="game-canvas"></canvas>
      <div class="score">分数: {{ score }}</div>
      <div class="controls">
        <button @click="toggleGame" class="control-btn">{{ isRunning ? '暂停' : '开始' }}</button>
      </div>
      <div class="instructions">
        <p>使用方向键或WASD控制蛇的移动，空格键开始/暂停游戏</p>
      </div>
      
      <!-- 游戏结束动画层 -->
      <div v-if="showGameOver" class="game-over-container">
        <div class="game-over-animation">
          <div class="snake-head">
            <div class="mouth"></div>
          </div>
          <div class="game-over-text">Game Over</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      canvas: null,
      ctx: null,
      snake: [],
      food: { x: 0, y: 0 },
      direction: 'right',
      nextDirection: 'right',
      gridSize: 20,
      gameSpeed: 300, // 初始速度减慢一半（原来是150）
      gameInterval: null,
      isRunning: false,
      score: 0,
      canvasWidth: 400,
      canvasHeight: 400,
      showGameOver: false
      // 移除了speedLevels数组
    }
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas
    this.ctx = this.canvas.getContext('2d')
    this.initGame()
    
    // 添加键盘事件监听
    window.addEventListener('keydown', this.handleKeyPress)
  },
  beforeUnmount() {
    // 清除事件监听和游戏循环
    window.removeEventListener('keydown', this.handleKeyPress)
    this.stopGame()
  },
  methods: {
    initGame() {
      // 初始化蛇的位置
      this.snake = [
        { x: 5 * this.gridSize, y: 5 * this.gridSize },
        { x: 4 * this.gridSize, y: 5 * this.gridSize },
        { x: 3 * this.gridSize, y: 5 * this.gridSize }
      ]
      
      // 初始化方向
      this.direction = 'right'
      this.nextDirection = 'right'
      
      // 初始化分数
      this.score = 0
      
      // 隐藏游戏结束动画
      this.showGameOver = false
      
      // 重置游戏速度
      this.gameSpeed = 300 // 初始速度减慢一半
      
      // 生成第一个食物
      this.generateFood()
      
      // 绘制初始状态
      this.draw()
    },
    
    startGame() {
      if (!this.isRunning) {
        this.isRunning = true
        this.gameInterval = setInterval(() => {
          this.update()
          this.draw()
        }, this.gameSpeed)
      }
    },
    
    stopGame() {
      if (this.isRunning) {
        this.isRunning = false
        clearInterval(this.gameInterval)
      }
    },
    
    toggleGame() {
      if (this.isRunning) {
        this.stopGame()
      } else {
        this.startGame()
      }
    },
    
    update() {
      // 更新蛇的方向
      this.direction = this.nextDirection
      
      // 获取蛇头位置
      const head = { ...this.snake[0] }
      
      // 根据方向移动蛇头
      switch (this.direction) {
        case 'up':
          head.y -= this.gridSize
          break
        case 'down':
          head.y += this.gridSize
          break
        case 'left':
          head.x -= this.gridSize
          break
        case 'right':
          head.x += this.gridSize
          break
      }
      
      // 检查是否撞墙
      if (
        head.x < 0 || 
        head.x >= this.canvasWidth || 
        head.y < 0 || 
        head.y >= this.canvasHeight
      ) {
        this.gameOver()
        return
      }
      
      // 检查是否撞到自己
      for (let i = 0; i < this.snake.length; i++) {
        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
          this.gameOver()
          return
        }
      }
      
      // 将新头部添加到蛇身前面
      this.snake.unshift(head)
      
      // 检查是否吃到食物
      if (head.x === this.food.x && head.y === this.food.y) {
        // 增加分数
        this.score += 10
        
        // 生成新食物
        this.generateFood()
        
        // 移除了对checkSpeedIncrease的调用
      } else {
        // 如果没吃到食物，移除尾部
        this.snake.pop()
      }
    },
    
    // 移除checkSpeedIncrease方法和showSpeedUpNotification方法
    checkSpeedIncrease() {
      // 遍历速度等级配置
      for (const level of this.speedLevels) {
        if (this.score === level.score) {
          this.gameSpeed = level.speed
          // 重启游戏循环以应用新速度
          this.stopGame()
          this.startGame()
          
          // 显示速度提升提示
          this.showSpeedUpNotification()
          break
        }
      }
    },
    
    // 添加缺失的generateFood方法
    generateFood() {
      // 随机生成食物位置
      const maxX = (this.canvasWidth / this.gridSize) - 1
      const maxY = (this.canvasHeight / this.gridSize) - 1
      
      let newFood
      let foodOnSnake
      
      // 确保食物不会生成在蛇身上
      do {
        foodOnSnake = false
        newFood = {
          x: Math.floor(Math.random() * maxX) * this.gridSize,
          y: Math.floor(Math.random() * maxY) * this.gridSize
        }
        
        // 检查是否与蛇身重叠
        for (let i = 0; i < this.snake.length; i++) {
          if (newFood.x === this.snake[i].x && newFood.y === this.snake[i].y) {
            foodOnSnake = true
            break
          }
        }
      } while (foodOnSnake)
      
      this.food = newFood
    },
    
    // 添加缺失的draw方法
    draw() {
      // 清空画布
      this.ctx.fillStyle = '#f0f0f0'
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
      
      // 绘制蛇
      this.ctx.fillStyle = '#42b983'
      this.snake.forEach((segment, index) => {
        // 蛇头用不同颜色
        if (index === 0) {
          this.ctx.fillStyle = '#2c3e50'
        } else {
          this.ctx.fillStyle = '#42b983'
        }
        
        this.ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize)
        
        // 绘制边框
        this.ctx.strokeStyle = '#fff'
        this.ctx.strokeRect(segment.x, segment.y, this.gridSize, this.gridSize)
      })
      
      // 绘制食物
      this.ctx.fillStyle = '#ff6b6b'
      this.ctx.beginPath()
      this.ctx.arc(
        this.food.x + this.gridSize / 2,
        this.food.y + this.gridSize / 2,
        this.gridSize / 2,
        0,
        Math.PI * 2
      )
      this.ctx.fill()
    },
    
    // 添加缺失的handleKeyPress方法
    handleKeyPress(event) {
      // 防止按键导致页面滚动
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D', ' '].includes(event.key)) {
        event.preventDefault()
      }
      
      // 如果按下空格键
      if (event.key === ' ') {
        this.toggleGame()
        return
      }
      
      // 如果游戏结束动画正在显示，按任意键重新开始
      if (this.showGameOver) {
        this.showGameOver = false
        this.initGame()
        return
      }
      
      // 根据按键设置下一个方向
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (this.direction !== 'down') {
            this.nextDirection = 'up'
          }
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          if (this.direction !== 'up') {
            this.nextDirection = 'down'
          }
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (this.direction !== 'right') {
            this.nextDirection = 'left'
          }
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (this.direction !== 'left') {
            this.nextDirection = 'right'
          }
          break
      }
      
      // 如果游戏未开始且按了方向键，则自动开始游戏
      if (!this.isRunning && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(event.key)) {
        this.startGame()
      }
    },
    
    showSpeedUpNotification() {
      // 创建一个临时元素显示速度提升提示
      const notification = document.createElement('div')
      notification.className = 'speed-up-notification'
      notification.textContent = '速度提升！'
      document.querySelector('.game-container').appendChild(notification)
      
      // 2秒后移除提示
      setTimeout(() => {
        notification.remove()
      }, 2000)
    },
    
    gameOver() {
      this.stopGame()
      this.showGameOver = true
      
      // 3秒后自动隐藏游戏结束动画
      setTimeout(() => {
        if (this.showGameOver) {
          this.showGameOver = false
          this.initGame()
        }
      }, 3000)
    }
  }
}
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: relative;
}

.game-canvas {
  border: 2px solid #2c3e50;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.score {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: #2c3e50;
  align-self: flex-start;
  margin-left: 20px;
}

.controls {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.control-btn {
  padding: 10px 30px;
  font-size: 18px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.control-btn:hover {
  background-color: #3aa876;
}

.instructions {
  margin-top: 15px;
  text-align: center;
  color: #666;
}

/* 游戏结束动画样式 */
.game-over-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  z-index: 10;
}

.game-over-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.snake-head {
  width: 80px;
  height: 80px;
  background-color: #42b983;
  border-radius: 50%;
  position: relative;
  margin-bottom: 20px;
  animation: snakeAnimation 0.5s infinite alternate;
}

/* 蛇眼睛 */
.snake-head::before, .snake-head::after {
  content: '';
  position: absolute;
  background-color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  top: 20px;
}

.snake-head::before {
  left: 15px;
}

.snake-head::after {
  right: 15px;
  animation: blinkEyes 1s infinite;
}

/* 蛇嘴巴 - 使用新的伪元素 */
.snake-head .mouth {
  content: '';
  position: absolute;
  width: 40px;
  height: 20px;
  background-color: #ff6b6b;
  border-radius: 0 0 20px 20px;
  bottom: 10px;
  left: 20px;
  animation: mouthAnimation 0.5s infinite alternate;
}

.game-over-text {
  font-size: 36px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: textPulse 1s infinite alternate;
}

/* 速度提升通知 */
.speed-up-notification {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  animation: fadeInOut 2s;
}

@keyframes snakeAnimation {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

@keyframes blinkEyes {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes mouthAnimation {
  from { transform: scaleY(1); }
  to { transform: scaleY(0.8); }
}

@keyframes textPulse {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
