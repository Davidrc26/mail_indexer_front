<script lang="ts" setup>
const props = defineProps<{
    email: any
}>()
import { defineEmits } from 'vue';

const emit = defineEmits(['seeDetails']);

const emitEvent = () => {
    emit('seeDetails', props.email);
}

</script>


<template>
    <div
        class='break-inside relative overflow-hidden flex flex-col justify-between space-y-2 text-sm rounded-md max-w-[23rem] p-3 mb-2 bg-white text-black dark:bg-gray-800 dark:text-stone-300'>
        <div class='flex items-center justify-between font-medium'>
            <span class='uppercase text-xs '>{{ email._source.subject }}</span>
        </div>
        <div class='flex flex-row items-center space-x-3'>
            <div class='flex flex-none items-center justify-center w-10 h-10 rounded-full bg-red-950 text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 9.829 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664H14z" />
                </svg>
            </div>
            <span class='text-base font-medium truncate'>{{ email._source.from }}</span>
        </div>
        <div class="truncate"> {{ email._source.Body }}</div>
        <div class='flex justify-between items-center'>
            <button
                class='flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-stone-300 dark:border-stone-300 dark:hover:bg-stone-300 dark:hover:text-black'
                @click="emitEvent()">
                <span>See details</span>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'
                    stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                    <path d='M5 12h13M12 5l7 7-7 7' />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>