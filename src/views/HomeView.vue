<template>
  <div class="home">
    <h1>图片瀑布流展示</h1>
    <div class="controls">
      <label>
        列数:
        <select v-model="columnCount">
          <option :value="2">2列</option>
          <option :value="3">3列</option>
          <option :value="4">4列</option>
          <option :value="5">5列</option>
        </select>
      </label>
    </div>
    <WaterfallGallery 
      :images="images" 
      :columnCount="columnCount"
      :preloadCount="4"
      @image-click="showImageDetails"
    />
    
    <!-- 图片详情弹窗 -->
    <div v-if="selectedImage" class="image-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <img :src="selectedImage.url" :alt="selectedImage.title">
        <h2>{{ selectedImage.title }}</h2>
        <p>{{ selectedImage.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import WaterfallGallery from '@/components/WaterfallGallery.vue'

export default {
  name: 'HomeView',
  components: {
    WaterfallGallery
  },
  data() {
    return {
      // 从localStorage获取列数，如果没有则默认为3
      columnCount: parseInt(localStorage.getItem('columnCount')) || 3,
      selectedImage: null,
      images: [
        {
          id: 1,
          url: 'https://picsum.photos/id/10/800/600',
          title: '自然风景',
          description: '美丽的山川河流'
        },
        {
          id: 2,
          url: 'https://picsum.photos/id/11/800/1000',
          title: '城市景观',
          description: '繁华的都市夜景'
        },
        {
          id: 3,
          url: 'https://picsum.photos/id/12/800/500',
          title: '海滩日落',
          description: '宁静的海边黄昏'
        },
        {
          id: 4,
          url: 'https://picsum.photos/id/13/800/800',
          title: '森林小径',
          description: '幽静的林间小路'
        },
        {
          id: 5,
          url: 'https://picsum.photos/id/14/800/600',
          title: '雪山风光',
          description: '壮丽的雪山景色'
        },
        {
          id: 6,
          url: 'https://picsum.photos/id/15/800/900',
          title: '花卉特写',
          description: '绚丽多彩的花朵'
        },
        {
          id: 7,
          url: 'https://picsum.photos/id/16/800/700',
          title: '建筑艺术',
          description: '精美的建筑设计'
        },
        {
          id: 8,
          url: 'https://picsum.photos/id/17/800/600',
          title: '动物世界',
          description: '可爱的野生动物'
        },
        {
          id: 9,
          url: 'https://picsum.photos/id/18/800/1100',
          title: '美食佳肴',
          description: '诱人的美食展示'
        },
        {
          id: 10,
          url: 'https://picsum.photos/id/19/800/500',
          title: '科技产品',
          description: '现代科技设备'
        },
        {
          id: 11,
          url: 'https://picsum.photos/id/20/800/800',
          title: '运动瞬间',
          description: '激烈的体育比赛'
        },
        {
          id: 12,
          url: 'https://picsum.photos/id/21/800/600',
          title: '艺术创作',
          description: '精美的艺术作品'
        }
      ]
    }
  },
  methods: {
    showImageDetails(image) {
      this.selectedImage = image
      document.body.style.overflow = 'hidden' // 防止背景滚动
    },
    closeModal() {
      this.selectedImage = null
      document.body.style.overflow = '' // 恢复背景滚动
    }
  },
  // 监听列数变化，保存到localStorage
  watch: {
    columnCount(newValue) {
      localStorage.setItem('columnCount', newValue)
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 20px;
  text-align: right;
}

select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* 弹窗样式 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 90%;
  overflow: auto;
  position: relative;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  display: block;
  margin: 0 auto 15px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}
</style>
