<template>
    <div>
        <h2>Register</h2>

        <form @submit.prevent="handleSubmit">
            <v-text-field name="firstName" label="First Name" v-model="user.firstName" :class="{ 'is-invalid': submitted && errors.has('firstName') }"></v-text-field>
            <v-text-field name="lastName" label="Last Name" v-model="user.lastName" :class="{ 'is-invalid': submitted && errors.has('lastName') }"></v-text-field>
            <v-text-field name="username" label="Username" v-model="user.username" :class="{ 'is-invalid': submitted && errors.has('username') }"></v-text-field>
            <v-text-field name="password" label="Password" v-model="user.password" :class="{ 'is-invalid': submitted && errors.has('password') }"></v-text-field>
            
            <v-btn color="primary" @click="register(user)">Register</v-btn>
            
            <router-link to="/login" class="btn btn-link">Cancel</router-link>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        
        handleSubmit() {
            this.submitted = true;
            
            this.register(this.user);
        }
    }
};
</script>