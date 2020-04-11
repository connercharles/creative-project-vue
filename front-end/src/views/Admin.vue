<template>
<div>
    <div class="wrapper">
        <p>Here is the Hall of Fame according to you.</p>
        <p v-show="votes.length === 0">You have no winners.</p>
        <div class="winners">
            <div class="winnee" v-for="item in votes" :key="item._id">
                <div class="info">
                    <img v-bind:src="item.url" alt="">
                    <br>
                    <input v-model="item.name">
                    <button class="save" @click="editItem(item)">Save</button>
                    <button class="delete" @click="deleteItem(item)">Delete</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',
  data() {
      return {
          votes: [],
      }
  },
  created() {
      this.getVotes();
  },
  methods: {
    async getVotes() {
        try {
            let response = await axios.get("/api/winners");
            this.votes = response.data.items;
            return true;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteItem(item) {
        try {
            await axios.delete("/api/winners/" + item._id);
            this.getVotes();
            return true;
        } catch (error) {
            console.log(error);
        }
    },
    async editItem(item) {
        try {
            await axios.put("/api/winners/" + item._id, item);
        return true;
        } catch (error) {
            console.log(error);
        }
    },
  }
}
</script>

<style scoped>
.winners{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); /* see notes below */
    grid-gap: 1em;
}

img{
    width: 20rem;
}

button{
    margin: 0.3rem;
    border-radius: 5px;
    border: none;
}

.save{
    background-color: green;
}

.delete{
    background-color: red;
}

input{
    width: 10rem;
}

</style>