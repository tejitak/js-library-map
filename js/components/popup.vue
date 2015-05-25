<template>
    <section class="popup component__popup" v-class="loading: loading">
      <h1 class="title"><span>{{title}}</span></h1>
      <content></content>
      <div class="closeWrap">
        <a href="javascript:;" v-on="click: close()" class="close" title="Close"></a>
      </div>
    </section>
</template>

<script>
module.exports = {
    data: function(){
        return {
            title: "",
            loading: false
        }
    },

    paramAttributes: ["title"],

    methods: {
        close: function(){
            this.$dispatch("onPopupClose");
        }
    }
};
</script>