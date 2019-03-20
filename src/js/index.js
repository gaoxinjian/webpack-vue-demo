import Index from '../vue/index.vue';
import Vue from 'vue';

console.log(123);

new Vue({
  render: h => h(Index),
}).$mount('#app')