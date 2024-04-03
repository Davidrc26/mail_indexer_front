<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import EmailCard from '../components/EmailCard.vue';
import apiService from '../services/ApiService';

const emails = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const searchTerm = ref('');
const selectedEmail = ref(null);



onMounted(async () => {
  getAllEmails()
});

const getAllEmails = () => {
  let data = {
    type_search: "alldocuments",
    term: "",
    from: (currentPage.value - 1) * pageSize.value,
    max_results: pageSize.value
  }
  apiService.getAllEmails(data).then(
    (res) => {
      emails.value = res.data.hits.hits;
    },
    (err) => {
      console.log(err);
    }
  );
}

const onPageChange = (type: string) => {
  if (type === 'next') {
    currentPage.value++;
  } else {
    if (currentPage.value > 1)
      currentPage.value--;
  }
  if (searchTerm.value === '')
    getAllEmails();
  else
    search();
}


const search = () => {
  if (searchTerm.value === '') {
    getAllEmails();
    return;
  }
  let data = {
    type_search: "match",
    term: searchTerm.value,
    from: (currentPage.value - 1) * pageSize.value,
    max_results: pageSize.value
  }
  apiService.getAllEmails(data).then(
    (res) => {
      emails.value = res.data.hits.hits;
    },
    (err) => {
      console.log(err);
    }
  );
}

const handleEvent = (value) => {
  selectedEmail.value = value;
}

const resetSelectedEmail = () => {
  selectedEmail.value = null;
}
</script>
<template>
  <!-- component -->
  <div class="flex flex-row w-full bg-white dark:bg-slate-300 dark:text-white ">
    <div
      class="relative flex flex-col bg-clip-border bg-white text-gray-700 h-full w-1/3 max-w-[400px] p-0 shadow-xl shadow-blue-gray-900/5 dark:bg-gray-600 dark:text-white">
      <!-- component -->

      <div class="flex rounded-md bg-gray-800 px-2 w-auto m-4">
        <button class="self-center flex p-1 cursor-pointer bg-gray-800"> <svg width="30px" height="30px"
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z"
                stroke="#450A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z"
                stroke="#450A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z"
                fill="#450A0A" />
            </g>

          </svg></button>

        <input type="text" class=" bg-[#0d1829] flex bg-transparent px-2 mr-auto text-[#cccccc] outline-0"
          v-model="searchTerm" placeholder="Search.." @keyup.enter="search()" />
        <button type="submit" class="relative p-2 bg-gray-800 rounded-full">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>

          </svg>
        </button>
      </div>

      <div class="mb-1 p-0 mx-4 mt-4">
        <h5
          class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900 dark:text-stone-400 ">
          Enron
          Mail</h5>
      </div>
      <nav class="flex flex-col gap-1 w-full p-2 font-sans text-base font-normal text-gray-700">
        <EmailCard @see-details="handleEvent" v-for="(email, index) in emails" :email="email" class="w-full"
          :key="index" />
      </nav>
      <div class="flex items-center justify-center space-x-4 my-3">
        <button @click="onPageChange('prev')"
          class="px-3 py-1 text-white bg-[#0d1829] rounded hover:bg-stone-400 hover:text-stone-950  disabled:opacity-50"
          :disabled="currentPage <= 1">Anterior</button>
        <span class="text-lg">{{ currentPage }}</span>
        <button @click="onPageChange('next')"
          class="px-3 py-1 text-white bg-[#0d1829] rounded hover:bg-stone-400 hover:text-stone-950 disabled:opacity-50">Siguiente</button>
      </div>

    </div>

    <div class="w-2/3  bg-white flex flex-col items-center dark:bg-gray-400">
      <div class="h-16 flex items-center justify-between fixed top-0 z-50 ">
        <div class="flex items-center" @click="resetSelectedEmail()">
          <a href="#"
            class="flex items-center text-gray-700 dark:border-black dark:text-black px-2 py-1 space-x-0.5 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
            title="Back">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm font-bold">Back</span>
          </a>
          <div class="flex items-center">
            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
            <div class="flex items-center space-x-2 ">
              <button title="Archive"
                class="text-gray-700 px-2 py-1 border border-gray-300 dark:border-black dark:text-black rounded-lg shadow hover:bg-gray-200 transition duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
                  </path>
                </svg>
              </button>
              <button title="Mark As Spam"
                class="text-gray-700 px-2 py-1 border dark:border-black dark:text-black border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                  </path>
                </svg>
              </button>
              <button title="Delete"
                class="text-gray-700 px-2 py-1 border dark:border-black dark:text-black border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
              </button>
            </div>
            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
            <div class="flex items-center space-x-2">
              <button title="Mark As Unread"
                class="text-gray-700 px-2 py-1 dark:border-black dark:text-black border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
              </button>
              <button title="Add Star"
                class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg dark:border-black dark:text-black shadow hover:bg-gray-200 transition duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[500px] m-auto dark:bg-gray-400" v-if="selectedEmail == null">
        <img src="../assets/img/email.png" alt="" srcset="" class="">
      </div>


      <div v-if="selectedEmail != null"
        class="flex flex-col z-100 p-5 w-full max-h-[500px]  overflow-x-hidden mb-auto mt-16 h-full dark:bg-gray-400">
        <div class="mb-6">
          <h4 class="text-lg text-gray-800 font-bold pb-2 mb-4 border-b-2 dark:border-red-950 ">{{
            selectedEmail._source.subject }}</h4>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class='flex flex-none items-center justify-center w-10 h-10 rounded-full bg-neutral-500 dark:text-black text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 9.829 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664H14z" />
                </svg>
              </div>
              <div class="flex flex-col ml-2">
                <span class="text-xs text-gray-400 dark:text-black space-y-3">From: {{ selectedEmail._source.from
                  }}</span>
                <span class="text-xs text-gray-400 dark:text-black">To: {{ selectedEmail._source.to }}</span>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-black">{{ selectedEmail._source.Date }}</span>
          </div>
          <div class="py-6 pl-2 text-gray-700">
            <p class="mt-4">{{ selectedEmail._source.Body }}</p>
          </div>
          <div class="border-t-2 dark:border-red-950 flex space-x-4 py-4">
            <div
              class="w-70 flex items-center py-2.5 px-2 border-2 border-gray-300 dark:border-red-950 rounded-lg hover:bg-gray-200 ">
              <div class="flex items-center">
                <div class="w-10 flex items-center justify-center">

                </div>
                <div class="w-48 ml-2 flex flex-col">
                  <a href="#" class="text-sm text-gray-700 font-bold truncate">{{
            selectedEmail._source["X-FileName"] ? selectedEmail._source["X-FileName"] : 'No File' }}</a>
                  <span class="text-gray-500 text-xs">1.5 MB</span>
                </div>
              </div>
              <button class="w-6 flex items-center justify-center" title="Download">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-500 hover:text-gray-600 h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
            </div>
            <!--    <div
              class="w-70 flex items-center py-2.5 px-2 border-2 border-gray-300 dark:border-red-950 rounded-lg hover:bg-gray-200">
              <div class="flex items-center">
                <div class="w-10 flex items-center justify-center">

                </div>
                <div class="w-48 ml-2 flex flex-col">
                  <a href="#" class="text-sm text-gray-700 font-bold truncate">Contract Proposal.docx</a>
                  <span class="text-gray-500 text-xs">3.1 MB</span>
                </div>
              </div>
              <button class="w-6 flex items-center justify-center" title="Download">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-500 hover:text-gray-600 h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
            </div> -->
          </div>
        </div>
      </div>

    </div>

  </div>

</template>


<style scoped>
img {
  background: transparent;
  margin: auto;
  filter: grayscale(100%);
}
</style>