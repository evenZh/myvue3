<template>
  <div class="user-page">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="avatar-container">
        <img :src="userInfo.avatar" alt="用户头像" class="avatar" @click="showAvatarOptions">
        <div class="avatar-edit-icon">
          <i class="iconfont icon-camera"></i>
        </div>
      </div>
      <div class="user-info">
        <div class="nickname-container">
          <h2>{{ userInfo.nickname }}</h2>
          <button class="edit-btn" @click="showNicknameEdit">
            <i class="iconfont icon-edit"></i>
          </button>
        </div>
        <p class="user-id">ID: {{ userInfo.userId }}</p>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-list">
      <div class="menu-group">
        <div class="menu-item" @click="navigateTo('orders')">
          <i class="iconfont icon-order"></i>
          <span>我的订单</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="menu-item" @click="navigateTo('address')">
          <i class="iconfont icon-location"></i>
          <span>收货地址</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="menu-item" @click="navigateTo('wallet')">
          <i class="iconfont icon-wallet"></i>
          <span>我的钱包</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="navigateTo('favorites')">
          <i class="iconfont icon-star"></i>
          <span>我的收藏</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="menu-item" @click="navigateTo('history')">
          <i class="iconfont icon-history"></i>
          <span>浏览历史</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="navigateTo('settings')">
          <i class="iconfont icon-settings"></i>
          <span>设置</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="menu-item" @click="navigateTo('help')">
          <i class="iconfont icon-help"></i>
          <span>帮助与反馈</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div class="logout-btn" @click="logout">
      退出登录
    </div>

    <!-- 修改昵称弹窗 -->
    <div v-if="showNicknameModal" class="modal">
      <div class="modal-content">
        <h3>修改昵称</h3>
        <input 
          type="text" 
          v-model="newNickname" 
          placeholder="请输入新昵称" 
          maxlength="20"
        >
        <div class="modal-footer">
          <button @click="cancelNicknameEdit">取消</button>
          <button @click="saveNickname" class="primary-btn">保存</button>
        </div>
      </div>
    </div>

    <!-- 修改头像弹窗 -->
    <div v-if="showAvatarModal" class="modal">
      <div class="modal-content">
        <h3>修改头像</h3>
        <div class="avatar-options">
          <div class="avatar-option">
            <label for="avatar-upload" class="upload-label">
              <i class="iconfont icon-upload"></i>
              <span>从相册选择</span>
            </label>
            <input 
              type="file" 
              id="avatar-upload" 
              accept="image/*" 
              @change="handleAvatarUpload" 
              style="display: none"
            >
          </div>
          <div class="avatar-option" @click="takePhoto">
            <i class="iconfont icon-camera"></i>
            <span>拍照</span>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="cancelAvatarEdit">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data() {
    return {
      userInfo: {
        nickname: '用户昵称',
        userId: '10086123456',
        avatar: 'https://picsum.photos/id/64/200/200', // 使用示例头像
      },
      showNicknameModal: false,
      showAvatarModal: false,
      newNickname: '',
    }
  },
  methods: {
    // 导航到其他页面
    navigateTo(route) {
      console.log(`导航到: ${route}`)
      // this.$router.push(`/user/${route}`)
    },
    
    // 昵称相关方法
    showNicknameEdit() {
      this.newNickname = this.userInfo.nickname
      this.showNicknameModal = true
    },
    cancelNicknameEdit() {
      this.showNicknameModal = false
    },
    saveNickname() {
      if (this.newNickname.trim()) {
        this.userInfo.nickname = this.newNickname.trim()
        this.$toast && this.$toast('昵称修改成功')
      } else {
        this.$toast && this.$toast('昵称不能为空')
      }
      this.showNicknameModal = false
    },
    
    // 头像相关方法
    showAvatarOptions() {
      this.showAvatarModal = true
    },
    cancelAvatarEdit() {
      this.showAvatarModal = false
    },
    handleAvatarUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // 在实际应用中，这里应该上传文件到服务器
        // 这里仅做演示，使用本地 URL
        const reader = new FileReader()
        reader.onload = (e) => {
          this.userInfo.avatar = e.target.result
          this.showAvatarModal = false
          this.$toast && this.$toast('头像修改成功')
        }
        reader.readAsDataURL(file)
      }
    },
    takePhoto() {
      // 在实际应用中，这里应该调用相机 API
      console.log('调用相机拍照')
      this.showAvatarModal = false
    },
    
    // 退出登录
    logout() {
      if (confirm('确定要退出登录吗？')) {
        console.log('用户退出登录')
        // 实际应用中应该清除登录状态并跳转到登录页
        // this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.user-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 用户信息卡片 */
.user-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  position: relative;
  margin-right: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.avatar-edit-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
}

.user-info {
  flex: 1;
}

.nickname-container {
  display: flex;
  align-items: center;
}

.nickname-container h2 {
  margin: 0;
  font-size: 20px;
  margin-right: 10px;
}

.edit-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
}

.user-id {
  color: #999;
  margin: 5px 0 0 0;
  font-size: 14px;
}

/* 菜单列表 */
.menu-list {
  margin-bottom: 20px;
}

.menu-group {
  background-color: white;
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item i {
  margin-right: 10px;
  color: #666;
  font-size: 18px;
}

.menu-item span {
  flex: 1;
  font-size: 16px;
}

.menu-item .icon-arrow-right {
  color: #ccc;
}

/* 退出登录按钮 */
.logout-btn {
  background-color: white;
  color: #ff4d4f;
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  width: 80%;
  max-width: 320px;
}

.modal-content h3 {
  margin-top: 0;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 15px 0;
  box-sizing: border-box;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.modal-footer button {
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

.modal-footer .primary-btn {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

/* 头像选择选项 */
.avatar-options {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.avatar-option {
  text-align: center;
  cursor: pointer;
  padding: 10px;
}

.avatar-option i {
  display: block;
  font-size: 24px;
  margin-bottom: 5px;
  color: #666;
}

.upload-label {
  cursor: pointer;
  display: block;
}

/* 为了模拟图标字体，你需要引入实际的图标库 */
/* 这里仅作为示例，实际项目中应该使用 iconfont 或其他图标库 */
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>