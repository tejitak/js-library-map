import $ from 'jquery'

module.exports = {

    escapeHTML: function(text){
        return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

}