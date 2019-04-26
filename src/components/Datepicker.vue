<template>
  <div class="test">
    <datepicker :format="customFormatter" v-model="model.date"></datepicker>
    <span>{{model.date}}fsfa</span>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
var moment = require("moment");

export default {
  components: {
    Datepicker
  },

  data() {
    return {
      model: {
        date: ""
      },
      DatePickerFormat: "dd-MM-yyyy",
      methods: {
        customFormatter(date) {
          return moment(date).format("yyyy");
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.test {
  padding: 10px;
}

#app > div.test > div > div:nth-child(1) > input[type="text"] {
  padding: 10px;
}
</style>
