<template>
  <div>
    <Navbar></Navbar>
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
            <el-menu-item index="korean">Korean</el-menu-item>
            <el-menu-item index="snacks">Snacks</el-menu-item>
            <el-menu-item index="beverages">Beverages</el-menu-item>
            <el-menu-item index="desserts">Desserts</el-menu-item>
          </el-menu>
          <div class="search-custom menu-custom">
            <el-input placeholder="Search" prefix-icon="el-icon-search" v-model="searchQuery" @input="searchItems"></el-input>
          </div>
        </div>

        <div class="row">
          <div v-if="filteredItems.length === 0" class="text-center w-100">
            <p class="text-xl fw-bold">No results were found</p>
          </div>
          <div
            v-else
            v-for="item in filteredItems"
            :key="item.id"
            class="col-md-3 mb-5"
          >
            <div class="card-custom p-3 shadow-sm border-0">
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

        <div v-if="filteredItems.length > 0" class="text-center mt-4">
          <button class="btn btn-secondary-custom" @click="loadMore">Load more...</button>
        </div>
      </div>
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
      activeIndex: 'all',
      searchQuery: '',
      items: [],
      itemsPerPage: 8,
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
        filtered = filtered.filter((item) => item.category.toLowerCase() === this.activeIndex.toLowerCase());
      }

      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower)
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
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const product = cart.find((product) => product.id === item.id);
      if (product) {
        product.quantity++;
      } else {
        item.quantity = 1;
        cart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.$notify({
        title: 'Success',
        message: 'Item added to cart',
        type: 'success'
      });
      EventBus.$emit('cart-updated');
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
  background: color #000;;
}
.card-body-custom{
  background: color #000;;
  align-items: center;
}
.card-img-top-custom{
  max-height: 300px;
  min-height: 300px;
  object-fit: cover;
}

.el-input__prefix{
  height: auto;
}
</style>
