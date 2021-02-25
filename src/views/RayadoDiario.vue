<template>
	<v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Nuevo rayado diario

                    <v-spacer></v-spacer>
                    
                    {{ rayado.fecha | date }}

                    <v-divider vertical class="ml-3 mr-3"></v-divider>

                    <v-btn color="success" @click="save" depressed class="ml-3"><v-icon small left>mdi-upload</v-icon> Guardar</v-btn>
                    <v-btn @click="$router.push({ path: '/' })" depressed class="ml-3"><v-icon small left>mdi-close</v-icon> Cancelar</v-btn>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="rayado.nombre" name="nombre" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="rayado.tema" name="Tema" label="Tema"></v-text-field>
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
                          <tr v-for="(concepto, i) in rayado.conceptos" :key="i">
                              <td>
                                  <v-text-field v-model="concepto.fecha" placeholder="Fecha" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.concepto" placeholder="Concepto" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.parcial" placeholder="Parcial" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.debe" placeholder="Debe" dense hide-details></v-text-field>
                              </td>
                              <td>
                                  <v-text-field v-model="concepto.haber" placeholder="Haber" dense hide-details></v-text-field>
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
            rayado: {
                fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
                nombre: '',
                tema: '',
                conceptos: [],
            }
        }),

        computed: {
            ...mapState('account', ['user']),
        },

        methods: {
            ...mapActions('account', ['registerRayado']),

            save() {
                this.registerRayado({
                    user: this.user,
                    rayado: {
                        id_user: this.user.id,

                        ...this.rayado
                    },
                })
            },
        },

        mounted() {
            for (var i = 0; i < 15; i++) {
                this.rayado.conceptos.push({
                    id: i,
                    fecha: '',
                    concepto: '',
                    parcial: '',
                    debe: '',
                    haber: '',
                })
            }
        }
    }
</script>