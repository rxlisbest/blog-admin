<template>
  <card-modal :okText="okText" :cancelText="cancelText" :visible="visible" @close="close" :title="title" transition="zoom" @ok="ok()" @cancel="cancel()">
    <div class="content">
      <p class="control is-4" v-for="v,k in article_categories">
        <input v-if="v.edit" class="input input-50" type="text" placeholder="Text input" v-model="v.title">
        <span v-if="!v.edit" class="title" v-text="v.title"></span>

        <button v-if="!v.edit" @click="del(k, v)" class="button is-white pull-right"><i class="fa fa-trash-o"></i></button>
        <button v-if="!v.edit" @click="edit(k, v)" class="button is-white pull-right"><i class="fa fa-pencil-square-o"></i></button>

        <button v-if="v.edit" @click="cancelEdit(k, v)" class="button is-white pull-right"><i class="fa fa-times"></i></button>
        <button v-if="v.edit" @click="submitEdit(k, v)" class="button is-white pull-right"><i class="fa fa-check"></i></button>
      </p>
      <p class="control is-4" v-if="article_category.edit">
        <input class="input input-50" type="text" placeholder="Text input" v-model="article_category.title">

        <button @click="cancelAdd()" class="button is-white pull-right"><i class="fa fa-times"></i></button>
        <button @click="submitAdd()" class="button is-white pull-right"><i class="fa fa-check"></i></button>
      </p>
    </div>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
  components: {
    CardModal
  },

  props: {
    visible: Boolean,
    title: String,
    okText: String,
    cancelText: String,
    type: Number
  },

  data () {
    return {
      article_categories: [],
      article_category: {
        edit: false,
        title: ''
      }
    }
  },

  mounted () {
    this.loadData();
  },

  methods: {
    loadData(){
      let _this = this;
      this.axios({
        url: api.article_categories.index,
        method: "get",
        params: {
          type: this.type,
        }
      }).then((response) => {
        if(response.status == 200){
          var data = response.data;
          _this.article_categories = data;
        }
      }).catch((error) => {

      });
    },
    ok(){
      this.add();
    },
    open (url) {
      window.open(url)
    },
    close () {
      this.$emit('close')
    },
    cancel(){
      this.cancelAdd();
      // this.$emit('cancel')
    },

    add(){
      this.article_category.title = '';
      this.article_category.edit = true;
    },
    cancelAdd(){
      this.article_category.edit = false;
    },
    submitAdd(){
      let _this = this;
      this.axios({
        url: api.article_categories.create,
        method: "post",
        data : {
          title: this.article_category.title,
          parent_id: 0,
          type: this.type,
          status: 0
        }
      }).then((response) => {
        _this.cancelAdd();
        _this.article_categories.push(response.data);
        _this.loadArticleCategory();
      }).catch((error) => {

      })
    },
    edit(k,v){
      v.edit = true;
      this.$set(this.article_categories, k, v);
    },
    cancelEdit(k, v){
      v.edit = false;
      this.$set(this.article_categories, k, v);
    },
    submitEdit(k, v){
      let _this = this;
      this.axios({
        url: api.article_categories.update + v.id,
        method: "put",
        data : {
          title: v.title,
        }
      }).then((response) => {
        if(response.status == 200){
          _this.cancelEdit(k, v);
          _this.loadArticleCategory();
        }
      }).catch((error) => {

      })
    },
    del(k, v){
      let _this = this;
      this.axios({
        url: api.article_categories.delete + v.id,
        method: "delete"
      }).then((response) => {
        _this.$delete(_this.article_categories, k);
        _this.loadArticleCategory();
      }).catch((error) => {

      })
    },
  }
}
</script>
<style type="text/css">
  .input-30{
    width: 30%;
  }
  .input-50{
    width: 50%;
  }
  .title{
    font-size: 20px;
    line-height: 32px;
  }
</style>
