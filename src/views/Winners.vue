<template>
<div>
    <div class="wrapper">
        <p>Here is the Hall of Fame according to you.</p>
        <p v-show="votes.length === 0">You have no winners.</p>
        <div class="winners">
            <div class="winnee" v-for="item in votes" :key="item.key">
                <div class="info">
                    <img v-bind:src="item.url" alt="">
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
  name: 'Winners',
  computed: {
    votes() {
      return this.$root.$data.votes;
    }
  }
}
</script>

<style scoped>
.winners{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

img{
    width: 20rem;
}
</style>