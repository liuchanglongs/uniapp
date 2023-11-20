<template>
  <view class="container" @click="go">
    <view class="box">
        <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      go(url){
        this.$emit('go')
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
    background-color: #c00000;
    .box{
      height: 36px;
      width: 100%;
      border-radius: 16px;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
}
</style>
