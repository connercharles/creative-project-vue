<template>
  <div class="home">
    <div class="text bg-dark text-center text-white p-2 mb-3">
      <h1>Welcome to the Arena!</h1>
      <p>Below are two animals, you get to vote on who would win in a fight!</p>
    </div>

    <div id="app">
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="wrapper">
        <div class="left">
          <img v-bind:src="imageL.url">
          <button class="btn btn-primary" v-on:click="voteLeft">Winner?</button>
        </div>
        <div class="right">
          <img v-bind:src="imageR.url">
          <button class="btn btn-primary" v-on:click="voteRight">Winner?</button>
        </div>
      </div>

    </div>
  </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      loading: true,
      imageL: {
        url: '',
        name: '',
      },
      imageR: {
        url: '',
        name: '',
      },
    }
  },
  created(){
      this.loadImages();
  } ,
  methods:{
    async loadImages()
    {
        try{
            // for cat
            this.loading = true;
            axios.defaults.headers.common['x-api-key'] = "0187fafe-85e5-482e-af69-f60d5b8be06c"
            let response1 = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } )

            this.imageL.url = response1.data[0].url
            this.imageL.name = response1.data[0].id
            // console.log(response1)

            // for dog
            var config = {
              headers: {'Access-Control-Allow-Origin': '*'}
            };
            let response2 = await axios.get('https://cors-anywhere.herokuapp.com/https://dog.ceo/api/breeds/image/random', config)
            // console.log(response2)
            this.imageR.url = response2.data.message;
            // console.log(this.getID);
            this.loading = false;
        }catch(err){
            // console.log(err)
        }
    },
    voteLeft() {
      let vote = { url: this.imageL.url, name: this.imageL.name};
      // this.$root.$data.votes.push(vote);
      this.addVote(vote);
      this.loadImages();
    },
    voteRight() {
      let vote = { url: this.imageR.url, name: this.imageR.name};
      // this.$root.$data.votes.push(vote);
      this.addVote(vote);
      this.loadImages();
    },
    async addVote(vote){
      try {
        await axios.post("/api/winners", vote);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

img{
  width: 20rem;
}

button{
  margin: 1rem;
}

.left, .right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>