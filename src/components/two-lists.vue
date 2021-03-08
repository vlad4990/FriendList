<template>
  <div class="relative bg-opacity-90 bg-white border-0 rounded-3xl p-4 overflow-hidden shadow-2xl font-sans"
       style="width: 672px; height: 646px; min-width: 672px; min-height: 646px;"
  >

    <div class="flex flex-wrap h-full">

    <!-- COLUMN 1     -->
      <div class="w-1/2 h-full">
        <div class="mr-2 h-full bg-gray-50 bg-opacity-80 relative rounded-xl overflow-hidden shadow">

          <h3 class="uppercase font-semibold pt-2 pb-2 text-center ">Friend List</h3>

        <!-- DRAG&DROP CONTAINER 1     -->
          <draggable class="flex flex-col list-group bg-gray-100 overflow-scroll"  style="max-height: 34rem; min-height: 34rem" :list="facebookFriends.data" group="people" @change="log">
            <div
              class="p-2 ml-2 mr-2 mt-1 mb-1 bg-white border-none rounded-xl flex cursor-move shadow"
              v-for="(element, index) in facebookFriends.data"
              :key="element.name"
            >
              <img class="rounded-full border-2" :src='element.picture.data.url'>
              <p class="align-middle mt-auto mb-auto ml-2">{{ element.name }}</p>
            </div>
          </draggable>

        <!-- BUTTON FACEBOOK    -->
          <div class="absolute bottom-0 flex justify-center w-full bg-gray-50 bg-opacity-80" v-show=!isConnected>
            <div class="ml-auto mr-auto mt-4 mb-4">
              <facebook-login class="btn"
                              appId="239375757858079"
                              loginLabel="login in"
                              @login="onLogin"
                              @sdk-loaded="sdkLoaded">
              </facebook-login>
            </div>
          </div>

        </div>
      </div>


    <!-- COLUMN 2     -->
      <div class="w-1/2 h-full">
        <div class="ml-2 h-full bg-gray-50 bg-opacity-80 relative rounded-xl shadow overflow-hidden">

          <p class="uppercase font-semibold pt-2 pb-2 text-center">Selected friends</p>

        <!-- DRAG&DROP CONTAINER 1     -->
          <draggable class="flex flex-col list-group bg-gray-100 overflow-scroll" style="max-height: 500px; min-height: 500px" :list="selectedFriends" group="people" @change="log">
            <div
              class="p-2 ml-2 mr-2 mt-1 mb-1 bg-white border-none rounded-xl flex cursor-move shadow"
              v-for="(element, index) in selectedFriends"
              :key="element.name"
            >
              <img class="rounded-full border-2" :src='element.picture.data.url'>
              <p class="align-middle mt-auto mb-auto ml-2">{{ element.name }}</p>
            </div>
          </draggable>

        <!-- BUTTON EXPORT    -->
          <div class="absolute bottom-0 flex justify-center w-full bg-gray-50 bg-opacity-80">
            <div class="ml-auto mr-auto mt-4 mb-4">
              <button @click="onExport" class="w-56 bg-blue-400 border-none rounded-xl p-1 mt-px mb-px leading-8 text-white hover:bg-blue-500 hover:text-blue-100 shadow">
                export to console
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>

import draggable from "vuedraggable";
import facebookLogin from 'facebook-login-vuejs'

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
    facebookLogin,
  },
  data() {
    return {
      facebookFriends: {},
      selectedFriends: [],
      isConnected: false,
    };
  },
  methods: {

/* drag and drop
===================*/

    log: function(evt) {
      window.console.log("Change:", evt);
    },

/*Facebook API
===================*/

    getUserData() {
      this.FB.api('/me/friends', 'GET', { fields: 'id,name,picture' },
        userInformation => {
          this.facebookFriends = userInformation;
          console.log("data from FaceBook",userInformation);
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },

/*Export
===================*/

    onExport() {
      console.log(this.selectedFriends);
    },

  },
};
</script>

<style>
.btn button[data-v-0af1f3c3]{
  border: none;
  border-radius: 0.75rem;
  padding: 0.25rem;
}

.btn button[data-v-0af1f3c3]:hover{
  background-image: linear-gradient(#3258bf, #2c4dab);
}

.btn .spinner[data-v-0af1f3c3]{
  display: none;
}

</style>
