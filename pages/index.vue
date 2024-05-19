<template>
  <div>
    <el-menu style="background-color: #F390C7; color: #fff;" class="el-menu-demo d-flex justify-content-around align-items-center" mode="horizontal" @select="handleSelect">
        <div class="d-flex">
          <el-menu-item index="4" style="color: #fff;">ORDER NOW</el-menu-item>
        </div>
        <div class="d-flex">
          <el-menu-item index="all" style="color: #fff;"><a href="./" style="text-decoration: none; color: #fff;">Home</a></el-menu-item>
          <el-menu-item index="1" style="color: #fff;" @click="$router.push('/')">News</el-menu-item>
          <el-menu-item index="1" style="color: #fff;">Menu</el-menu-item>
          <el-menu-item index="3" style="color: #fff;">Order</el-menu-item>
          <el-menu-item index="4" style="color: #fff;">Reservation</el-menu-item>
        </div>
        <div class="d-flex">
          <el-submenu index="2">
            <template slot="title">
              <i style="color: #fff;" class="el-icon-user-solid"></i>
            </template>
            <el-menu-item index="2-1" @click="$router.push('edit-profile')">Edit Profile</el-menu-item>
            <el-menu-item index="2-1">Cart</el-menu-item>
            <el-menu-item index="2-1" @click="logout()">Logout</el-menu-item>
          </el-submenu>
        </div>
    </el-menu>
    <!-- HEADER -->
    <div style="min-height: 60vh; background-color: #D1E6FB;">
      <div class="row align-items-center">
        <div class="col-6 p-4">
          <div class="ps-4" style="font-size: 34px; color: #fff; margin: 0px; padding-bottom: 0px;">Danish Ice</div>
          <div class="ps-4" style="font-size: 34px; color: #fff; margin: 0px; padding-bottom: 0px;">Cream Cafe</div>
          <div class="ps-4" style="color:#fff">Embrace the Flavours of the Future with Danish Ice Cream Cafe, We Serve Gen Z's Palate with Modern Taste Sensations!</div>
        </div>
        <div class="col-6 text-center mt-4">
          <img src="~/static/logo.png" style="width: 300px;" />
        </div>
      </div>
    </div>
    <!-- PRODUCT -->
    <div style="padding: 50px;">
      <div class="mb-3">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        class="menu"
      >
        <el-menu-item index="all">All</el-menu-item>
        <el-menu-item index="dessert">Dessert</el-menu-item>
        <el-menu-item index="korean">Korean</el-menu-item>
        <el-menu-item index="snacks">Snacks</el-menu-item>
        <el-menu-item index="beverages">Beverages</el-menu-item>
      </el-menu>
      </div>

      <div class="filters mb-3">
        <el-select v-model="selectedFilter" placeholder="Filters">
          <el-option
            v-for="filter in filters"
            :key="filter.value"
            :label="filter.label"
            :value="filter.value"
          ></el-option>
        </el-select>
      </div>

      <div class="row">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="col-md-3 mb-4"
        >
          <div class="card">
            <img style="max-height: 300px; min-height: 300px; object-fit: cover;" :src="item.imageUrl" class="card-img-top" :alt="item.name" />
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">RM{{ item.price.toFixed(2) }}</p>
              <el-button type="primary" @click="addToCart(item)">
                Add to Cart
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <el-button type="primary" @click="loadMore">Load more...</el-button>
      </div>
    </div>
    <!-- NEWS -->
    <div class="p-4" style="min-height: 60vh; background-color: #D1E6FB;">
      <h3>News</h3>
      <div class="d-flex align-items-center justify-content-center">
        <div class="me-4">
          <div class="fw-bold">Danish Ice Cream | Promosi Aidiladha</div>
          <div style="width:500px">Quis hendrerit nibh mauris sed faucibus. Quis hendrerit nibh mauris sed faucibus is sed faucibus.</div>
          <img src="~/static/news1.jpeg" width="500" />
        </div>
        <div class="ms-4">
          <div class="mb-4">
            <img src="~/static/news2.jpeg" width="246" />
          </div>
          <div>
            <img src="~/static/news3.jpeg" width="246" />
          </div>
        </div>
      </div>
    </div>
    <!-- CONTACT FORM -->
    <div>
      <div class="row justify-content-center p-4" style="background-color: #F7F8FA">
        <div class="col-md-8">
          <div class="card" style="border:none;background-color: #F7F8FA">
            <div class="card-body">
              <h5 class="card-title">Are you interested in catering services?</h5>
              <p class="card-text mb-4">Fill this form and we will contact you next 48 hours.</p>
              <el-form ref="form" :model="form" label-position="top">
                <div class="d-flex">
                  <el-form-item style="width: 50%; margin-right: 10px;"  label="Your Name" prop="name" :rules="[{ required: true, message: 'Please enter your name' }]">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 50%; margin-left: 10px;"  label="Your e-mail" prop="email" :rules="[{ required: true, message: 'Please enter your email', type: 'email' }]">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="Your message" prop="message">
                  <el-input v-model="form.message" type="textarea" rows="4"></el-input>
                </el-form-item>
                <div class="text-center">
                  <el-button type="primary" @click="submitForm('form')">Send</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
    <div class="row p-4 align-items-center"style="background-color: #F390C7; height: 50vh;">
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
          <div class=" mb-4 fw-bold p-0 ms-0">User Link</div>
          <div>Home</div>
          <div>About</div>
          <div>Menu</div>
          <div>Reservation</div>
          <div>Contact</div>
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
        message: ''
      },
      activeIndex: 'all',
      selectedFilter: '',
      filters: [
        { value: '', label: 'All' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'glutenFree', label: 'Gluten-Free' },
      ],
      items: [
        {
          id: 1,
          name: 'Chocolate',
          price: 5.0,
          imageUrl: 'ice-cream.jpeg',
          category: 'dessert',
          filters: ['vegetarian']
        },
        {
          id: 2,
          name: 'Ice Americano',
          price: 8.0,
          imageUrl: 'americano.jpeg',
          category: 'beverages',
          filters: ['vegan', 'glutenFree']
        },
        {
          id: 3,
          name: 'Strawberry',
          price: 8.0,
          imageUrl: 'ice-cream2.jpeg',
          category: 'dessert',
          filters: ['vegetarian', 'glutenFree']
        },
        {
          id: 4,
          name: 'Milo Ais',
          price: 4.0,
          imageUrl: 'milo.jpeg',
          category: 'beverages',
          filters: ['vegetarian', 'glutenFree']
        },
        {
          id: 5,
          name: 'French Fries',
          price: 7.0,
          imageUrl: 'fries.jpeg',
          category: 'snacks',
          filters: ['vegetarian']
        },
        {
          id: 6,
          name: 'Kacang Ais ABC',
          price: 5.0,
          imageUrl: 'ice-kacang.png',
          category: 'dessert',
          filters: ['vegan', 'glutenFree']
        },
        {
          id: 7,
          name: 'Samyang Ramen',
          price: 7.0,
          imageUrl: 'noodles.png',
          category: 'korean',
          filters: ['vegetarian']
        },
        // Add more items as needed
      ],
      itemsPerPage: 9,
      currentPage: 1,
    }
  },
  computed: {
    filteredItems() {
      let filtered = this.items
      if (this.activeIndex !== 'all') {
        filtered = filtered.filter(
          (item) => item.category === this.activeIndex
        )
      }
      if (this.selectedFilter) {
        filtered = filtered.filter(
          (item) => item.filters.includes(this.selectedFilter)
        )
      }
      return filtered.slice(0, this.currentPage * this.itemsPerPage)
    },
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
    },
    addToCart(item) {
      // Add your cart logic here
      console.log('Added to cart:', item)
    },
    loadMore() {
      this.currentPage++
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // Handle form submission logic here
          console.log('Form data:', this.form)
          // Reset form after successful submission
          this.$refs[formName].resetFields()
        } else {
          console.log('Error submitting form')
          return false
        }
      })
    },
    logout(){
        this.$cookies.remove("token")
        // this.$router.push("/login")
        window.location.href = "login"
    }

  },
}
</script>

<style>
.menu {
  border-bottom: 1px solid #e6e6e6;
}
.el-submenu__icon-arrow {
    display: none !important;
}
</style>
