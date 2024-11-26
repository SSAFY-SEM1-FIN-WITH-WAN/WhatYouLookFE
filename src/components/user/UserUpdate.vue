<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import UserProfileUploader from '@/components/user/UserProfileUploader.vue'
import { useProfileImageStore } from '@/stores/profileImage';

const router = useRouter()
const userStore = useUserStore();
const profileUploader = useProfileImageStore();

const image = ref(null)
const fileInput = ref(null)

const modifyUser = async function () {
  try {
    if (image.value) {
      await profileUploader.updateProfileImage(image.value)
      alert('프로필 이미지 업로드 성공')
    }

    await userStore.modifyUser(userStore.loginUser)
  } catch (error) {
    console.error('회원 수정 또는 이미지 업로드 실패', error)
    alert('회원 수정에 실패했습니다.')
  }
}

const backButton = function () {
    router.go(-1);
}

const handleImageClick = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

onMounted(() => {
    userStore.errorMessage = ''
})

</script>

<template>
    <div class="container py-5">
        <div class="card shadow-sm mx-auto">
            <div class="card-header custom-bg text-white text-center">
                <h4 class="card-title">회원수정</h4>
            </div>
            <div class="card-body">
                <div v-if="userStore.errorMessage" class="alert alert-danger text-center" role="alert">
                    {{ userStore.errorMessage }}
                </div>
                <form @submit.prevent="modifyUser" class="row">
                    <!-- 프로필 이미지 (왼쪽) -->
                    <div class="col-4 text-center">
                        <img
                            :src="userStore.loginUser.filePath"
                            class="img-thumbnail mb-3 profile-img"
                            alt="프로필 이미지"
                            @click="handleImageClick"
                        />
                        <UserProfileUploader :image="image" @update:image="image = $event" />
                    </div>
                    <!-- 아이디, 비밀번호, 닉네임, 생년월일 (오른쪽) -->
                    <div class="col-8">
                        <!-- 아이디 입력 -->
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="accountId" placeholder="아이디" readonly v-model="userStore.loginUser.accountId">
                            <label for="accountId">아이디</label>
                        </div>

                        <!-- 비밀번호 입력 -->
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="password" placeholder="비밀번호" v-model="userStore.loginUser.password">
                            <label for="password">비밀번호</label>
                        </div>

                        <!-- 닉네임 입력 -->
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="nickname" placeholder="닉네임" v-model="userStore.loginUser.nickname">
                            <label for="nickname">닉네임</label>
                        </div>

                        <!-- 생년월일 입력 -->
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control" id="birthDate" placeholder="생년월일" v-model="userStore.loginUser.birthDate">
                            <label for="birthDate">생년월일</label>
                        </div>

                        <!-- 수정 버튼 -->
                        <div class="d-flex justify-content-between align-items-center">
                            <!-- 수정 버튼 -->
                            <button class="modify">수정</button>
                            <button class="back" @click="backButton">뒤로</button>
                        </div>
                    </div>
                </form>
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
    padding-top: 25px;
    margin: 0px;
    border-radius: 3%;
    position: sticky; /* 스크롤 시 상단에 고정 */
    top: 0;
    z-index: 1000; /* 다른 요소들 위에 배치 */
    height: 50px; /* 고정된 높이 설정 */
    opacity: 0.9; /* 불투명도를 약간 줄여 배경이 살짝 보이게 */
}

.custom-bg {
    background-color: rgba(143, 255, 248, 0.6);
}

.list-group-item {
    font-size: 1rem;
}

/* 프로필 이미지 스타일 */
.profile-img {
    max-width: 150px;
    height: auto;
    border: 3px solid #ddd; /* 테두리 추가 */
    cursor: pointer; /* 클릭할 수 있는 느낌을 주기 위해 커서 변경 */
}

/* 이미지 클릭 시 border 변경 */
.profile-img:hover {
    border-color: #007bff; /* 호버 시 border 색상 변경 */
}

.d-flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

/* 버튼 스타일 */
button {
    width: 45%;
    padding: 0.5em;
    font-size: 1rem;
    border-radius: 5px;

    border: 5px solid transparent; /* 기본적인 투명한 테두리 설정 */
    border-image: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%) 1;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
    background: transparent;

    font-weight: bold;
}

button:hover,
button.btn:hover {
    transform: scale(1.1); /* hover 시 크기를 1.1배로 확장 */
}

.form-floating label {
    font-size: 1rem;
    font-weight: normal;
}

/* Input 요소의 스타일 */
.form-control {
    font-size: 1rem;
}

/* 레이아웃 수정 */
.container {
    max-width: 1200px; /* 컨테이너 크기 확장 */
}

.row {
    display: flex;
    flex-wrap: nowrap; /* 요소가 줄바꿈되지 않도록 설정 */
    align-items: flex-start; /* 상단 정렬 */
    gap: 20px; /* 왼쪽 이미지와 입력 필드 사이 여백 조정 */
}

.col-4 {
    text-align: center;
    flex: 0 0 30%; /* 왼쪽 이미지 영역 크기 고정 */
}

.col-8 {
    flex: 1; /* 오른쪽 입력 필드가 남은 공간을 차지 */
    padding-left: 15px;
}

/* 버튼 블록 스타일 */
.card-body .d-flex {
    margin-top: 1.5em; /* 수정 버튼 위쪽 간격 */
    margin-bottom: 0.5em; /* 수정-뒤로 버튼 사이 간격 좁히기 */
}

</style>