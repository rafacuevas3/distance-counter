<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-card>
                <v-card-title class="primary--text justify-center">Balance general</v-card-title>

                <v-divider></v-divider>
                
                <v-card-actions>
                    <v-btn to="/balance-general" color="primary" text><v-icon small left>mdi-plus</v-icon> Nuevo</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" md="4">
            <v-card>
                <v-card-title class="primary--text justify-center">Rayado diario</v-card-title>

                <v-divider></v-divider>
                
                <v-card-actions>
                    <v-btn to="/rayado-diario" color="primary" text><v-icon small left>mdi-plus</v-icon> Nuevo</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" md="4">
            <v-card>
                <v-card-title class="primary--text justify-center">Base de cuentas T</v-card-title>

                <v-divider></v-divider>
                
                <v-card-actions>
                    <v-btn to="/base-cuentas-t" color="primary" text><v-icon small left>mdi-plus</v-icon> Nuevo</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    }
};
</script>