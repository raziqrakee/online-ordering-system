<template>
  <div>
    <Navbar></Navbar>
    <!-- PRODUCT -->
    <div id="menu" class="m-5">
      <div class="mx-5">
        <h1 class="text-2xl fw-bold mb-4 text-center">Menu</h1>
        <div class="mb-3 d-flex justify-content-between">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            class="menu-custom w-100"
          >
            <el-menu-item index="all">All</el-menu-item>
            <el-menu-item index="dessert">Dessert</el-menu-item>
            <el-menu-item index="korean">Korean</el-menu-item>
            <el-menu-item index="snacks">Snacks</el-menu-item>
            <el-menu-item index="beverages">Beverages</el-menu-item>
          </el-menu>
          <div class="search-custom menu-custom">
            <el-input placeholder="Search" prefix-icon="el-icon-search" v-model="searchQuery" @input="searchItems"></el-input>
          </div>
        </div>

        <div class="filters-custom mb-3 text-center">
          <el-select v-model="selectedFilter" placeholder="Filters" @change="filterItems">
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
            <div class="card-custom py-3 px-2 shadow-sm border-0">
              <img :src="item.image_url" class="card-img-top-custom d-block mb-2 w-100 h-100 rounded-top" :alt="item.name" />
              <div class="card-body-custom">
                <div class="d-flex flex-column align-items-center">
                  <h5 class="card-title-custom text-center">{{ item.name }}</h5>
                  <p class="card-text-custom fw-bold">RM{{ item.price }}</p>
                </div>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary-custom" @click="addToCart(item)">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-secondary-custom" @click="loadMore">Load more...</button>
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
    Navbar,
    Footer,
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
      searchQuery: '',
      filters: [
        { value: '', label: 'All' },
        { value: 'Vegetarian', label: 'Vegetarian' },
        { value: 'Vegan', label: 'Vegan' },
        { value: 'glutenFree', label: 'Gluten-Free' },
      ],
      items: [],
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
    this.fetchProducts();
  },
  computed: {
    filteredItems() {
      let filtered = this.items;

      if (this.activeIndex !== 'all') {
        filtered = filtered.filter((item) => item.category === this.activeIndex);
      }

      if (this.selectedFilter) {
        filtered = filtered.filter((item) => item.filters.includes(this.selectedFilter));
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
      this.filterItems(); // Trigger the filtering whenever a new category is selected
    },
    filterItems() {
      this.currentPage = 1;
    },
    addToCart(item) {
      console.log('Added to cart:', item);
    },
    loadMore() {
      this.currentPage++;
    },
    async fetchProducts() {
      try {
        const response = await this.$axios.get('http://localhost:8000/api/products');
        this.items = response.data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('Form data:', this.form);
          this.$refs[formName].resetFields();
        } else {
          console.log('Error submitting form');
          return false;
        }
      });
    },
    logout() {
      this.$cookies.remove("token");
      window.location.href = "login";
    },
    navigateTo(section) {
      const sectionMap = {
        home: '#home-section',
        news: '#news-section',
        menu: '#menu-section',
        contact: '#contact-section'
      };
      const targetSection = sectionMap[section];
      if (targetSection) {
        const element = document.querySelector(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
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
.menu-custom {
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
.search-custom {
  display: flex;
}
.filters-custom {
  margin-bottom: 1rem;
}
.btn-primary-custom {
  background-color: #000000;
  border-color: #00000000;
  color: #FFFFFF;
  border-radius: 50px;
  min-width: 120px;
}
.btn-primary-custom:hover {
  background-color: #FFE9F5;
  border-color: #F390C7;
  color: #000000;
  border-radius: 50px;
  min-width: 120px;
}
.btn-secondary-custom {
  background-color: #00000000;
  border-color: #6c757d;
  color: #6c757d;
  border-radius: 50px;
}
.btn-secondary-custom:hover {
  background-color: #FFE9F5;
  border-color: #F390C700;
  color: #000000;
  border-radius: 50px;
}
.card-custom{
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
}
.card-main-custom{
  flex-direction: column;
  transition: transform 0.3s;
  border-radius: 10px;
  overflow: hidden;
}
.card-main-custom .card-body-custom{
  flex-direction: row;
  display: flex;
  position: absolute;
  bottom: 0;
  background-color:#0000000;
}
.card-body-custom{
  background-color:#0000000;
  align-items: center;
}
.card-img-top-custom{
  max-height: 300px; 
  min-height: 300px; 
  object-fit: cover;
}
</style>
