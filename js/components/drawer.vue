<template>
  <div class="drawer">
    <content></content>
    <div class="closeWrap">
      <a href="javascript:;" v-on="click: close()" class="close" title="Close"></a>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function(){
    return {
    }
  },

  methods: {
    close: function(){
      this.$dispatch("onDrawerClose")
    }
  }
}
</script>