<template>
  <view>
      <view class="container">
        <view class="icon">@搜索</view>
        <input 
        @input = "search"
        :value="value"
        class="input" focus  />
        <!-- <view class="notice"> -->
          <!-- <view class="big"></view> -->
          <view class="close" v-if="value" @click="clearnContent">x</view>
        <!-- </view> -->
      </view>
      <view class="list" v-if="searchResultList.length > 0">
        <view class="sugg-item" v-for="(item, i) in searchResultList" 
        :key="i" @click="gotoDetail(item.goods_id)"> 
            <view class="goods-name">{{item.goods_name}}</view> 
            <text>></text> 
        </view>
      </view>
     <!-- 搜索历史 -->
     <view class="history-box" v-else> <!-- 标题区域 -->
         <view class="history-title"> 
             <text>搜索历史</text> 
             <text size="17" @click="clearHistory">x</text> 
         </view> 
         <!-- 列表区域 -->
         <view class="history-list"> 
             <view class="item"  v-for="(item, i) in historyListReserve" 
             @click="setContent(item)"
             :key="i"> 
             {{item}}
             </view> 
         </view> 
     </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        trim: '',
        searchResultList:[],
        historyList:[],
        value:''
      }
    },
    mounted() {
      this.historyList =wx.getStorageSync('historyList') ? JSON.parse(wx.getStorageSync('historyList')) : [];
    },
    computed:{
      historyListReserve(){
        return [...this.historyList].reverse()
      }
    },
    methods: {
        search(e){
          this.value = e.detail.value
          clearTimeout(this.trim)
          console.log(e.detail.value)
          if(!e.detail.value){
            this.searchResultList = [];
            return
          }
          this.trim = setTimeout(()=>{
              this.searchList(e.detail.value);
          },500)
        },
        searchList(value){
          this.$https.get('public/v1/goods/search',{ query: value }).then(res=>{
              if(res.data){
                this.historyList.push(value);
                const set = new Set(this.historyList);
                set.delete(value);
                set.add(value);
                this.historyList = Array.from(set);
                wx.setStorageSync('historyList', JSON.stringify(this.historyList));
                this.searchResultList = res.data.message?.goods;
              }       
          })
        },
        gotoDetail(v){
          console.log(v)
          uni.navigateTo({ url: '/subpkg/goods_list/index?query=' + v });
        },
        clearHistory(){
            wx.removeStorageSync('historyList');
            this.historyList = [];
        },
        setContent(v){
            this.value = v;
            this.searchList(v);
        },
        clearnContent(){
          this.value = '';
          console.log(this.value);
          this.searchResultList = []
        }
    }
  }
</script>

<style lang="scss">
.container{
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c00000;
    position: relative;
    .icon{
          width: 67px;
          display: block;
          background: #ffffff;
          line-height: 36px;
          border-radius: 16px 0 0 16px;
    }
    .input{
      height: 36px;
      width: 100%;
      border-radius: 0 16px 16px 0;
      background-color: #ffffff;
    }
    // .notice{
    //     display: flex;
    //     width: 100%;
    //     justify-content: space-between;
    //     position: absolute;
        .big{
          position: absolute;
          left: 2vw;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          justify-content: center;
        }
        .close{
          position: absolute;
          right: 5vw;
          top: 50%;
          transform: translateY(-50%);
          z-index: 999;
        }
    // }
}

.list{
  padding: 0 5px;
  .sugg-item{
    padding: 13px 0;
    font-size: 12px;
    border-bottom: 1px solid #efefef;;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box{
  padding: 0 5px;
  .history-title{
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    justify-content: space-between; 
    align-items: center;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    .item{
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
