<template>
  <div >
    <TheHeaderNav></TheHeaderNav>
    <div class="weather-container">
      <RouterView/>
    </div>
    
  </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue'
import Zodiac from './components/Zodiac.vue';
</script>

<style>
.weather-container {
    --gradient-start: #ff94f1;
    --gradient-end: #8ffff8;
    background: linear-gradient(96deg, var(--gradient-start), var(--gradient-end));
    background-size: 200% 200%;
    animation: gradientAnimation 30s ease infinite;
    min-height: 100vh;
    padding-top : 20px;
    padding-bottom : 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
