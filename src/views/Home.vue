<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-card>
                <v-card-title class="primary--text justify-center">Balance general</v-card-title>

                <v-divider></v-divider>
                
                <v-card-actions>
                    <v-btn to="/balance-general" color="primary" text><v-icon small left>mdi-plus</v-icon> Nuevo</v-btn>
                </v-card-actions>

                <v-text-field v-model="search.balance" label="Buscar" dense class="mr-3 ml-3"></v-text-field>
                
                <v-data-table :items="account.user.balances" :headers="headers.balances" :search="search.balance" dense>
                    <template v-slot:item.fecha="{ item }">{{ item.fecha | date }}</template>
                    <template v-slot:item.conceptos="{ item }">{{ item.conceptos.filter(c => c.concepto.trim().length > 0).length }}</template>
                </v-data-table>
            </v-card>
        </v-col>
        <v-col cols="12" md="4">
            <v-card>
                <v-card-title class="primary--text justify-center">Rayado diario</v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn to="/rayado-diario" color="primary" text><v-icon small left>mdi-plus</v-icon> Nuevo</v-btn>
                </v-card-actions>

                <v-text-field v-model="search.rayado" label="Buscar" dense class="mr-3 ml-3"></v-text-field>
                
                <v-data-table :items="account.user.rayados" :headers="headers.rayados" :search="search.rayado" dense>
                    <template v-slot:item.fecha="{ item }">{{ item.fecha | date }}</template>
                    <template v-slot:item.conceptos="{ item }">{{ item.conceptos.filter(c => c.concepto.trim().length > 0).length }}</template>
                </v-data-table>
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
    data: () => ({
        search: {
            balance: '',
            rayado: '',
        },
        headers: {
            balances: [
                { text: 'Fecha', value: 'fecha' },
                { text: 'Compañia', value: 'company' },
                { text: '# Conceptos', value: 'conceptos' },
            ],
            rayados: [
                { text: 'Fecha', value: 'fecha' },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Tema', value: 'tema' },
                { text: '# Conceptos', value: 'conceptos' },
            ],
        }
    }),

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