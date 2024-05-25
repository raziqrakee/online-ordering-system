<template>
  <div>
    <el-menu style="background-color: #F390C7; color: #fff;" class="el-menu-demo d-flex justify-content-between align-items-center" mode="horizontal" @select="handleSelect">
        <div class="d-flex">
          <el-menu-item  class="d-flex align-items-center" index="4" style="color: #fff;">
            <h4 class="fw-bold text-white m-0">ORDER NOW</h4>
          </el-menu-item>
        </div>
        <div class="d-flex">
          <el-menu-item class="d-flex justify-items-center" index="all" style="color: #fff;">
            <a href="./" style="text-decoration: none; color: #fff;">Home</a>
          </el-menu-item>
          <el-menu-item class="d-flex align-items-center" style="color: #fff;" @click="navigateTo('news')">News</el-menu-item>
          <el-menu-item class="d-flex align-items-center" index="menu" style="color: #fff;">Menu</el-menu-item>
          <el-menu-item class="d-flex align-items-center" index="order" style="color: #fff;">Order</el-menu-item>
          <el-menu-item class="d-flex align-items-center" index="reservation" style="color: #fff;">Reservation</el-menu-item>
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
    <!-- PRODUCT -->
    <div id="menu-section" class="m-5">
      <div class="mx-5">
        <h1 class="text-2xl fw-bold mb-4 text-center">Menu</h1>
          <div class="mb-3 d-flex justify-content-between">
            <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
              class="menu w-100"
            >
              <el-menu-item index="all">All</el-menu-item>
              <el-menu-item index="dessert">Dessert</el-menu-item>
              <el-menu-item index="korean">Korean</el-menu-item>
              <el-menu-item index="snacks">Snacks</el-menu-item>
              <el-menu-item index="beverages">Beverages</el-menu-item>
            </el-menu>
            <div class="search menu">
              <el-input placeholder="Search" prefix-icon="el-icon-search" v-model="searchQuery"@input="searchItems"></el-input>
            </div>
          </div>
        
          <div class="filters mb-3 text-center">
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
              class="col-md-3 mb-5"
            >
              <div class="card shadow-sm border-0">
                <img style="max-height: 300px; min-height: 300px; object-fit: cover;" :src="item.imageUrl" class="card-img-top rounded-top" :alt="item.name" />
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text fw-bold">RM{{ item.price.toFixed(2) }}</p>
                  </div>
                  <div class="d-flex justify-content-center mt-3">
                    <button class="btn btn-primary" @click="addToCart(item)">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="text-center mt-4">
            <button class="btn btn-secondary" @click="loadMore">Load more...</button>
          </div>
        </div>
    </div>
    <!-- FOOTER -->
    <div class="row pt-5 px-5 py-4"style="background-color: #F390C7;">
        <div class="col-md-3 col-sm-6 d-flex justify-content-center text-white">
          <div>
            <h3 class="fw-bold mb-4">Operation Hour</h3>
            <p class="mb-2">Sat-Wed: 09:00am-10:00PM</p>
            <p class="mb-2">Thursday: 09:00am-11:00PM</p>
            <p class="mb-2">Friday: 09:00am-8:00PM</p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 d-flex justify-content-center text-white">
          <div>
            <h3 class="fw-bold mb-4">User Link</h3>
            <div class="mb-2" @click="navigateTo('home')">Home</div>
            <div class="mb-2" @click="navigateTo('news')">News</div>
            <div class="mb-2" @click="navigateTo('menu')">Menu</div>
            <div class="mb-2"> Reservation</div>
            <div @click="navigateTo('contact')">Contact</div>
          </div>
        </div>
        <div class="col-md-5 col-sm-6 d-flex justify-content-center mb-5 text-white">
          <div class="text-center">
            <div class="fw-bold mb-4">
              <img src="~/static/logo.png" width="128"></img>
            </div>
            <div>Danish Ice Cream Cafe</div>
            <div class="mb-2">danishicecreamkeningau@gmail.com</div>
            <div>Lot 2, Future city complex, Jalan Masjid, 89008 Keningau, Sabah, Malaysia</div>
          </div>
        </div>
        <div class="col-md-1 col-sm-6 d-flex mb-5 text-white">
          <!-- <h3 class="fw-bold mb-4">Follow Us</h3> -->
          <div class="d-flex row flex-wrap justify-content-center">
            <div class="d-flex justify-content-center">
              <img href="" src="~/static/icon/fb.png" alt="Facebook" class="social-list-img">
            </div>
            <div class="d-flex justify-content-center">
              <img href="" src="~/static/icon/ig.png" alt="Instagram" class="social-list-img">
            </div>
              <div class="d-flex justify-content-center">
              <img href="" src="~/static/icon/tiktok.png" alt="Tiktok" class="social-list-img">
            </div>
              <div class="d-flex justify-content-center">
              <img href="" src="~/static/icon/whatsapp.png" alt="Whatsapp" class="social-list-img">
            </div>
          </div>
        </div>
        <hr>
        <div class="col-md-12 col-sm-6 text-center mt-2">
          <p class="text-white fw-light m-0">Copyright @2023 Danish Ice Cream Cafe</p>
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
      searchQuery: '',
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
  mounted() {
    if (this.$route.hash) {
      const element = document.querySelector(this.$route.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  computed: {
    filteredItems() {
      let filtered = this.items;
      if (this.activeIndex !== 'all') {
        filtered = filtered.filter(
          (item) => item.category === this.activeIndex
        );
      }
      if (this.selectedFilter) {
        filtered = filtered.filter(
          (item) => item.filters.includes(this.selectedFilter)
        );
      }
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower) ||
            item.filters.some(filter => filter.toLowerCase().includes(searchLower))
        );
      }
      return filtered.slice(0, this.currentPage * this.itemsPerPage);
    },
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
    },
    addToCart(item) {

      console.log('Added to cart:', item)
    },
    loadMore() {
      this.currentPage++
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('Form data:', this.form)
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
    },
    navigateTo(section) {
      const sectionMap = {
        home: '#home-section',
        news: '#news-section',
        menu: '#menu-section',
        contact: '#contact-section'
      }
      const targetSection = sectionMap[section]
      if (targetSection) {
        const element = document.querySelector(targetSection)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    searchItems() {
      this.currentPage = 1;
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
.el-menu-item:focus{
  background-color: #F390C7;
  font-weight: 700;
  text-decoration: underline;
}
.el-menu-item:hover{
  background-color: #F390C7;
  font-weight: 700;
}
.main-header{
  font-size: 4rem !important;
}
#home-section .form-control,
#home-section .btn-primary-search{
  min-height: 45px;
}
#home-section .form-control{
  border-radius: 10px 0 0 10px;
  max-width: 300px;
  border-color: #6c757d20;
}
#home-section .btn-primary-search{
  border-radius: 0 10px 10px 0;
  min-width: 80px;
}
.btn-primary-search{
  background-color: #F390C7;
  border-color: #F390C7;
  color: #FFFFFF;
}
.btn-primary-search:hover{
  background-color: #6c757d;
  border-color: #6c757d;
  color: #000000;
}
.btn-primary{
  background-color: #000000;
  border-color: #00000000;
  border-radius: 50px;
  min-width: 120px;
}
.btn-primary:hover{
  background-color: #FFE9F5;
  border-color: #F390C7;
  color: #000000;
  border-radius: 50px;
  min-width: 120px;
}
.btn-secondary{
  background-color: #00000000;
  border-color: #6c757d;
  color: #6c757d;
  border-radius: 50px;
}
.btn-secondary:hover{
  background-color: #FFE9F5;
  border-color: #F390C700;
  color: #000000;
  border-radius: 50px;
}
.social-list-img{
  width: 30px;
  height: 30px;
  
}
</style>
