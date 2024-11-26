<script setup>
import { onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user'

const router = useRouter();
const userStore = useUserStore();

const modifyUser = function () { 
    router.push({name: 'userUpdate'})
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 월은 0부터 시작하므로 +1
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`  // "YYYY-MM-DD" 형식
}

onMounted(() => {
    userStore.errorMessage = ''
    userStore.getUser()
})

</script>

<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center">
            <div class="card shadow-sm" style="width: 30rem; border-radius: 12px; overflow: hidden;">
                <div class="card-header custom-bg text-white text-center">
                    <h4 class="card-title m-0">INFO</h4>
                </div>
                <div class="card-body">
                    <div class="mb-4">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-center align-items-center">
                                <img
                                  v-if="userStore.loginUser.filePath"
                                  :src="userStore.loginUser.filePath"
                                  alt="Profile Image"
                                  class="img-thumbnail mb-3 profile-img"
                                />
                                <img
                                    src="@/assets/no-image-500.png"
                                    v-else
                                    class="img-thumbnail mb-3 profile-img"
                                />
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>아이디</span>
                                <strong>{{ userStore.loginUser.accountId }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>계정등급</span>
                                <strong>{{ userStore.loginUser.type }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>닉네임</span>
                                <strong>{{ userStore.loginUser.nickname }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>별자리</span>
                                <strong>{{ userStore.loginUser.zodiacSign }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>생년월일</span>
                                <strong>{{ userStore.loginUser.birthDate }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>가입일</span>
                                <strong>{{ formatDate(userStore.loginUser.createdAt) }}</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn" @click="modifyUser">회원정보 수정</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-title {
    color: #101111;
    font-weight: bold;
}

.card-header {
    font-size: 1.25rem;
    font-weight: bold;
    /* background-color: rgba(143, 255, 248, 0.6); */

    --rg-gradient-a-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-a-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    --rg-gradient-b-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-b-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    --rg-gradient-c-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-c-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    background: var(--rg-gradient-c-25);
    transition: background 0.5s ease-in-out; /* 배경색 전환 시 부드럽게 변화하도록 설정 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자를 추가하여 깊이감 부여 */
    display: flex;
    align-items: center;
    justify-content: space-between; /* 좌우 정렬을 통해 로고와 메뉴가 양쪽 끝에 위치하도록 */
    padding: 1rem; /* 적절한 여백 추가 */
    margin: 0px;
    border-radius: 3%;
    position: sticky; /* 스크롤 시 상단에 고정 */
    top: 0;
    z-index: 1000; /* 다른 요소들 위에 배치 */
    height: 50px; /* 고정된 높이 설정 */
    opacity: 0.9; /* 불투명도를 약간 줄여 배경이 살짝 보이게 */
}

.list-group-item {
    font-size: 1rem;
}

/* 프로필 이미지 스타일 */
.profile-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%; /* 이미지 둥글게 */
    border: 3px solid #ddd; /* 테두리 추가 */
}

/* 가입일의 날짜 형식 */
strong {
    font-weight: 600;
}

.list-group-item span {
    font-weight: 500;
}

/* 버튼 스타일 */
button {
    width: 200px;
    padding: 0.5em;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 1.5em;

    border: 5px solid transparent; /* 기본적인 투명한 테두리 설정 */
    border-image: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%) 1;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;

    font-weight: bold;
}

button:hover {
    transform: scale(1.1); /* hover 시 크기를 1.1배로 확장 */
}
</style>