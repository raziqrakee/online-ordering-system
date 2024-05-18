<!-- LoginPage.vue -->
<template>
    <div style="width: 100%; background-color: #D1E6FB;" class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style="width: 50%; background-color: #D1E6FB; border:none">
        <div class="card-body">
          <div class="text-center mb-4">
            <img src="~/static/logo.png" alt="Logo" class="img-fluid" style="max-width: 150px;">
          </div>
          <h5 class="card-title text-center mb-4">Login to your Account</h5>
          <el-form>
            <el-form-item>
              <el-input v-model="form.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password" type="password" placeholder="Password" show-password></el-input>
            </el-form-item>
            <div class="d-flex justify-content-between mb-3">
              <el-checkbox v-model="form.rememberMe">Remember me</el-checkbox>
              <el-link type="primary" @click="redirect('reset-password')">Forgot password?</el-link>
            </div>
            <el-button type="primary" class="w-100" style="background-color: #FE689D; border:none"  @click="login()">Login</el-button>
          </el-form>
          <div class="text-center mt-3">
            <span>Don't have an account?</span>
            <span class="text-secondary" @click="redirect('register')">Sign up!</span>
          </div>
          <div class="text-center mt-3">
            <span style="color: #909399;">or Sign in with Email</span>
          </div>
          <div class="text-center mt-3">
            <el-button type="primary" class="w-100">Continue with Google</el-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "login",
    data() {
      return {
        form : {
            email: '',
            password: '',
            rememberMe: false,
        }
      }
    },
    methods: {
      async login() {
        try{
            alert("calling function login")
            const response = await this.$axios.post('http://localhost:8000/api/login', this.form)
            console.log('response', response.data)
            const _role = response.data.role
            this.$cookies.set('token', response.data.token)
            this.$cookies.set('id', response.data.id)
            this.$cookies.set('role', response.data.role)

            if(_role == "admin") this.$router.push('admin-dashboard')
            if(_role == "user") this.$router.push("/")

            this.$notify({
                title: 'Success',
                message: 'Successfully logged in.',
                type: 'success'
            });
        }catch(err){
            this.$notify({
                title: 'Error',
                message: err,
                type: 'error'
            });
        }
      },
      redirect(value){
        window.location.href = value
      }
    },
  }
  </script>
  
  <style>
  </style>