<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Nuevo balance general

                    <v-spacer></v-spacer>
                    
                    {{ balance.fecha | date }}

                    <v-divider vertical class="ml-3 mr-3"></v-divider>

                    <v-btn color="success" @click="save" depressed class="ml-3"><v-icon small left>mdi-upload</v-icon> Guardar</v-btn>
                    <v-btn @click="$router.push({ path: '/' })" depressed class="ml-3"><v-icon small left>mdi-close</v-icon> Cancelar</v-btn>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="balance.company" name="company" label="Compañia"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="balance.tema" name="fecha" label="Balance general del ejercicio al:"></v-text-field>
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
                          <tr v-for="(concepto, i) in balance.conceptos" :key="i">
                              <td>
                                  <v-text-field v-model="concepto.concepto" placeholder="Concepto" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.importeA" placeholder="$ 0.00" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.importeB" placeholder="$ 0.00" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.importeC" placeholder="$ 0.00" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.importeD" placeholder="$ 0.00" dense hide-details></v-text-field>
                              </td>
                          </tr>
                      </tbody>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script type="text/javascript">
    import { mapState, mapActions } from 'vuex'
    import moment from 'moment'

    export default {
        data: () => ({
            balance: {
                fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
                company: '',
                conceptos: [],
            }
        }),

        computed: {
            ...mapState('account', ['user']),
        },

        methods: {
            ...mapActions('account', ['registerBalance']),

            save() {
                this.registerBalance({
                    user: this.user,
                    balance: {
                        id_user: this.user.id,

                        ...this.balance
                    },
                })
            },
        },

        mounted() {
            for (var i = 0; i < 15; i++) {
                this.balance.conceptos.push({
                    id: i,
                    concepto: '',
                    importeA: '',
                    importeB: '',
                    importeC: '',
                    importeD: '',
                })
            }
        }
    }
</script>