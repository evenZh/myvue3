<template>
  <div class="admin-panel">
    <div class="admin-sidebar">
      <div class="logo">
        <span>管理系统</span>
      </div>
      <ul class="menu">
        <li class="menu-item active">
          <i class="menu-icon">📊</i>
          <span>仪表盘</span>
        </li>
        <li class="menu-item">
          <i class="menu-icon">👥</i>
          <span>用户管理</span>
        </li>
        <li class="menu-item">
          <i class="menu-icon">📦</i>
          <span>产品管理</span>
        </li>
        <li class="menu-item">
          <i class="menu-icon">📝</i>
          <span>订单管理</span>
        </li>
        <li class="menu-item">
          <i class="menu-icon">📈</i>
          <span>数据统计</span>
        </li>
        <li class="menu-item">
          <i class="menu-icon">⚙️</i>
          <span>系统设置</span>
        </li>
      </ul>
    </div>
    <div class="admin-content">
      <div class="admin-header">
        <div class="search-bar">
          <input type="text" placeholder="搜索...">
          <button>🔍</button>
        </div>
        <div class="user-info">
          <span>管理员</span>
          <div class="avatar">👤</div>
        </div>
      </div>
      <div class="admin-main">
        <div class="page-title">
          <h2>用户管理</h2>
          <button class="primary-btn">+ 新增用户</button>
        </div>
        <div class="filter-bar">
          <div class="filter-item">
            <label>状态:</label>
            <select>
              <option>全部</option>
              <option>活跃</option>
              <option>禁用</option>
            </select>
          </div>
          <div class="filter-item">
            <label>角色:</label>
            <select>
              <option>全部</option>
              <option>管理员</option>
              <option>普通用户</option>
            </select>
          </div>
          <div class="filter-item">
            <label>注册时间:</label>
            <input type="date">
          </div>
          <button class="search-btn">查询</button>
          <button class="reset-btn">重置</button>
        </div>
        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>状态</th>
                <th>注册时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 5" :key="i">
                <td><input type="checkbox"></td>
                <td>{{ 1000 + i }}</td>
                <td>用户{{ i }}</td>
                <td>user{{ i }}@example.com</td>
                <td>{{ i % 3 === 0 ? '管理员' : '普通用户' }}</td>
                <td>
                  <span :class="i % 4 === 0 ? 'status-inactive' : 'status-active'">
                    {{ i % 4 === 0 ? '禁用' : '活跃' }}
                  </span>
                </td>
                <td>2023-{{ Math.ceil(Math.random() * 12) }}-{{ Math.ceil(Math.random() * 28) }}</td>
                <td>
                  <button class="action-btn edit">编辑</button>
                  <button class="action-btn delete">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button>&lt;</button>
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>10</button>
          <button>&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDemo'
}
</script>

<style scoped>
.admin-panel {
  display: flex;
  min-height: calc(100vh - 50px);
}

.admin-sidebar {
  width: 220px;
  background-color: #001529;
  color: white;
  padding: 0;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #002140;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #1890ff;
}

.menu-item.active {
  background-color: #1890ff;
}

.menu-icon {
  margin-right: 10px;
}

.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
}

.admin-header {
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px 0 0 4px;
  width: 200px;
}

.search-bar button {
  padding: 8px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-main {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.page-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title h2 {
  margin: 0;
}

.primary-btn {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-bar {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-item select, .filter-item input {
  padding: 6px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.search-btn, .reset-btn {
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.search-btn {
  background-color: #1890ff;
  color: white;
  border: none;
}

.reset-btn {
  background-color: white;
  color: #666;
  border: 1px solid #d9d9d9;
}

.data-table {
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

th {
  background-color: #fafafa;
  font-weight: 500;
}

.status-active {
  color: #52c41a;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.status-inactive {
  color: #ff4d4f;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.action-btn {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 12px;
}

.action-btn.edit {
  background-color: #1890ff;
  color: white;
  border: none;
}

.action-btn.delete {
  background-color: white;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination button {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}
</style>