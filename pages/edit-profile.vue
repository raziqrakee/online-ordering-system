<template>
  <div>
    <Navbar></Navbar>
    <!-- navigation menue end -->
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

    <!-- FOOTER -->
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar, // Register the Navbar component
    Footer, // Register the Footer component
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
        const response = await this.$axios.get(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.form = response.data;
        if (response.data.image_url.split('http://localhost:8000/')[1] !== '') this.image = response.data.image_url;
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async saveProfile() {
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
      try {
        const response = await this.$axios.post(`http://localhost:8000/api/user/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$message.success('Profile saved successfully.');
        this.image = response.data.image_url;
      } catch (error) {
        console.error('Error saving profile:', error);
        this.$message.error('Failed to save profile.');
      }
    },
    async removeImage() {
      try {
        const userId = this.$cookies.get('id');
        const token = this.$cookies.get('token');
        await this.$axios.delete(`http://localhost:8000/api/user/${userId}/remove-image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.image = null;
        this.$message.success('Profile picture removed successfully.');
      } catch (err) {
        console.error('Error removing profile picture:', err);
        this.$message.error('Failed to remove profile picture.');
      }
    },
    logout() {
      this.$cookies.remove('token');
      window.location.href = 'login';
    },
  },
};
</script>

<style>

</style>
