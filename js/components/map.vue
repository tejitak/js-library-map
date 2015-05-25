<template>
  <div id="map" class="component__map">
    <a href="javascript:;" v-repeat="items" v-on="click: selectItem(this)">
        <div class="component__map_item" v-style="opacity: selected ? '1' : '0.2', z-index: selected ? 10 : 1, top: pos.t + 'px', left: pos.l + 'px'" v-draggable>
            <img title="{{name}}" alt="{{name}}" v-attr="src: logo">
        </div>
    <a>
  </div>
</template>

<script>

module.exports = {
    data: function () {
        return {
            items: []
        }
    },

    created: function(){
    },

    methods: {
        selectItem: function(item){
            this.$root.showPopup(item.id)
        }
    }
}
</script>