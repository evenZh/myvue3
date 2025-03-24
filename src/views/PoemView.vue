<template>
  <div class="poem-container">
    <h1>每日一诗</h1>
    <div class="poem-card">
      <h2 class="poem-title">{{ poem.title }}</h2>
      <p class="poem-author">{{ poem.dynasty }} · {{ poem.author }}</p>
      <div class="poem-content">
        <p v-for="(line, index) in poem.content" :key="index">{{ line }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoemView',
  data() {
    return {
      poems: [
        {
          title: '静夜思',
          author: '李白',
          dynasty: '唐',
          content: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。']
        },
        {
          title: '登鹳雀楼',
          author: '王之涣',
          dynasty: '唐',
          content: ['白日依山尽，', '黄河入海流。', '欲穷千里目，', '更上一层楼。']
        },
        {
          title: '望庐山瀑布',
          author: '李白',
          dynasty: '唐',
          content: ['日照香炉生紫烟，', '遥看瀑布挂前川。', '飞流直下三千尺，', '疑是银河落九天。']
        },
        {
          title: '春晓',
          author: '孟浩然',
          dynasty: '唐',
          content: ['春眠不觉晓，', '处处闻啼鸟。', '夜来风雨声，', '花落知多少。']
        },
        {
          title: '相思',
          author: '王维',
          dynasty: '唐',
          content: ['红豆生南国，', '春来发几枝？', '愿君多采撷，', '此物最相思。']
        },
        {
          title: '江雪',
          author: '柳宗元',
          dynasty: '唐',
          content: ['千山鸟飞绝，', '万径人踪灭。', '孤舟蓑笠翁，', '独钓寒江雪。']
        },
        {
          title: '枫桥夜泊',
          author: '张继',
          dynasty: '唐',
          content: ['月落乌啼霜满天，', '江枫渔火对愁眠。', '姑苏城外寒山寺，', '夜半钟声到客船。']
        },
        {
          title: '悯农',
          author: '李绅',
          dynasty: '唐',
          content: ['锄禾日当午，', '汗滴禾下土。', '谁知盘中餐，', '粒粒皆辛苦。']
        },
        {
          title: '游子吟',
          author: '孟郊',
          dynasty: '唐',
          content: ['慈母手中线，', '游子身上衣。', '临行密密缝，', '意恐迟迟归。', '谁言寸草心，', '报得三春晖。']
        },
        {
          title: '望天门山',
          author: '李白',
          dynasty: '唐',
          content: ['天门中断楚江开，', '碧水东流至此回。', '两岸青山相对出，', '孤帆一片日边来。']
        }
      ],
      poem: null
    }
  },
  created() {
    // 获取今天的日期作为随机种子
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // 使用日期字符串生成一个伪随机数
    let seed = 0;
    for (let i = 0; i < dateString.length; i++) {
      seed += dateString.charCodeAt(i);
    }
    
    // 使用种子选择今天的诗
    const index = seed % this.poems.length;
    this.poem = this.poems[index];
  }
}
</script>

<style scoped>
.poem-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.poem-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
}

.poem-title {
  font-size: 28px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.poem-author {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.poem-content {
  font-size: 20px;
  line-height: 1.8;
  color: #333;
}

.poem-content p {
  margin: 10px 0;
}
</style>