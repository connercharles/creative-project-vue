<template>
  <div class="more">
    <div class="text bg-dark text-center text-white p-2 mb-3">
      <p>Now this is slightly different. Instead of fighting, it will be who is more attractive.</p>
      <p>Disclaimer: This is generated by a fake person generator.</p>
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
            // for person1
            this.loading = true;
            let response1 = await axios.get('https://cors-anywhere.herokuapp.com/https://randomuser.me/api/');
            this.imageL.url = response1.data.results[0].picture.large;
            this.imageL.name = response1.data.results[0].name.first;
            // console.log(response1)

            // for person2
            let response2 = await axios.get('https://cors-anywhere.herokuapp.com/https://randomuser.me/api/');
            this.imageR.url = response2.data.results[0].picture.large;
            this.imageR.name = response1.data.results[0].name.first;
            // console.log(this.getID);
            this.loading = false;
        }catch(err){
            // console.log(err)
        }
    },
    voteLeft() {
      let vote = { url: this.imageL.url, name: this.imageL.name};
      this.addVote(vote);
      this.loadImages();
    },
    voteRight() {
      let vote = { url: this.imageR.url, name: this.imageR.name};
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