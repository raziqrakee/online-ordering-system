<template>
  <div>
    <el-menu style="background-color: #F390C7; color: #fff;" class="el-menu-demo d-flex justify-content-around align-items-center" mode="horizontal" @select="handleSelect">
        <div class="d-flex">
          <el-menu-item index="4" style="color: #fff;">ORDER NOW</el-menu-item>
        </div>
        <div class="d-flex">
          <el-menu-item index="all" style="color: #fff;"><a href="./" style="text-decoration: none; color: #fff;">Home</a></el-menu-item>
          <el-menu-item style="color: #fff;" @click="navigateTo('news')">News</el-menu-item>
          <el-menu-item index="menu" style="color: #fff;">Menu</el-menu-item>
          <el-menu-item index="order" style="color: #fff;">Order</el-menu-item>
          <el-menu-item index="reservation" style="color: #fff;">Reservation</el-menu-item>
        </div>
        <div class="d-flex">
          <el-submenu index="2">
            <template slot="title">
              <i style="color: #fff;" class="el-icon-user-solid"></i>
            </template>
            <el-menu-item index="2-1" @click="$router.push('edit-profile')">Edit Profile</el-menu-item>
            <el-menu-item index="2-1">@click="$router.push('cart')"Cart</el-menu-item>
            <el-menu-item index="2-1" @click="logout()">Logout</el-menu-item>
          </el-submenu>
        </div>
    </el-menu>
    <!-- MAIN -->
    <div id="home-section" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-5 mx-5">
        <div class="w-75">
            <div class="d-flex align-items-center mb-4">
                <h3 class="w-100 text-2xl fw-bold">Table Reservation</h3>
            </div>
            <div class="d-flex flex-column gap-2 mt-4">
                <label for="fullname" class="form-label text-lg">Fullname:</label>
                <input type="text" id="fullname" placeholder="Fullname" class="form-control text-lg">
                
                <label for="pax" class="form-label text-lg">Number of Pax:</label>
                <input type="number" id="pax" placeholder="Number of Pax" class="form-control text-lg">
                
                <label for="phone" class="form-label text-lg">Phone Number:</label>
                <input type="tel" id="phone" placeholder="Phone Number" class="form-control text-lg">
                
                <label for="reservation-time" class="form-label text-lg">Choose Slot:</label>
            </div>
            <div class="d-flex gap-2">
                <div class="w-50">
                    <input type="date" id="reservation-date" class="form-control text-lg rounded-lg">
                </div>
                <div class="w-50">
                    <div class="d-flex gap-2">
                        <input type="number" id="hours" class="form-control text-lg rounded-lg" placeholder="HH">
                        <input type="number" id="minutes" class="form-control text-lg rounded-lg" placeholder="MM">
                        <select id="ampm" class="form-control text-lg rounded-lg">
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="d-flex gap-4 justify-start mt-4">
                <button class="btn btn-outline-secondary w-25">Cancel</button>
                <button class="btn btn-primary w-25">Book</button>
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
          <div class="mb-4 fw-bold p-0 ms-0">User Link</div>
          <div @click="navigateTo('home')">Home</div>
          <div @click="navigateTo('news')">News</div>
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

<style>
.menu {
  border-bottom: 1px solid #e6e6e6;
}
.el-submenu__icon-arrow {
    display: none !important;
}

.qtt{
  width: 60px !important;
}

.btn-primary{
  background-color: #000000;
  border-color: #00000000;
}

.btn-primary:hover{
  background-color: #FFE9F5;
  border-color: #F390C7;
  color: #000000;
}

.list-group-item{
  border: #00000000;
}

.product-list-img{
  width: 60px;
}
</style>
