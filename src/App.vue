<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheProcess from "@/components/TheProcess.vue";
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/battery-charge.png" width="75" height="75" />

    <div class="wrapper">
      <HelloWorld msg="Batteries recharge" />
    </div>
  </header>

  <main>
    <TheProcess />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: start;
      margin-bottom: 1rem;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
