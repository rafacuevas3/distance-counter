<template>
  <v-app id="inspire">
    <v-app-bar dense app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" dark></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img alt="Logo" class="shrink mr-2" contain src="/img/logo.png" transition="scale-transition" width="40"/>
        
        <h3 class="white--text">Distance Counter</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="ask = true" text small dark>
        <v-icon small left>mdi-logout</v-icon>
        Salir
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list>
        <v-subheader>Menú principal</v-subheader>

        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon small>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-item to="/balance-general">
          <v-list-item-icon>
            <v-icon small>mdi-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Balance general</v-list-item-title>
        </v-list-item>

        <v-list-item to="/rayado-diario">
          <v-list-item-icon>
            <v-icon small>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Rayado diario</v-list-item-title>
        </v-list-item>

        <v-list-item to="/base-cuentas-t">
          <v-list-item-icon>
            <v-icon small>mdi-chart-ppf</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Base de cuentas T</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>

        <router-view></router-view>
      </v-container>
    </v-main>

    <v-dialog v-model="ask" width="340">
      <v-card>
        <v-card-title class="grey--text text--darken-3 justify-center">¿Deseas cerrar la sesión?</v-card-title>

        <v-divider></v-divider>
        
        <v-card-actions>
          <v-btn @click="goToLogin" text color="red"><v-icon small left>mdi-logout</v-icon> Salir</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="ask = false" text>Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'app',
    data: () => ({ drawer: null, ask: false }),
    computed: {
      ...mapState({
        alert: state => state.alert
      })
    },
    methods: {
      ...mapActions({
        clearAlert: 'alert/clear',
        logout: 'account/logout' 
      }),
      goToLogin() {
        this.ask = false

        this.logout()
      }
    },
    watch: {
        $route() {
            // clear alert on location change
            this.clearAlert();
        }
    } 
  };
</script>