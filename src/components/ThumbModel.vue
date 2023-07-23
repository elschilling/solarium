<template>
    <div ref="container">
        <!-- id: {{  divId }}
        model: {{  model_url }}
        params: {{ params }} -->
    </div>
</template>

<script setup>
defineEmits(['loaded'])
const props = defineProps({
    id: String,
    model_url: String,
    params: {
        type: Object,
    }
})

import { onMounted, watch, ref } from "vue";
import { World } from '../sunposition/World/World'

// const divId = ref()
const container = ref()
const loaded = false
onMounted(async () => {
    console.log(props)
    // divId.value = 'solarium' + props.id

    const fullModelUrl = 'https://pyrmkwnzcqmldlwpaple.supabase.co/storage/v1/object/public/solarium/' + props.model_url
    await main(fullModelUrl, props.params).catch((err) => {
        console.log(err)
    })
    console.log('loaded')
    
    // emit('loaded', 'val')
})


// watch(() => props.model_url, (model_url) => {
//     console.log("Watch:", model_url)
//     main('https://pyrmkwnzcqmldlwpaple.supabase.co/storage/v1/object/public/solarium/' + model_url, props.params).catch((err) => {
//         console.log(err)
//     })
// })

async function main(model, params) {
    const cont = document.getElementById(props.id)
    // console.log('cont', cont)
  // Get a reference to the container element
//   const divSelector = '#' + divId.value
//   console.log(divSelector)
//   console.log('cccc',container.value)

  // 1. Create an instance of the World app
  const world = new World(container.value, params)

  // Complete async tasks
  await world.init(model)
    console.log('loaded model', props.id)
  // 2. Render the scene
  world.resize()
  world.start()
}
</script>

<style>
#scene-container {
    width: 200px;
    height: 200px;
}

</style>