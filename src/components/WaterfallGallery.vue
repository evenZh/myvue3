<template>
  <div class="waterfall-container">
    <div class="waterfall-column" v-for="(column, columnIndex) in columns" :key="columnIndex">
      <div 
        v-for="(item, index) in column" 
        :key="index" 
        class="waterfall-item"
        @click="handleImageClick(item)"
      >
        <div class="image-wrapper">
          <!-- 根据图片在原始数组中的索引决定是否使用懒加载 -->
          <img v-if="shouldPreload(item)" :src="item.url" :alt="item.title">
          <img v-else v-lazy="item.url" :alt="item.title">
          <!-- 自定义加载中的样式 -->
          <div class="loading-overlay" v-if="!shouldPreload(item)">
            <van-loading type="spinner" color="#1989fa" />
          </div>
        </div>
        <div class="image-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaterfallGallery',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    columnCount: {
      type: Number,
      default: 3
    },
    preloadCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      columns: []
    }
  },
  watch: {
    images: {
      handler() {
        this.distributeImages()
      },
      immediate: true
    },
    columnCount() {
      this.distributeImages()
    }
  },
  methods: {
    distributeImages() {
      // 初始化列数组
      this.columns = Array.from({ length: this.columnCount }, () => [])
      
      // 将图片分配到各列中，采用简单的轮询方式
      this.images.forEach((image, index) => {
        const columnIndex = index % this.columnCount
        // 添加原始索引，用于判断是否需要预加载
        this.columns[columnIndex].push({
          ...image,
          originalIndex: index
        })
      })
    },
    handleImageClick(image) {
      this.$emit('image-click', image)
    },
    // 判断图片是否应该预加载
    shouldPreload(image) {
      return image.originalIndex < this.preloadCount
    }
  }
}
</script>

<style scoped>
.waterfall-container {
  display: flex;
  width: 100%;
  gap: 15px;
  padding: 20px;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.waterfall-item {
  break-inside: avoid;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.waterfall-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  min-height: 150px; /* 设置最小高度，确保加载动画有足够空间显示 */
  background-color: #f5f5f5;
}

.waterfall-item img {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* 自定义加载中的样式 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
}

/* 当图片加载完成后，隐藏加载动画 */
.waterfall-item img[lazy="loaded"] + .loading-overlay {
  display: none;
}

.image-info {
  padding: 10px;
  background-color: white;
}

.image-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.image-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>