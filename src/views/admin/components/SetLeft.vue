<script setup lang='ts'>
import { ref } from 'vue';
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
import http from '@/http/http';
import dayjs from 'dayjs'

const router = useRouter()
const { $state: state } = useStore()
interface IWeather {
  humidity: Number | String
  pm25: Number | String
  rainfall: Number | String
  region: String
  temperature: Number | String
  updateTime: String
  visibility: String
  weather: String
  windDirection: String
  windPower: Number | String
}
const datalist = ref<IWeather>()
const cip = ref<string>()
// data:天气数据   cid:城市id 
const promiseion: any = state.nowWeatherData
promiseion.then(res => {
  datalist.value = res.weatherData
  datalist.value!.region = res.region
  cip.value = res.ip
})

const items = [
  {
    name: '用户管理',
    uicon: '<i class="iconfont">&#xe612;</i>',
    path: '/userAdmin/User'
  },
  {
    name: '文章管理',
    uicon: '<i class="iconfont">&#xe606;</i>',
    path: '/userAdmin/Article'
  },
  {
    name: '评论管理',
    uicon: '<i class="iconfont">&#xe607;</i>',
    path: '/commentAdmin'
  },
  {
    name: '分类管理',
    uicon: '<i class="iconfont">&#xe60e;</i>',
    path: '/categoryAdmin'
  },
  {
    name: '标签管理',
    uicon: '<i class="iconfont">&#xe64d;</i>',
    path: '/tagAdmin'
  },
  {
    name: '友链管理',
    uicon: '<i class="iconfont">&#xe609;</i>',
    path: '/linkAdmin'
  },
  {
    name: '网站设置',
    uicon: '<i class="iconfont">&#xe60a;</i>',
    path: '/settingAdmin'
  }, {
    name: '退出登陆',
    uicon: '<i class="iconfont">&#xe60b;</i>',
    path: '/login'
  },
  {
    name: '返回首页',
    uicon: '<i class="iconfont">&#xe60b;</i>',
    path: '/'
  },
]

const activeIndex = ref(0)
items.forEach((item, index) => {
  if (item.path === router.currentRoute.value.path) {
    activeIndex.value = index
  }
})

const activefn = (index) => {
  if (items[index].name == '退出登陆') {
    localStorage.removeItem('lzy_token')
  }
  activeIndex.value = index
  router.push(items[index].path)
}
const formatted = ref(dayjs()?.format('YYYY-MM-DD HH:mm:ss'))
setInterval(() => {
  formatted.value = dayjs()?.format('YYYY-MM-DD HH:mm:ss')
}, 1000)
//处理用户详情数据
const infoData: any = ref()
const { data } = await http('get', '/admin/getUserInfo') as any
if (data.perSign) {
  data.perSign = data.perSign.replace(',', '#,~').split('#,~')
  data.perSign = data.perSign ? data.perSign : '这个人很懒，什么都没留下'
} else {
  data.perSign = ['这个人很懒', '什么都没留下']
}

infoData.value = data
</script>

<template>
  <div class="setleft">
    <div class="logo"> Lzyszds </div>
    <div class="userinfo">
      <div class="headPortrait"><img :src="'http://localhost:1027' + infoData.headImg" alt=""> </div>
      <h3>{{ infoData.uname }}</h3>
      <p>「{{ infoData.perSign[0] }}」</p>
      <p>{{ infoData.perSign[1] }}</p>
      <p class="essCount">
        <lzyIcon :name="`icon-youxiang`" :fill="`#5161ce`"></lzyIcon>
        <span>17</span>
      </p><!-- 消息数量-->
    </div>
    <div class="list">
      <div class="list_item" v-for="(item, index) in items" :key="index" @click="activefn(index)"
        :class="{ 'active': activeIndex == index }">
        <span v-html="item.uicon"></span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="footer">
      <div class="time">
        <p class="weacher">
          <el-tooltip class="box-item" effect="lzy_dark"
            :content="`湿度：${datalist?.humidity}%RH 风向：${datalist?.windDirection} 降水量：${datalist?.rainfall}mm`"
            placement="top">
            <span>{{ datalist?.region }} {{ datalist?.weather }} 室外温度：{{ datalist?.temperature }}℃ </span>
          </el-tooltip>

          <!-- <span>湿度：{{ datalist?.humidity }}%RH</span> -->
        </p>
        <p>{{ formatted }}</p>
        <a :href="cip">IP: {{ cip }}</a>
      </div>
      <div>
        <p>© 2022 Lzyszds</p>
        <p>Powered by Vue3 + Vite + ElementPlus</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.setleft {
  position: relative;
  height: 100%;

  .logo {
    padding-top: 30px;
    color: #000;
    font-family: 'douyu';
    font-size: 40px;
    text-align: center;
  }

  .userinfo {
    text-align: center;

    .headPortrait {
      border-radius: 50%;
      position: relative;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 20px auto;
        border: 3px solid #5161ce20;
        padding: 7px;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%) rotate(30deg);
        width: 100px;
        height: 100px;
        border: 3px solid transparent;
        border-top: 3px solid var(--themeColor);
        margin: 20px auto;
        padding: 7px;
        border-bottom: 3px solid var(--themeColor);
        border-radius: 50%;
        animation: rotate 8s linear infinite;
      }
    }

    h3 {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      font-family: 'almama';
    }

    p {
      font-size: 9px;
      color: #999;
      font-weight: 100;
      font-family: 'almama';
    }

    .essCount {
      width: 70px;
      padding: 0 10px;
      line-height: 30px;
      text-align: center;
      border-radius: 30px;
      margin: 10px auto 0;
      box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.08);
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      border: 1px solid #eee;

      svg {
        width: 20px;
        height: 20px;
      }

      span {
        line-height: 35px;
        height: 30px;
        user-select: none;
      }
    }
  }

  .list {
    margin-top: 30px;

    .list_item {
      display: grid;
      grid-template-columns: 7fr 9fr;
      align-items: center;
      padding: 5px 0px;
      cursor: pointer;
      transition: all 0.5s;
      user-select: none;
      position: relative;

      &:hover {
        background: #f5f5f5;
      }

      &:hover span {
        color: var(--themeColor);
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        transition: .3s;
      }

      &.active {
        &:before {
          background: var(--themeColor);
        }

        span {
          color: var(--themeColor);
          -webkit-animation: jello-horizontal 0.9s both;
          animation: jello-horizontal 0.9s both;
        }

      }

      span {
        font-size: 14px;
        color: #000;
        font-weight: 100;
        font-family: 'almama';
      }

      span:nth-child(1) {
        text-align: right;
        padding-right: 20px;
      }
    }



  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    font-family: 'almama';
    font-size: 8px;

    .time {
      color: var(--themeColor);

      .weacher {
        span {
          margin-right: 10px;
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }

  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

@-webkit-keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(0.75, 1.15, 1);
    transform: scale3d(0.75, 1.15, 1);
  }

  40% {
    -webkit-transform: scale3d(1.15, 0.72, 1);
    transform: scale3d(1.15, 0.72, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 0.75, 1);
    transform: scale3d(1.05, 0.75, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
