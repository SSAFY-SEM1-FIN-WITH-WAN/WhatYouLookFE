<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'
import { useBoardImageStore } from '@/stores/boardImage'
import BoardImageUploader from '@/components/board/BoardImageUploader.vue';

const router = useRouter()
const boardStore = useBoardStore()
const boardImageStore = useBoardImageStore()

const board = ref({
    title: '',
    content: '',
})

const images = ref([])

const createBoard = async function () {
    try {
        const createdBoard = await boardStore.createBoard(board.value)
        const boardId = createdBoard.id;

        if (images.value.length > 0) {
            await boardImageStore.uploadBoardImage(boardId, images.value)
        }

        router.push(`/board/${boardId}`)
    } catch (error) {
        console.log(error)
        router.push({ name: 'boardList' })
    }
}

</script>

<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-header custom-bg text-white text-center">
                    <h4 class="card-title m-0">게시글 작성</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="createBoard">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="title" placeholder="제목" v-model="board.title">
                            <label for="title">제목</label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea 
                                class="form-control" 
                                id="content" 
                                placeholder="내용" 
                                v-model="board.content" 
                                style="height: 200px;"></textarea>
                            <label for="content">내용</label>
                        </div>

                        <div class="mb-3">
                            <BoardImageUploader :images="images" />
                        </div>

                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn" style="width: 80%;">등록</button>
                        </div>
                    </form>
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