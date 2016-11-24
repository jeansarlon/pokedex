<script>
export default {
   name: 'pokemon',
   data () {
      return {
         cards: {},
         input: '',
         picked: 'Name',
         link: null,
         nextLink: '',
         prevLink: '',
         lastLink: '',
         firstLink: '',
         empty: false,
      }
   },
   methods: {
      submitForm: function () {
         this.cards = {}
         let that = this;
         if (this.picked == 'Name') {
            this.$http.get(`https://api.pokemontcg.io/v1/cards/?page=1&pageSize=10&name=${this.input}`)
            .then(res => {
               if (res.data.cards.length === 0) {
                  that.empty = true
                  return
               }
               that.empty = false
               that.cards = res.data.cards
               that.link = res.headers.link.split(',')
               that.clearLinks()
               that.link.forEach(this.logArrayElements)
            })
         } else{
            this.$http.get(`https://api.pokemontcg.io/v1/cards/${this.input}`)
            .then(res => {
               that.cards = res.data
               that.clearLinks()
            })
         }
      },
      logArrayElements: function(element, index, array) {
         if(element.indexOf('rel="next"') != -1){
            this.nextLink= element
         } else if(element.indexOf('rel="prev"') != -1){
            this.prevLink= element
         } else if(element.indexOf('rel="last"') != -1){
            this.lastLink= element
         } else if(element.indexOf('rel="first"') != -1){
            this.firstLink= element
         }
      },
      clearString: function(string) {
         if (string) {
            string = string.replace(/[\<\>\;]+|rel="first"+|rel="prev"+|rel="last"+|rel="next"/g, '')
            return string
         }
      },
      clearLinks: function() {
         this.nextLink = false
         this.prevLink = false
         this.lastLink = false
         this.firstLink = false
      },
      nav: function (href){
         if (href) {
            this.cards = {}
            let that = this
            this.$http.get(href)
            .then(res => {
               that.cards = res.data.cards
               that.link = res.headers.link.split(',')
               this.clearLinks()
               that.link.forEach(this.logArrayElements)
            })
         }
      },
   },
   watch: {
      picked: function () {
         this.input = ''
      },

      nextLink: function() {
         this.nextLink = this.clearString(this.nextLink)
      },

      prevLink: function() {
         this.prevLink = this.clearString(this.prevLink)
      },

      lastLink: function() {
         this.lastLink = this.clearString(this.lastLink)
      },

      firstLink: function() {
         this.firstLink = this.clearString(this.firstLink)
      }
  }
}
</script>


<template>
   <div>
      <div class="row">
         <form class="col s12" v-on:submit.prevent="submitForm()">
            <div class="row">
               <div class="input-field col s6">
                  <input type="radio" id="name" value="Name" v-model="picked">
                  <label for="name">Name</label>
               </div>
               <div class="input-field col s6">
                  <input type="radio" id="pkid" value="pokemonID" v-model="picked">
                  <label for="pkid">ID</label>
               </div>
            </div>
            <div class="row">
               <div class="input-field col s12 m8">
                  <input id="search" v-model="input" type="text" name="input" value="">
                  <label for="search">Search by: {{picked}}</label>
               </div>
               <div class="input-field col s12 m4 right-align">
                  <a class="nav btn" v-bind:class="{ show: prevLink}" v-on:click="nav(prevLink)">prev</a>
                  <a class="nav btn" v-bind:class="{ show: nextLink}" v-on:click="nav(nextLink)">next</a>
               </div>
            </div>
         </form>
      </div>
      <ul class="row">
         <li class="col s12 m3 l2 center-align" v-for="card in cards" :data-id="card.id">
            <img class="responsive-img z-depth-2" v-lazy="card.imageUrl" alt="">
         </li>
      </ul>
      <h1 v-show="empty">Não veio nada</h1>
   </div>
</template>
<style scope>
   img{
      max-height: 239px;
   }
   .nav{
      cursor: pointer;
      /*opacity: 0;*/
      /*visibility: hidden;*/
      transition: all .3s ease;
   }
   .show{
      opacity: 1;
      visibility: visible;
      transition: all .3s ease;
   }
</style>
