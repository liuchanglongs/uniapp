<template>
<view>
  <my-search @go = "goSearch"></my-search>
  <view class="scroll">
      <view class="scroll-left">
        <scroll-view  class="scroll-view"  scroll-y="true" :style="{height: height + 'px'}">
          <view  :class="['scroll-view-item', selectItem === index ? 'active' : '']" 
          v-for="(item, index) in cateList" :key = "item.cat_id"
          @click="isActive(index)">{{item.cat_name}}</view>
        </scroll-view>
      </view>
      <view class="scroll-right">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" :style="{height: height + 'px'}" >
          <view  class="scroll-right-view" v-for="(v2, index2) in cateListChildren" :key="v2.cat_id">
            <view class="title">{{v2.cat_name}}</view>
            <view class="lv3-cate">
              <view class="lv3-cate-item" v-for="(v3, index3) in v2.children" :key="index3"
              @click="go(v3)">{{v3.cat_name}}</view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="scroll-right"></view>
  </view>
</view>
</template>

<script>
  export default {
    data() {
      return {
          cateList:[],
          cateListChildren:[],
          height:0,
          selectItem:0,
          scrollTop:0
      };
    },
    mounted() {
        this.height = wx.getSystemInfoSync().windowHeight - 50
        this.$https.get('public/v1/categories').then(res=>{
            if(res.data){
              this.cateList = res.data?.message;
              this.cateListChildren = res.data?.message[0].children;
            }       
        });
    },
    methods:{
        isActive(index){
            this.selectItem = index;
            this.cateListChildren = this.cateList[index].children;
            this.scrollTop = this.scrollTop === 0 ? 0.1 : 0
        },
        go(v){
          wx.navigateTo({url: '/subpkg/goods_list/index?cid=' + v.cat_id})
          console.log(v)
        },
        goSearch(){
          wx.navigateTo({url:"/subpkg/search/search"})
        }
    }
  }
</script>

<style lang="scss">
.scroll{
  display: flex;
}
.scroll-left{
  .scroll-view{
    width: 120px;
  }
  .scroll-view-item{
    line-height: 60px; 
    background-color: #f7f7f7; 
    text-align: center;
    font-size: 12px;
  }
  .active{
    background-color: #ffffff;
    position: relative;
    &::before {
        content: ' '; 
        display: block; 
        width: 3px; 
        height: 40px; 
        background-color: #c00000; 
        position: absolute; 
        left: 0; 
        top: 50%; 
        transform: translateY(-50%); }
    }
  }
  .scroll-right-view{
    .title {
      font-size: 12px;
      font-weight: bold; 
      text-align: center; 
      padding: 15px 0; 
      }
    .lv3-cate{
      display: flex;
      flex-wrap: wrap;
      .lv3-cate-item{
        width: 33.33%; 
        font-size: 12px;
        text-align: center;
        line-height: 60px;
      }
    }
  }

</style>
