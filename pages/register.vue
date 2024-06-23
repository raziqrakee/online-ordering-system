<!-- LoginPage.vue -->
<template>
  <div style="width: 100%; background-color: #D1E6FB;" class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 50%; background-color: #D1E6FB; border:none">
      <div class="card-body">
        <div class="text-center mb-4">
          <img src="logo.ico" alt="Logo" class="img-fluid" style="max-width: 150px;">
        </div>
        <h5 class="card-title text-center">Sign Up</h5>
        <div class="card-title text-center mb-4" style="color: #909399;">Create your account now</div>
        <el-form>
          <el-form-item>
            <el-input v-model="form.name" placeholder="Full Name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.contact_number" placeholder="Phone Number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password"  type="password" placeholder="New Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.confirm_password" type="password" placeholder="Confirm Password" show-password></el-input>
          </el-form-item>
          <div class="text-center">
            <el-button type="primary" style="background-color: #FE689D; border:none; width:50%" @click="register()">Sign Up</el-button>
          </div>
        </el-form>
        <div class="text-left mt-3">
          <a class="text-secondary"><i class="el-icon-back" @click="goBack()"></i>Back</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        contact_number : '',
        confirm_password : '',
        rememberMe: false,
        role: 'user',
      }
    }
  },
  methods: {
    async register(){
      try{
        const payload = this.form
        delete payload.confirm_password
        delete payload.rememberMe

        const response = await this.$axios.post("http://localhost:8000/api/register", this.form)

        this.$notify({
          title: 'Success',
          message: 'Successfully registered',
          type: 'success'
        });
        window.location.href = "login"
      }catch(err){
        this.$notify({
          title: 'Error',
          message: err.response.data.message || 'An error occurred',
          type: 'error'
        });
      }
    },
    goBack(){
      window.location.href = "login"
    },
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
