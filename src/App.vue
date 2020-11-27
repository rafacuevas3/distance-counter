<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img alt="Logo" class="shrink mr-2" contain src="/img/logo.png" transition="scale-transition" width="40"/>
                
                <h2>Distance Counter</h2>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>
        
        <v-main>
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>

            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'app',
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
            $route (){
                // clear alert on location change
                this.clearAlert();
            }
        } 
    };
</script>