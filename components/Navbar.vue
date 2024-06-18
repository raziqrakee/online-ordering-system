<template>
  <el-menu style="background-color: #F390C7; color: #fff;" class="el-menu-demo d-flex justify-content-between align-items-center" mode="horizontal" @select="handleSelect">
    <div class="d-flex">
      <el-menu-item class="d-flex align-items-center" index="4" style="color: #fff;">
        <nuxt-link to="/product" class="fw-bold text-white m-0" style="text-decoration: none; color: #fff;">ORDER NOW</nuxt-link>
      </el-menu-item>
    </div>
    <div class="d-flex">
      <el-menu-item index="home" style="color: #fff;">
        <nuxt-link to="/" style="text-decoration: none; color: #fff;">Home</nuxt-link>
      </el-menu-item>
      <el-menu-item index="news" class="d-flex align-items-center" style="color: #fff;" @click="handleSelect('news')">News</el-menu-item>
      <el-menu-item index="menu" style="color: #fff;">
        <nuxt-link to="/product" style="text-decoration: none; color: #fff;">Menu</nuxt-link>
      </el-menu-item>
      <el-menu-item index="reservation" style="color: #fff;">
        <nuxt-link to="/reservation" style="text-decoration: none; color: #fff;">Reservation</nuxt-link>
      </el-menu-item>
      <el-menu-item index="contact" class="d-flex align-items-center" style="color: #fff;" @click="handleSelect('contact')">Contact</nuxt-link>
      </el-menu-item>
    </div>
    <div class="d-flex">
      <nuxt-link to="/cart" class="cart-nav d-flex align-items-center position-relative">
        <i style="color: #fff;" class="el-icon-shopping-cart-2 mt-1"></i>
        <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
      </nuxt-link>
      <el-submenu index="2">
        <template slot="title">
          <i style="color: #fff;" class="el-icon-user-solid"></i>
        </template>
        <el-menu-item index="2-1">
          <nuxt-link to="/edit-profile" style="text-decoration: none; color: #000;">Edit Profile</nuxt-link>
        </el-menu-item>
        <el-menu-item index="2-3" @click="logout()">Logout</el-menu-item>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      cartCount: 0 // Initially set to 0
    };
  },
  mounted() {
    this.updateCartCount();
    window.addEventListener('cart-updated', this.updateCartCount);
  },
  beforeDestroy() {
    window.removeEventListener('cart-updated', this.updateCartCount);
  },
  methods: {
    handleSelect(index) {
      if (index === 'news') {
        this.$router.push({ path: '/', hash: '#news-section' });
      } else if (index === 'contact') {
        this.$router.push({ path: '/', hash: '#contact-section' });
      }
    },
    logout() {
      this.$cookies.remove("token");
      window.location.href = "/login";
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    }
  }
}
</script>

<style>
.el-submenu__icon-arrow {
    display: none !important;
}
.el-menu-item *{
  vertical-align: unset;
}
.el-menu-item:focus, .el-menu-item:hover {
  background-color: #F390C7;
  font-weight: 700;
}
.el-submenu__title:hover{
  background-color: transparent;
}
.cart-nav {
  text-decoration: none; 
  color: #fff; 
  margin-right: 10px;
  font-size: 18px;
  position: relative;
}
.cart-count {
  position: absolute;
  top: 10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 7px;
}
</style>
