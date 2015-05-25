import $ from 'jquery'
import Vue from 'vue'

Vue.directive('draggable', {
    bind: function () {
        var el = this.el,
            root = document.documentElement,
            diff = {x: 0, y: 0},
            dragging = false

        $(el).on('mousedown', (e) => {
            var rect = el.getBoundingClientRect(),
                left = window.pageXOffset || root.scrollLeft,
                top  = window.pageYOffset || root.scrollTop

            el.style.left = (rect.left + left) + 'px'
            el.style.top = (rect.top + top) + 'px'
            diff.x = e.clientX - rect.left + left
            diff.y = e.clientY - rect.top + top
            dragging = true
            // TODO: to be callback
            el.style.transition = "none"
            e.preventDefault()
            return false
        })

        $(document).on('mouseup', (e) => {
            dragging = false
            // TODO: to be callback
            el.style.transition = "all 0.8s ease"
        })

        $(document).on('mousemove', (e) => {
            if(dragging){
                if(!e){ e = window.event }
                var left = window.pageXOffset || root.scrollLeft,
                    top  = window.pageYOffset || root.scrollTop
                
                el.style.left = left + e.clientX - diff.x + 'px'
                el.style.top = top + e.clientY - diff.y + 'px'
            }
        })
    }
})