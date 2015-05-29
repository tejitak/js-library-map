<template>
  <div id="map" class="component__map">
    <a href="javascript:;" v-repeat="items" v-on="click: selectItem(this)">
        <div class="component__map_item"  v-class="selected: selected" v-style="top: pos.t + 'px', left: pos.l + 'px'" v-draggable>
            <img title="{{name}}" alt="{{name}}" v-attr="src: logo">
        </div>
    <a>
  </div>
</template>

<script>

module.exports = {
    data: function () {
        return {
            selectedItem: null,
            items: []
        }
    },

    created: function(){
    },

    methods: {
        selectItem: function(item){
            // toggle highlight by click
            this.$dispatch("onPopupClose")
            if(this.selectedItem === item){
                this.$root.onChangeSelection([])
                this.selectedItem = null
            }else{
                this.$root.onChangeSelection([item.id])
                this.selectedItem = item
            }
        }
    }
}
</script>