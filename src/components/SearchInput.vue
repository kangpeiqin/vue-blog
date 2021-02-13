<template>
  <div class="inputBox">
    <input type="text" placeholder="搜索文章" v-model="content" v-on:keydown.enter="qry" />
    <div class="search"></div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'SearchInput',
  data () {
    return {
      content: ''
    }
  },
  computed: mapState(['qryContent']),
  methods: {
    qry: function () {
      this.$store.commit('setQryContent', this.content)
      alert(this.qryContent)
    }
  }
}
</script>
<style scoped>
  .inputBox {
    width: 50px;
    height: 50px;
    position: relative; z-index: 999;
  }
  .inputBox .search {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: #517bd6;
    border-radius: 50%;
    transition: all 1s;
    z-index: 4;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  }
  .inputBox .search:hover {
    cursor: pointer;
  }
  .inputBox .search::before {
    content: "";
    position: absolute;
    margin: auto;
    top: 18px;
    right: 0;
    bottom: 0;
    left: 18px;
    width: 10px;
    height: 2px;
    background: white;
    transform: rotate(45deg);
    transition: all .5s;
  }
  .inputBox .search::after {
    content: "";
    position: absolute;
    margin: auto;
    top: -3px;
    right: 0;
    bottom: 0;
    left: -3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    transition: all .5s;
  }
  .inputBox input {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    /* left: 0; */
    width: 40px;
    height: 40px;
    outline: none;
    border: none;
    background: #fff;
    color: #777;
    border-radius: 30px;
    box-shadow: 0 0 25px 0 #517bd6, 0 0px 15px 0 rgba(0, 0, 0, 0.5);
    transition: all 1s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
  }
  .inputBox input:hover {
    cursor: pointer;
  }
  .inputBox input:focus {
    width: 90px;
    padding: 0 80px 0 20px;
    opacity: 1;
    cursor: text;
  }
  .inputBox input:focus ~ .search {
    right: 0;
    background: #f60;
    z-index: 6;
  }
  .inputBox input:focus ~ .search::before {
    top: 0;
    left: 0;
    width: 25px;
  }
  .inputBox input:focus ~ .search::after {
    top: 0;
    left: 0;
    width: 25px;
    height: 2px;
    border: none;
    background: white;
    border-radius: 0%;
    transform: rotate(-45deg);
  }
  .inputBox input::placeholder {
    color: #777;
    opacity: 0.8;
  }
</style>
