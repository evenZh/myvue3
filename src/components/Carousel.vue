<template>
  <div class="carousel">
    <div class="carousel-inner">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
        :class="{ active: currentIndex === index }"
      >
        <img :src="item.image" :alt= "item.caption" />
        <div class="carousel-caption">
            {{ item.caption }}
        </div>
      </div>
    </div>
    <van-icon name="arrow-double-left" @click="prev" color="#1989fa" class="carousel-control-prev" />
      &lt;
    
    <van-icon name="arrow-double-right" @click="next" color="#1989fa" class="carousel-control-next" />
      &gt;
  
  </div>
</template>

<script>
export default {
  name: 'CarouselBanner',
  props: {
    items: {
      type: Array,
      required: true
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0,
      intervalId: null
    };
  },
  computed: {
    currentCaption() {
      return this.items[this.currentIndex]?.caption || '';
    }
  },
  methods: {
    next() {
      if (this.items.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.updateTransform(); // 更新变换
    },
    prev() {
        if (this.items.length === 0) return;
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.updateTransform(); // 更新变换
    },
    updateTransform() {
      // 更新变换以确保图片正确切换
      this.$nextTick(() => {
        const carouselInner = this.$el.querySelector('.carousel-inner');
        carouselInner.style.transform = `translateX(${-100 * this.currentIndex}%)`;
      });
    },
    startAutoPlay() {
      this.intervalId = setInterval(() => {
        this.next();
      }, 3000);
    },
    stopAutoPlay() {
      clearInterval(this.intervalId);
    }
  },
  mounted() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  },
  beforeUnmount() {
    if (this.autoPlay) {
      this.stopAutoPlay();
    }
  },
};
</script>

<style scoped>
.carousel {
  max-width:500px;
    width:100%;
    height:300px;
  position: relative;
  margin:0 auto;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  width: 100%;
  height:300px;
  flex-shrink: 0;
  text-align: center;
}

.carousel-item img {
  max-width: 100%;
  height: 300px;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  height:30px;
  width:100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  /* padding: 10px; */
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  cursor: pointer;
}

.carousel-control-prev {
  left: 10px;
}

.carousel-control-next {
  right: 10px;
}
</style>