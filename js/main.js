import Vue from 'vue'
import $ from 'jquery'
import util from './common/util'
import vueMap from './components/map.vue'
import vuePopup from './components/popup.vue'
import vuePopupContent from './components/popupContent.vue'
import vueTab from './components/tab.vue'
import vueDrawer from './components/drawer.vue'
import draggable from './directives/draggable'

Vue.config.debug = OPTION.debug

var MAX_IMAGE_SIZE = util.isMobileScreen() ? 80 : 160

var app = module.exports = new Vue({

    el: '#app',

    components: {
        "vue-map": vueMap,
        "vue-popup": vuePopup,
        "vue-popup-content": vuePopupContent,
        "vue-tab": vueTab,
        "vue-drawer": vueDrawer
    },

    data: {
        items: [],
        keywords: [],
        selectedItem: {},
        popupOpened: false,
        drawerOpened: false,
        navigationOpened: !util.isMobileScreen(),
        initialized: false,
        creators: [{
            name: "Takuya Tejima",
            img: "http://graph.facebook.com/10152855301715662/picture?type=normal",
            job: "Developer",
            url: "https://github.com/tejitak"
        }]
    },

    created: function() {
        this.$on("onPopupClose", () => {
            this.popupOpened = false
        })
        this.$on("onDrawerClose", () => {
            this.toggleAboutUs()
        })
        this.$on("onNavigationClose", () => {
            this.toggleNavigation()
        })
        this.refresh()
    },

    methods: {
        refresh: function(){
            $.ajax({
                type: "GET",
                url: "./api/v1/libs",
                dataType: "json",
                cache: false,
                success: (res) => {
                    this.initialized = true
                    this.updateLibs(res.libs)
                    this.keywords = res.keywords
                },
                error: () => {
                    this.initialized = true
                }
            })
        },

        updateLibs: function(libs){
            // set position by random
            libs.forEach((lib) => {
                lib.pos = {
                    t: Math.floor(Math.random() * (mainH - MAX_IMAGE_SIZE)),
                    l: Math.floor(Math.random() * (mainW - MAX_IMAGE_SIZE))
                }
                lib.selected = true
            })
            this.items = libs
        },

        onChangeSelection: function(ids){
            if(!ids || ids.length == 0) { 
                // clear selections
                this.items.forEach((item) => {
                    item.selected = true
                })                
                return
            }
            if(ids.length === 1){
                // show popup if one selected
                this.showPopup(ids[0])
            }
            // set selected flag
            this.items.forEach((item) => {
                item.selected = $.inArray(item.id, ids) >= 0 ? true : false
            })
        },

        showPopup: function(id){
            this.selectedItem = this.getItemById(id)
            // temp workaround to wait existing transition end
            setTimeout(() => {
                this.popupOpened = true
            }, 100)
        },

        getItemById: function(id){
            var arr = $.grep(this.items, function(n, i){
               return n.id === id
            })
            return (arr && arr[0]) || null
        },

        toggleAboutUs: function(){
            this.drawerOpened = !this.drawerOpened
            this.shuffleMap()
        },

        // for mobile
        toggleNavigation: function(){
            this.navigationOpened = !this.navigationOpened
            this.shuffleMap()
        },

        shuffleMap: function(){
            resize()
            this.updateLibs(this.items)
        }
    }
})

// temp window size adjustment
var mainH, mainW

var resize = function(){
    var $win = $(window),
        $body = $(document.body),
        winH = $win.height(),
        winW = $win.width(),
        containers = {
            root: $(".component__main"),
            tabWrap: $(".component__tab"),
            tab: [
              $("[role=tabs] [function=scroll-1]"),
              $("[role=tabs] [function=scroll-2]")
            ],
            map: $("#map")
        },
        $tabTrigger = $("[role=tabs] [role=tab-trigger]"),
        $listFilter = $("[role=tabs] [role=filter]"),
        $footer = $("footer")
    // set width and height
    mainH = winH - $footer.height()
    mainW = winW - (app.navigationOpened ? containers.tabWrap.width() : 0)
    // body
    $body.height(winH)
    // map
    containers.root.height(mainH)
    containers.map.width(mainW)
    containers.map.height(mainH)
    // tab
    containers.tab[0].height(mainH - $tabTrigger.outerHeight())
    containers.tab[1].height(mainH - $tabTrigger.outerHeight() - $listFilter.outerHeight())
}
resize()
$(window).on("resize", resize)