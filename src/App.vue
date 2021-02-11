<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img alt="Logo" class="shrink mr-2" contain src="/img/logo.png" transition="scale-transition" width="40"/>
        
        <h2>Distance Counter</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'app',
    data: () => ({ drawer: null }),
    computed: {
      ...mapState({
        alert: state => state.alert
      })
    },
    methods: {
      ...mapActions({
        clearAlert: 'alert/clear' 
      })
    },
    watch: {
        $route() {
            // clear alert on location change
            this.clearAlert();
        }
    } 
  };
</script>