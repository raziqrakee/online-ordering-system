<!-- reset-password.vue -->
<template>
  <div style="width: 100%; background-color: #D1E6FB;" class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 50%; background-color: #D1E6FB; border:none">
      <div class="card-body">
        <div class="text-center mb-4">
          <img src="/logo.png" alt="Logo" class="img-fluid" style="max-width: 150px;">
        </div>
        <h5 class="card-title text-center mb-4">Reset Password</h5>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-button type="primary" class="w-100" style="background-color: #FE689D; border:none" @click="resetPassword">Reset Password</el-button>
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
      form: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  methods: {
    resetPassword() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const response = await this.$axios.post('http://localhost:8000/api/reset-password', this.form);
            this.$notify({
              title: 'Success',
              message: 'Temporary password sent to your email',
              type: 'success'
            });

            // Redirect to login page after a short delay
            setTimeout(() => {
              window.location.href = "login";
            }, 2000); // Delay of 2 seconds

          } catch (err) {
            this.$notify({
              title: 'Error',
              message: err.response?.data?.message || err.message,
              type: 'error'
            });
          }
        } else {
          this.$notify({
            title: 'Error',
            message: 'Please correct the errors in the form',
            type: 'error'
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
