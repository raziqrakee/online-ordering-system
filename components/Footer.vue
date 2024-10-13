<template>
  <div class="footer">
    <div class="row pt-5 px-5 py-4" style="background-color: #F390C7;">
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
          <div class="mb-2">
            <nuxt-link to="/product" style="text-decoration: none; color: #fff;">Menu</nuxt-link>
          </div>
          <div class="mb-2">
            <nuxt-link to="/reservation" style="text-decoration: none; color: #fff;">Reservation</nuxt-link>
          </div>
          <div @click="navigateTo('contact')">Contact</div>
        </div>
      </div>
      <div class="col-md-5 col-sm-6 d-flex justify-content-center mb-5 text-white">
        <div class="text-center">
          <div class="fw-bold mb-4">
            <img src="~/static/logo.png" width="128">
          </div>
          <div>Danish Ice Cream Cafe</div>
          <div class="mb-2">danishicecreamkeningau@gmail.com</div>
          <div>Lot 2, Future City Complex, Jalan Masjid,</div>
          <div>89008 Keningau, Sabah, Malaysia</div>
        </div>
      </div>
      <div class="col-md-1 col-sm-6 d-flex mb-5 text-white">
        <div class="d-flex row flex-wrap justify-content-center">
          <div class="d-flex justify-content-center">
            <a href="https://m.facebook.com/Danishicecreamkeningau/" target="_blank">
              <img src="~/static/icon/fb.png" alt="Facebook" class="social-list-img">
            </a>
          </div>
          <div class="d-flex justify-content-center">
            <a href="https://www.instagram.com/danishicecream_/" target="_blank">
              <img src="~/static/icon/ig.png" alt="Instagram" class="social-list-img">
            </a>
          </div>
          <div class="d-flex justify-content-center">
            <a href="http://wasap.my/+601118960067" target="_blank">
              <img src="~/static/icon/whatsapp.png" alt="Whatsapp" class="social-list-img">
            </a>
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
  methods: {
    navigateTo(section) {
      const sectionMap = {
        home: '#home-section',
        news: '#news-section',
        menu: '#menu-section',
        reservation: '#reservation-section',
        contact: '#contact-section'
      };
      const targetSection = sectionMap[section];
      if (targetSection) {
        this.$router.push({ path: '/', hash: targetSection });
      }
    }
  }
}
</script>

<style>
.footer .social-list-img {
  width: 30px;
  height: 30px;
}

/* Add the following lines to ensure text color consistency */
.footer a {
  color: #fff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
