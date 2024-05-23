<template>
  <div>
    <el-menu
      style="background-color: #F390C7; color: #fff;"
      class="el-menu-demo d-flex justify-content-around align-items-center"
      mode="horizontal"
    >
      <div class="d-flex">
        <el-menu-item index="4" style="color: #fff;">ORDER NOW</el-menu-item>
      </div>
      <div class="d-flex">
        <el-menu-item index="home" style="color: #fff;">
          <router-link to="/" style="text-decoration: none; color: #fff;">Home</router-link>
        </el-menu-item>
        <el-menu-item index="news" style="color: #fff;" @click="handleSelect('news')">News</el-menu-item>
        <el-menu-item index="menu" style="color: #fff;">
          <router-link to="/menu" style="text-decoration: none; color: #fff;">Menu</router-link>
        </el-menu-item>
        <el-menu-item index="order" style="color: #fff;">
          <router-link to="/order" style="text-decoration: none; color: #fff;">Order</router-link>
        </el-menu-item>
        <el-menu-item index="reservation" style="color: #fff;">
          <router-link to="/reservation" style="text-decoration: none; color: #fff;">Reservation</router-link>
        </el-menu-item>
      </div>
      <div class="d-flex">
        <el-submenu index="2">
          <template slot="title">
            <i style="color: #fff;" class="el-icon-user-solid"></i>
          </template>
          <el-menu-item index="2-1">
            <router-link to="/edit-profile" style="text-decoration: none; color: #000;">Edit Profile</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/cart" style="text-decoration: none; color: #000;">Cart</router-link>
          </el-menu-item>
          <el-menu-item index="2-3" @click="logout()">Logout</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
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
    <div class="row p-4 align-items-center" style="background-color: #F390C7; height: 50vh;">
      <div class="col-md-4 d-flex justify-content-center" style="color: #fff;">
        <div>
          <div class="text-center mb-4 fw-bold">Operation Hour</div>
          <div class="d-flex">
            <div style="width: 100px; text-align: right; margin-right: 20px;">Sat - Wed:</div>
            09:00am - 10:00PM
          </div>
          <div class="d-flex">
            <div style="width: 100px; text-align: right; margin-right: 20px;">Thursday:</div>
            09:00am - 11:00PM
          </div>
          <div class="d-flex">
            <div style="width: 100px; text-align: right; margin-right: 20px;">Friday:</div>
            09:00am - 8:00PM
          </div>
        </div>
      </div>
      <div class="col-md-4 d-flex justify-content-center" style="color: #fff;">
        <div>
          <div class="mb-4 fw-bold p-0 ms-0">User Link</div>
          <div @click="navigateTo('home')">Home</div>
          <div @click="navigateTo('about')">About</div>
          <div @click="navigateTo('menu')">Menu</div>
          <div>Reservation</div>
          <div @click="navigateTo('contact')">Contact</div>
        </div>
      </div>
      <div class="col-md-4 d-flex justify-content-center" style="color: #fff;">
        <div class="text-center">
          <div class=" mb-4 fw-bold p-0 ms-0">
            <img src="~/static/logo.png" width="128"></img>
          </div>
          <div>Danish Ice Cream Cafe</div>
          <div class="mb-4">danishicecreamkeningau@gmail.com</div>
          <div>Lot 2, Future city complex, Jalan Masjid, 89008 Keningau, Sabah, Malaysia</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        contact_number: '',
        image: '',
      },
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
        if (response.data.image_url.split('http://localhost:8000/')[1] !== '') this.image = response.data.image_url;
      } catch (err) {
        // Handle error
      }
    },
    handleSelect(index) {
    if (index === 'news') {
      this.$router.push({ path: '/', hash: '#news-section' });
    }
    this.activeIndex = index;
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
        })
        .catch((error) => {
          console.error(error);
          this.$message.error('Failed to save profile.');
        });
    },
    logout() {
      this.$cookies.remove('token');
      // this.$router.push("/login")
      window.location.href = 'login';
    },
    async removeImage() {
      try {
        const userId = this.$cookies.get('id');
        const token = this.$cookies.get('token');
        const response = await this.$axios.delete(`http://localhost:8000/api/user/${userId}/remove-image`);
        window.location.reload();
      } catch (err) {
        this.$message.error(err);
      }
    },
    navigateTo(section) {
      const sectionMap = {
        home: '#home-section',
        about: '#about-section',
        menu: '#menu-section',
        reservation: '#reservation-section',
        contact: '#contact-section'
      }
      const targetSection = sectionMap[section]
      if (targetSection) {
        this.$router.push({ path: '/', hash: targetSection });
      }
    }
  },
};
</script>

<style>
.menu {
  border-bottom: 1px solid #e6e6e6;
}
.el-submenu__icon-arrow {
  display: none !important;
}
</style>
