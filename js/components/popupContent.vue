<template>
  <div class="popup_content">
    <div class="scroll_container" function="scroll">
      <div class="lib_data">
        <a v-attr="href: url" target="_blank" class="goto-url"><i class="icon"></i></a>
      </div>

      <div class="description" v-show="description">
        <p>
          {{description}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
    data: function () {
        return {
          url: "",
          description: ""
        }
    },

    methods: {
    }
};
</script>