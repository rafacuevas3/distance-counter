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
                
                <v-data-table :items="account.user.balances" :headers="headers.balances" :search="search.balance" dense @click:row="showBalance">
                    <template v-slot:item.fecha="{ item }">{{ item.fecha | date }}</template>
                    <template v-slot:item.conceptos="{ item }">{{ item.conceptos.filter(c => c.concepto.trim().length > 0).length }}</template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn icon small @click="deleteBalance({ userId: item.id_user, itemId: item.id })"><v-icon>mdi-close</v-icon></v-btn>
                    </template>
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
                
                <v-data-table :items="account.user.rayados" :headers="headers.rayados" :search="search.rayado" dense @click:row="showRayado">
                    <template v-slot:item.fecha="{ item }">{{ item.fecha | date }}</template>
                    <template v-slot:item.conceptos="{ item }">{{ item.conceptos.filter(c => c.concepto.trim().length > 0).length }}</template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn icon small @click="deleteRayado({ userId: item.id_user, itemId: item.id })"><v-icon>mdi-close</v-icon></v-btn>
                    </template>
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

        <v-dialog v-model="dialogBalance">
            <v-card v-if="balance">
                <v-card-title>Detalle de balance</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <h3>Compañia: {{ balance.company }}</h3>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h3>Balance general del ejercicio al: {{ balance.tema }}</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h4>Fecha: {{ balance.fecha | date }}</h4>
                        </v-col>
                    </v-row>

                    <v-simple-table>
                      <thead>
                          <tr>
                              <th>CONCEPTO</th>
                              <th>Importe</th>
                              <th>Importe</th>
                              <th>Importe</th>
                              <th>Importe</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(concepto, i) in balance.conceptos.filter(c => c.concepto.length > 0)" :key="i">
                              <td>{{ concepto.concepto }}</td>
                              <td>$ {{ concepto.importeA }}</td>
                              <td>$ {{ concepto.importeB }}</td>
                              <td>$ {{ concepto.importeC }}</td>
                              <td>$ {{ concepto.importeD }}</td>
                          </tr>
                      </tbody>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogRayado">
            <v-card v-if="rayado">
                <v-card-title>Detalle de rayado</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <h3>Nombre: {{ rayado.nombre }}</h3>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h3>Tema: {{ rayado.tema }}</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h4>Fecha: {{ rayado.fecha | date }}</h4>
                        </v-col>
                    </v-row>

                    <v-simple-table>
                      <thead>
                          <tr>
                              <th>FECHA</th>
                              <th>CONCEPTO</th>
                              <th>PARCIAL</th>
                              <th>DEBE</th>
                              <th>HABER</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(concepto, i) in rayado.conceptos.filter(c => c.concepto.length > 0)" :key="i">
                              <td>{{ concepto.fecha }}</td>
                              <td>{{ concepto.concepto }}</td>
                              <td>{{ concepto.parcial }}</td>
                              <td>{{ concepto.debe }}</td>
                              <td>{{ concepto.haber }}</td>
                          </tr>
                      </tbody>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-dialog>
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
                { text: '', value: 'actions', sortable: false },
            ],
            rayados: [
                { text: 'Fecha', value: 'fecha' },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Tema', value: 'tema' },
                { text: '# Conceptos', value: 'conceptos' },
                { text: '', value: 'actions', sortable: false },
            ],
        },
        dialogBalance: false,
        dialogRayado: false,
        balance: null,
        rayado: null,
    }),

    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    methods: {
        ...mapActions('account', {
            deleteBalance: 'deleteBalance',
            deleteRayado: 'deleteRayado',
        }),
        showBalance(balance) {
            this.balance = balance
            this.dialogBalance = true
        },
        showRayado(rayado) {
            this.rayado = rayado
            this.dialogRayado = true
        },
    }
};
</script>