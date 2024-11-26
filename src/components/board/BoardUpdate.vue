<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board'
import { useBoardImageStore } from '@/stores/boardImage'
import BoardImageUploader from '@/components/board/BoardImageUploader.vue'

const boardStore = useBoardStore()
const boardImageStore = useBoardImageStore();
const router = useRouter()

const images = ref([]);

const modifyBoard = async function () {
  try {
    if (images.value.length > 0) {
      await boardImageStore.uploadBoardImage(boardStore.board.id, images.value);
      alert('이미지 업로드 성공');
    }
    await boardStore.modifyBoard(boardStore.board.id);
    router.push(`/board/${boardStore.board.id}`);
  } catch (error) {
    console.error('게시글 수정 또는 이미지 업로드 실패', error);
    alert('수정 또는 이미지 업로드에 실패했습니다');
  }
};

const backButton = function () {
    router.go(-1);
}

const removeImage = function (imageId) {
  boardImageStore.removeBoardImage(boardStore.board.id, imageId);
};

onMounted(() => {
  boardImageStore.getBoardImageList(boardStore.board.id);
});
</script>

<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-header custom-bg text-white text-center">
                    <h4 class="card-title m-0">게시글 수정</h4>
                </div>
                <div class="card-body">
                  <form @submit.prevent="modifyBoard">
                      <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="title" placeholder="제목" v-model="boardStore.board.title">
                          <label for="title">제목</label>
                      </div>
                      <div class="form-floating mb-3">
                          <textarea 
                              class="form-control" 
                              id="content" 
                              placeholder="내용" 
                              v-model="boardStore.board.content" 
                              style="height: 200px;"></textarea>
                          <label for="content">내용</label>
                      </div>

                      <div class="image-gallery mb-3">
                          <div
                          v-for="boardImage in boardImageStore.boardImageList"
                          :key="boardImage.id"
                          class="image-container"
                          >
                          <img
                              :src="boardImage.filePath"
                              class="img-thumbnail mb-3"
                              alt="게시글 이미지"
                          />

                          <button
                            @click="removeImage(boardImage.id)"
                            style="
                              position: absolute;
                              top: 5%;
                              right: 5%;
                              width: 20px;  /* 너비를 고정값으로 설정 */
                              height: 20px; /* 높이를 고정값으로 설정 */
                              padding: 0;
                              font-size: 20px;
                              font-weight: bold;
                              background: transparent; /* 배경 제거 */
                              border: none; /* 테두리 제거 */
                              color: red; /* 버튼 글자 색상 설정 */
                              cursor: pointer; /* 클릭 가능한 버튼 스타일 */
                            "
                          >
                            X
                          </button>

                          </div>
                      </div>

                      <div class="mb-3">
                          <BoardImageUploader :images="images" />
                      </div>

                      <div class="d-flex">
                        <button type="submit" class="btn">수정</button>
                        <button class="btn" @click="backButton">뒤로</button>
                      </div>
                  </form>
                  <br/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    min-height: 300px;
    min-width: 1000px;
    border-radius: 8px;
}
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

/* 버튼 스타일 */
button.btn {
    width: 80%;
    padding: 0.5em;
    font-size: 1rem;
    border-radius: 5px;

    border: 5px solid transparent; /* 기본적인 투명한 테두리 설정 */
    border-image: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%) 1;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;

    font-weight: bold;
}

button.btn:hover {
    transform: scale(1.1); /* hover 시 크기를 1.1배로 확장 */
}

.d-flex {
  width: 100%;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 가로 가운데 정렬 */
  justify-content: center; /* 세로 가운데 정렬 */
  gap: 10px;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  position: relative;
}

.image-container {
  position: relative;
  width: 100px; /* 일정한 크기 */
  height: 100px; /* 일정한 크기 */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>