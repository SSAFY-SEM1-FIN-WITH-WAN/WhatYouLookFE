import {defineStore} from 'pinia'
import axios from 'axios'
import {ref} from 'vue'

export const useClothStore = defineStore('cloth',()=>{
    const clothes = ref([])


    const getClothesRecommendation = (temperature)=>{
        axios.get('http://localhost:8080/api/v1/cloth',{
            params: {temperature}
            })
            .then((response)=>{
              clothes.value = response.data.images
              console.log("clothes.value:",clothes.value)
            })
            .catch ((error)=>{
            console.log('clothes reommendation failed',error)
        });
    }
    const temperature = ref(null)
    const setTemperature = (temp) =>{
        temperature.value = temp
        // getClothesRecommendation(temp)
    }
    return {clothes,getClothesRecommendation,setTemperature,temperature}
})