<style lang="stylus">
.tab
    .title-wrap
        display table
        
    .title
        display table-cell
        font-weight bold
        font-size 22px
        padding 10px 20px

</style>

<template>
  <div class="tab component__tab" v-class="">
    <header class="tabHeader title-wrap" role="tab-trigger">
      <nav>
        <div class="tab-trigger title" v-class="Selected: selectedTab == 'keywords'"><a href="javascript:;" v-on="click: selectedTab = 'keywords'">Keyowrds</a></div>
        <div class="tab-trigger title" v-class="Selected: selectedTab == 'libs'"><a href="javascript:;" v-on="click: selectedTab = 'libs'">Libraries</a></div>
      </nav>
    </header>

    <section class="tabContent" v-show="selectedTab == 'keywords'">
      <ul class="component__list" function="scroll-1">
        <li class="item" v-repeat="keywords" v-class="selected: this == selectedKeyword">
          <a href="javascript:;" v-on="click: selectKeyword(this)">{{name}}</a>
        </li>
      </ul>
    </section>

    <section class="tabContent" v-show="selectedTab == 'libs'">

      <header class="component__filter" role="filter">
        <label for="filter-input">Filter</label>
        <input id="filter-input" type="text" placeholder="Library Name..." v-model="searchText" />
      </header>

      <ul class="component__list" function="scroll-2">
        <li class="item" v-repeat="items | orderBy 'name' 1 | filterBy searchText in name" v-on="click: selectItem(this)" v-class="selected: this == selectedItem">
          <dl>
            <dt>
              <span class="ranking">{{$index + 1}}:</span>
              <strong class="lib-name">{{name}}</strong>
            </dt>
          </dl>
        </li>
      </ul>

    </section>
  </div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            title: "",
            selectedTab: "keywords",
            searchText: "",
            selectedKeyword : null,
            selectedItem: null,
            items: [],
            keywords: []
        }
    },

    methods: {
        selectKeyword: function(keyword){
            this.$dispatch("onPopupClose")
            this.selectedItem = null
            if(this.selectedKeyword == keyword){
              this.$root.onChangeSelection([])
              this.selectedKeyword = null
            }else{
              this.$root.onChangeSelection(keyword.libs || [])
              this.selectedKeyword = keyword
            }
        },

        selectItem: function(item){
            this.$dispatch("onPopupClose")
            this.selectedKeyword = null
            if(this.selectedItem == item){
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