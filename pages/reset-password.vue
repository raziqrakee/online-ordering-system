<!-- LoginPage.vue -->
<template>
  <div style="width: 100%; background-color: #D1E6FB;" class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 50%; background-color: #D1E6FB; border:none">
      <div class="card-body">
        <div class="text-center mb-4">
          <img src="/logo.png" alt="Logo" class="img-fluid" style="max-width: 150px;">
        </div>
        <h5 class="card-title text-center mb-4">Reset Password</h5>
        <el-form>
          <el-form-item>
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-button type="primary" class="w-100" style="background-color: #FE689D; border:none"  @click="login()">Reset Password</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reset-password",
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
          const response = await this.$axios.post('http://localhost:8000/api/reset-password', this.form)
          console.log('response', response.data)
          const _role = response.data.role
          this.$cookies.set('token', response.data)
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
    redirect(){
      window.location.href = 'register'
    }
  },
}
</script>

<style>
</style>
