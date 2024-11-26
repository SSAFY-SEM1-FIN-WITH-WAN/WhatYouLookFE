<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}년 ${month}월 ${day}일`  // "YYYY-MM-DD" 형식
}

onMounted(() => {
    userStore.getUser()
    userStore.getFortune()
})

const currentDate = formatDate(new Date());
</script>

<template>
  <div class="container">
    <div class="card">

      <div class="card-header">
        <h1>{{ currentDate }}<br/>오늘의 운세</h1>
      </div>

      <div class="card-body">
        <div class="text-intro">
          <h4><span>{{ userStore.fortune.zodiacSign }}</span>를 가지고 태어난 <span>{{ userStore.loginUser.nickname }}</span>님</h4>
          <h5>오늘의 운세를 알려드리겠습니다</h5>
        </div>
        <div class="text-body">
          <h4>{{ userStore.fortune.content }}</h4>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Sacramento|Vibur&display=swap");

.container {
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Black Han Sans';
}

.card {
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.55); /* 반투명 흰색 배경 */
  backdrop-filter: blur(10px); /* 흐림 효과 */
  max-width: 600px;
  width: 100%;
}

.card-header h1 {
  font-weight: bold;
  animation: glowingText 1s infinite alternate;

  padding: 20px;
  border: 10px solid transparent; /* 기본적인 투명한 테두리 설정 */
  border-image: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%) 1;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
}

.text-intro {
  padding: 5px;
}

.text-intro h4 {
  font-weight: bold;
}

.text-intro h5 {
  font-weight: bold;
}

.text-intro h4 span {
  color: #e2601e;
  font-weight: bold;
}

.text-body {
  padding: 5px;
  margin-top: 5px;
}

.text-body h4 {
  font-weight: bold;
}

@keyframes glowingText {
  0% {
    text-shadow: 0 0 3px rgba(255, 148, 241, 0), 0 0 5px rgba(255, 148, 241, 0), 0 0 8px rgba(255, 148, 241, 0);
  }
  25% {
    text-shadow: 0 0 3px rgba(255, 148, 241, 0.25), 0 0 5px rgba(255, 148, 241, 0.25), 0 0 8px rgba(255, 148, 241, 0.25);
  }
  50% {
    text-shadow: 0 0 3px rgba(255, 148, 241, 0.5), 0 0 5px rgba(255, 148, 241, 0.5), 0 0 8px rgba(255, 148, 241, 0.5);
  }
  75% {
    text-shadow: 0 0 3px rgba(255, 148, 241, 0.75), 0 0 5px rgba(255, 148, 241, 0.75), 0 0 8px rgba(255, 148, 241, 0.75);
  }
  100% {
    text-shadow: 0 0 3px rgba(255, 148, 241, 1), 0 0 5px rgba(255, 148, 241, 1), 0 0 8px rgba(255, 148, 241, 1);
  }
}
</style>
