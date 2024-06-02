<template>
  <div>
    <Navbar></Navbar>
    <!-- HEADER -->
    <div id="home-section" class="d-flex align-items-center" style="min-height: 70vh; background-color: #D1E6FB;">
      <div class="row mx-5 w-100 d-flex justify-content-between align-items-center">
        <div class="col-6 p-4">
          <h1 class="mx-5 text-white fw-bold fs-1 main-header">Danish Ice</br>Cream Cafe</h1>
          <h5 class="mx-5 text-white">
            Embrace the Flavours of the Future with Danish Ice Cream Cafe, We Serve Gen Z's Palate with Modern Taste Sensations!
          </h5>
        </div>
        <div class="col-6 text-center">
          <img src="~/static/logo.png"/>
        </div>
      </div>
    </div>
    <!-- PRODUCT -->
    <div id="menu-section" class="m-5">
      <div class="d-flex gap-5 flex-md-row flex-xs-column align-items-center">
        <h1 class="text-2xl fw-bold mb-2 text-center">OUR TOP PICKS</h1>
        <!-- Main product card -->
        <div class="d-flex row">
          <div class="row w-100">
            <div v-for="(product, index) in topProducts" :key="product.id" class="w-100 mb-4 col-md-4">
              <div class="card card-main">
                <img
                  class="w-100"
                  style="max-height: 300px; min-height: 300px; object-fit: cover;"
                  :src="product.image_url"
                />
                <div class="card-body d-flex w-100 justify-content-between">
                  <div class="d-flex flex-column mx-2">
                    <h2 class="card-title text-uppercase fw-bolder">{{ product.name }}</h2>
                    <div class="row">
                      <h4 class="card-text fw-bold">RM {{ product.price }}</h4>
                      <h6 class="card-text text-capitalize">{{ product.category }}</h6>
                      <h7 class="card-text">Sold: {{ product.sold }} pcs</h7>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mx-2">
                    <button class="btn btn-primary" @click="addToCart(product)">
                      Add to Cart
                    </button>
                  </div>
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
      items: [],
      itemsPerPage: 9,
      currentPage: 1,
      topProducts: [], // Top 3 products
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
    this.fetchProducts();
  },
  computed: {
    filteredItems() {
      let filtered = this.items;

      if (this.activeIndex !== 'all') {
        filtered = filtered.filter(
          (item) => item.category.toLowerCase() === this.activeIndex.toLowerCase()
        );
      }

      if (this.selectedFilter) {
        filtered = filtered.filter(
          (item) => item.filters && item.filters.includes(this.selectedFilter)
        );
      }

      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower) ||
            (item.filters && item.filters.some((filter) => filter.toLowerCase().includes(searchLower)))
        );
      }

      return filtered.slice(0, this.currentPage * this.itemsPerPage);
    },
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
      this.currentPage = 1;
    },
    addToCart(item) {
      // Add your cart logic here
      console.log('Added to cart:', item)
    },
    loadMore() {
      this.currentPage++;
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
    logout() {
      this.$cookies.remove("token")
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
        this.$router.push({ path: '/', hash: targetSection });
      }
    },
    async fetchProducts() {
      try {
        const response = await this.$axios.get('http://localhost:8000/api/products');
        const products = response.data.products;

        // Sort products by sold count and get the top 3
        products.sort((a, b) => b.sold - a.sold);
        this.topProducts = products.slice(0, 3);

        // Set the rest of the products
        this.items = products.slice(3);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
}
</script>

<style>
h7 {
  font-size: 0.8rem;
}
.card {
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
}
.card-below {
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  max-height: 300px;
  min-height: 250px;
}
.card-img-below {
  width: 300px;
  min-width: 300px;
  object-fit: cover;
}
.card-main {
  flex-direction: column;
  transition: transform 0.3s;
  border-radius: 10px;
  overflow: hidden;
}
.card-main .card-body {
  flex-direction: row;
  display: flex;
  position: absolute;
  bottom: 0;
  background-color:#F390C7;
}
.card-body {
  background-color:#F390C7;
  align-items: center;
}
#contact-section .card-body {
  background-color: #F7F8FA;
}
.menu {
  border-bottom: 1px solid #e6e6e6;
}
.el-submenu__icon-arrow {
    display: none !important;
}
.el-menu-item:focus {
  background-color: #F390C7;
  font-weight: 700;
  text-decoration: underline;
}
.el-menu-item:hover {
  background-color: #F390C7;
  font-weight: 700;
}
.main-header {
  font-size: 4rem !important;
}
#home-section .form-control,
#home-section .btn-primary-search {
  min-height: 45px;
}
#home-section .form-control {
  border-radius: 10px 0 0 10px;
  max-width: 300px;
  border-color: #6c757d20;
}
#home-section .btn-primary-search {
  border-radius: 0 10px 10px 0;
  min-width: 80px;
}
.btn-primary-search {
  background-color: #F390C7;
  border-color: #F390C7;
  color: #FFFFFF;
}
.btn-primary-search:hover {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #000000;
}
.btn-primary {
  background-color: #000000;
  border-color: #00000000;
  border-radius: 50px;
  min-width: 120px;
}
.btn-primary:hover {
  background-color: #FFE9F5;
  border-color: #F390C7;
  color: #000000;
  border-radius: 50px;
  min-width: 120px;
}
.btn-secondary {
  background-color: #00000000;
  border-color: #6c757d;
  color: #6c757d;
  border-radius: 50px;
}
.btn-secondary:hover {
  background-color: #FFE9F5;
  border-color: #F390C700;
  color: #000000;
  border-radius: 50px;
}
</style>
