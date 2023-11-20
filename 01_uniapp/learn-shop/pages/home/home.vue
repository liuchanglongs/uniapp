<template>
  <view>
    <view class="search">
      <my-search @go = "goSearch"></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="false" :interval="2000" :circular="true">
        <swiper-item v-for="item in swiperList" :key = "item.goods_id" @click="go(item, 'swiper')">
          <image class="image" :src="item.image_src" mode="widthFix"></image>
        </swiper-item>
    </swiper>
    <view class="classfication">
        <image :src="item.image_src" mode="widthFix" v-for=" item in classificationList" :key = "item.name" @click="go(item.navigator_url, 'category')">
        </image>  
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list"> 
    <!-- 楼层 item 项 -->
        <view class="floor-item" v-for="(item, i) in floorList" :key="i"> <!-- 楼层标题 -->
            <image :src="item.floor_title.image_src" class="floor-title"></image> 
            <!-- 楼层图片区域 -->
            <view class="floor-img-box"> <!-- 左侧大图片的盒子 -->
                    <view class="left-img-box"> 
                        <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" 
                        mode="widthFix" @click="go(item.product_list[0].navigator_url, 'goods_list')"></image> 
                    </view> 
                <!-- 右侧 4 个小图片的盒子 -->
                    <view class="right-img-box"> 
                        <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
                            <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"
                            @click="go(item2.navigator_url, 'goods_list')"></image>  
                        </view>
                    </view> 
            </view>
        </view>
    </view>
 </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        classificationList:[],
        floorList:[]
      };
    },
    mounted() {
      this.$https.get('public/v1/home/swiperdata').then(res=>{
          if(res.data){
            this.swiperList = res.data?.message
          }       
      });
      this.$https.get('public/v1/home/catitems').then(res=>{
          if(res.data){
            this.classificationList = res.data?.message
          }       
      });
      this.$https.get('public/v1/home/floordata').then(res=>{
          if(res.data){
              console.log(res.data)
            this.floorList = res.data?.message
          }       
      })
    },
    methods:{
        go(data, way){
          if(way === "swiper"){
              wx.navigateTo({url: `/subpkg/goods_detail/goods_detail?goods_id=${data.goods_id}`});
          }else if(way === "category"){
              wx.switchTab({url: "/pages/cate/cate"});
          }else if(way === "goods_list"){
              let arry = data.split('?');
              console.log(arry)
              wx.navigateTo({url: `/subpkg/goods_list/index?${arry[1]}`})
          }
        },
      goSearch(){
        wx.navigateTo({url:"/subpkg/search/search"})
      }
    }
  }
</script>

<style lang="scss">
.search{
    position: sticky;
    top: 0;
    z-index: 9999;
}
.swiper-item{
    .image{
      width: 100%;
      height: 100%;
    }
}
.classfication{
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
    image{
        height: 60px ;
        width: 60px ;
    }
}
  
.floor-list{
    padding: 10px 0;
    .floor-item{
        padding: 10px 0;
    }
}
.floor-title { 
    height: 60rpx; 
    width: 100%; 
    display: flex; 
  }
.right-img-box { 
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-around; 
  }
.floor-img-box { 
  display: flex; 
  padding-left: 10rpx; 
}
</style>
