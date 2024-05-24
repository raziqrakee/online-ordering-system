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
    <!-- HEADER -->
    <div id="home-section" class="d-flex align-items-center" style="min-height: 70vh; background-color: #D1E6FB;">
      <div class="row mx-5 w-100 d-flex justify-content-between align-items-center">
        <div class="col-6 p-4">
          <h1 class="mx-5 text-white fw-bold fs-1 main-header">Danish Ice</br>Cream Cafe</h1>
          <h5 class="mx-5 text-white">
            Embrace the Flavours of the Future with Danish Ice Cream Cafe, We Serve Gen Z's Palate with Modern Taste Sensations!
          </h5>
          <div class="d-flex align-items-center pt-3 mx-5">
            <input type="text" placeholder="Search food..." class="form-control">
            <button class="btn btn-primary-search">Search</button>
          </div>        
        </div>
        <div class="col-6 text-center">
          <img src="~/static/logo.png"/>
        </div>
      </div>
    </div>
    <!-- PRODUCT -->
    <div id="menu-section" class="m-5">
      <div class="mx-5 d-flex flex-lg-row flex-sm-column align-items-center">
        <h1 class="text-2xl fw-bold mb-5 text-center">OUR TOP PICKS</h1>
        <div class="row mx-5">
          <div class="w-100 mb-4">
            <div class="card card-main">
              <img class="w-100" style="max-height: 500px; min-height: 300px; object-fit: cover;" src="/assets/product-7.png" />
              <div class="card-body w-100 justify-content-between">
                <div class="d-flex flex-column mx-2">
                  <h2 class="card-title text-uppercase fw-bolder">samyang ramen</h2>
                  <div class="row">
                    <h4 class="card-text fw-bold">RM 7</h4>
                    <h6 class="card-text text-capitalize">korean</h6>
                    <h7 class="card-text">Sold : 600 pcs</h7>
                  </div>
                </div>
                <div class="d-flex justify-content-center mx-2">
                  <button class="btn btn-primary" @click="addToCart(item)">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>          
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="col-md-6 mb-4"
          >
            <div class="card">
              <img style="max-height: 300px; min-height: 300px; object-fit: cover;" :src="item.imageUrl" class="card-img-top" :alt="item.name" />
              <div class="card-body py-5">
                <div class="d-flex row mb-5">
                  <h4 class="card-title fw-bold">{{ item.name }}</h4>
                  <h5 class="card-text">RM{{ item.price.toFixed(2) }}</h5>
                  <h6 class="card-text text-capitalize">{{ item.category}}</h6>
                  <h7 class="card-text">Sold : {{ item.sold}} pcs</h7>
                </div>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary" @click="addToCart(item)">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <button class="btn btn-secondary" @click="loadMore">Load more products...</button>
      </div>  
    </div>
    <!-- NEWS -->
    <div id="news-section" ref="newsSection" class="py-3" style="min-height: 60vh; background-color: #D1E6FB;">
      <div class="m-5">
        <h1 class="text-2xl fw-bold mb-5 text-center">News</h1>
        <div class="d-flex row align-items-start justify-content-center mx-5">
          <div class="col-md-8 col-sm-6">
            <h4 class="fw-bold">Danish Ice Cream | Promosi Aidiladha</h4>
            <h6>Quis hendrerit nibh mauris sed faucibus. Quis hendrerit nibh mauris sed faucibus is sed faucibus.</h6>
            <img class="w-100" src="~/static/news1.jpeg"/>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="mb-4">
              <img class="w-100" src="~/static/news2.jpeg"/>
            </div>
            <div>
              <img class="w-100" src="~/static/news3.jpeg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- CONTACT FORM -->
    <div id="contact-section" style="background-color: #F7F8FA">
      <div class="row justify-content-center">
        <div class="col-md-8 mx-5 my-3">
          <div class="card m-5" style="border:none;background-color: #F7F8FA">
            <div class="card-body">
              <h3 class="text-2xl fw-bold">Are you interested in catering services?</h3>
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
                  <button class="btn btn-primary" type="primary" @click="submitForm('form')">Send</button>
                </div>
              </el-form>
            </div>
          </div>
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
          filters: ['vegetarian'],
          sold: '300'
        },
        {
          id: 2,
          name: 'Ice Americano',
          price: 8.0,
          imageUrl: 'americano.jpeg',
          category: 'beverages',
          filters: ['vegan', 'glutenFree'],
          sold: '223'
        },
        // Add more items as needed
      ],
      itemsPerPage: 9,
      currentPage: 1,
    }
  },
  mounted() {
    // If there's a hash in the URL, scroll to the element with that ID
    if (this.$route.hash) {
      const element = document.querySelector(this.$route.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
    this.activeIndex = index;
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
    }
  },
}
</script>

<style>
h7{
  font-size: 0.8rem;
}
.card{
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
}
.card-main{
  flex-direction: column;
  transition: transform 0.3s;
  border-radius: 10px;
  overflow: hidden;
}
.card-main .card-body{
  flex-direction: row;
  display: flex;
  position: absolute;
  bottom: 0;
  background-color:#F390C7;
}
.card-body{
  background-color:#F390C7;
  align-items: center;
}
#contact-section .card-body{
  background-color: #F7F8FA;
}
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
