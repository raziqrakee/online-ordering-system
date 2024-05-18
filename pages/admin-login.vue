<!-- LoginPage.vue -->
<template>
    <div style="width: 100%; background-color: #D1E6FB;" class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style="width: 50%; background-color: #D1E6FB; border:none">
        <div class="card-body">
          <div class="text-center mb-4">
            <img src="~/static/logo.png" alt="Logo" class="img-fluid" style="max-width: 150px;">
          </div>
          <h5 class="card-title text-center mb-4">Admin Login</h5>
          <el-form>
            <el-form-item>
              <el-input v-model="email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="password" type="password" placeholder="Password" show-password></el-input>
            </el-form-item>
            <div class="d-flex justify-content-between mb-3">
              <el-checkbox v-model="rememberMe">Remember me</el-checkbox>
            </div>
            <el-button type="primary" native-type="submit" class="w-100" style="background-color: #FE689D; border:none">Login</el-button>
          </el-form>
          <div class="text-left mt-3">
            <el-link class="text-secondary"><i class="el-icon-back"></i>Back</el-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
      }
    },
    methods: {
      handleLogin() {
        // Implement your login logic here
        console.log('Email:', this.email)
        console.log('Password:', this.password)
        console.log('Remember Me:', this.rememberMe)
      },
    },
  }
  </script>
  
  <style>
  </style>