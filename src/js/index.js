import Index from '../vue/index.vue';
import Vue from 'vue';
import { cube } from './common.js';

console.log(cube(2));

new Vue({
  render: h => h(Index),
}).$mount('#app')