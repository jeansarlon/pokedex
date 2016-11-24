<script>
   import Pokemon from './modules/pokemon/pokemon.vue'
   export default {
      components: {
         Pokemon
      },
      name: 'app',
      data () {
         return {
         }
      }
   }
</script>

<template>
   <div class="container">
      <pokemon></pokemon>
   </div>
</template>
