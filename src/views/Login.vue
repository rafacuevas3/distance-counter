<template>
    <v-row>
        <v-col cols="12" md="6" class="mx-auto">
            <v-card class="elevation-6">
                <v-card-title>Inicio</v-card-title>

                <v-card-text>
                    <v-text-field label="Usuario" type="text" v-model="username" name="username" :class="{ 'is-invalid': submitted && !username }"></v-text-field>
                    
                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>

                    <v-text-field label="Contraseña" type="password" v-model="password" name="password" :class="{ 'is-invalid': submitted && !password }"></v-text-field>
                    
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="blue" @click="send" :disabled="status.loggingIn">Entrar</v-btn>
                    
                    <v-btn color="white" to="/register">Registro</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        
        send() {
            this.submitted = true;
            
            const { username, password } = this;
            
            if (username && password) {
                this.login({ username, password })
            }
        }
    }
};
</script>