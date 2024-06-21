<template>
  <div>
    <Navbar></Navbar>
    <div class="m-4 p-4">
      <h3>Edit Profile</h3>
      <el-form style="width:50%">
        <div class="d-flex" style="width:70%;">
          <el-image
            v-if="image"
            :src="image"
            style="width: auto; height: 150px; object-fit: cover; margin-right: 20px;"
          ></el-image>
          <el-upload
            class="mb-4"
            action="your_upload_endpoint_here"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div
          class="mb-4 text-primary"
          style="text-decoration: underline; cursor: pointer; font-size: 12px;"
          @click="removeImage()"
        >
          Remove profile picture
        </div>
        <el-form-item style="width: 50%;">
          <el-input v-model="form.name" placeholder="Full Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.contact_number" placeholder="Phone Number" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="New Password" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.confirm_password" type="password" placeholder="Confirm Password" show-password></el-input>
        </el-form-item>
        <div class="d-flex">
          <el-button style="background-color: #fff; color:#000; width:50%" @click="$router.push('/')">Cancel</el-button>
          <el-button type="primary" style="background-color: #FE689D; border:none; width:50%" @click="saveProfile()">Save</el-button>
        </div>
      </el-form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { EventBus } from '~/plugins/event-bus';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        contact_number: '',
        image: '',
      },
      image: null,
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        const userId = this.$cookies.get('id');
        const token = this.$cookies.get('token');
        const response = await this.$axios(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.form = response.data;
        this.image = response.data.image_url;
      } catch (err) {
        // Handle error
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    saveProfile() {
      // Perform validation before saving
      if (!this.form.name || !this.form.email || !this.form.contact_number) {
        this.$message.error('Please fill in all fields.');
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('_method', 'put');
      formData.append('name', this.form.name);
      formData.append('email', this.form.email);
      formData.append('contact_number', this.form.contact_number);
      if (this.form.password) formData.append('password', this.form.password);
      if (this.form.password) formData.append('confirm_password', this.form.confirm_password);

      // Get uploaded image file
      const imageFile = this.$refs.upload.uploadFiles[0];
      if (imageFile) {
        formData.append('image', imageFile.raw);
      }

      const userId = this.$cookies.get('id');
      const token = this.$cookies.get('token');
      // Send the form data to your API endpoint
      this.$axios.post(`http://localhost:8000/api/user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log(response.data);
          this.$message.success('Profile saved successfully.');
          EventBus.$emit('profile-updated', response.data.image_url);
        })
        .catch((error) => {
          console.error(error);
          this.$message.error('Failed to save profile.');
        });
    },
    logout() {
      this.$cookies.remove('token');
      window.location.href = 'login';
    },
    async removeImage() {
      try {
        const userId = this.$cookies.get('id');
        const token = this.$cookies.get('token');
        const response = await this.$axios.delete(`http://localhost:8000/api/user/${userId}/remove-image`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.image = null;
        EventBus.$emit('profile-updated', null);
        window.location.reload();
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
};
</script>

<style>

</style>
