<!-- register.vue -->
<template>
  <div style="width: 100%; background-color: #D1E6FB;" class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 50%; background-color: #D1E6FB; border:none">
      <div class="card-body">
        <div class="text-center mb-4">
          <img src="logo.ico" alt="Logo" class="img-fluid" style="max-width: 150px;">
        </div>
        <h5 class="card-title text-center">Sign Up</h5>
        <div class="card-title text-center mb-4" style="color: #909399;">Create your account now</div>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="Full Name"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item prop="contact_number">
            <el-input v-model="form.contact_number" placeholder="Phone Number"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="New Password"></el-input>
          </el-form-item>
          <el-form-item prop="confirm_password">
            <el-input v-model="form.confirm_password" type="password" placeholder="Confirm Password" show-password></el-input>
          </el-form-item>
          <div class="text-center">
            <el-button type="primary" style="background-color: #FE689D; border:none; width:50%" @click="register">Sign Up</el-button>
          </div>
        </el-form>
        <div class="text-left mt-3">
          <a class="text-secondary"><i class="el-icon-back" @click="goBack"></i>Back</a>
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
        contact_number: '',
        confirm_password: '',
        rememberMe: false,
        role: 'user',
      },
      rules: {
        name: [
          { required: true, message: 'Please enter your full name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ],
        contact_number: [
          { required: true, message: 'Please enter your phone number', trigger: 'blur' },
          { pattern: /^[0-9]{10,11}$/, message: 'Phone number must be 10-11 digits', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter a password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: 'Please confirm your password', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value !== this.form.password) {
              callback(new Error('Passwords do not match'));
            } else {
              callback();
            }
          }, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const payload = { ...this.form };
            delete payload.confirm_password;
            delete payload.rememberMe;

            const response = await this.$axios.post("http://localhost:8000/api/register", payload);

            this.$notify({
              title: 'Success',
              message: 'Successfully registered',
              type: 'success'
            });

            // Redirect to login page after a short delay
            setTimeout(() => {
              window.location.href = "login";
            }, 2000); // Delay of 2 seconds

          } catch (err) {
            this.$notify({
              title: 'Error',
              message: err.response.data.message || 'An error occurred',
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
    },
    goBack() {
      window.location.href = "login";
    }
  }
}
</script>

<style>
</style>
