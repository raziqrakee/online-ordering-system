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
            <el-menu-item index="2-1">Cart</el-menu-item>
            <el-menu-item index="2-1" @click="logout()">Logout</el-menu-item>
          </el-submenu>
        </div>
    </el-menu>
    <!-- MAIN -->
    <div id="home-section" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-40 mx-5">
        <div class="row">
            <div class="col-md-8 col-sm-6 p-4">
                <h3 class="text-2xl fw-bold mb-2">Customer Information</h3>
                <hr>
                <div class="mb-3">
                    <input type="text" id="email" placeholder="Email" class="form-control mb-2">
                    <input type="text" id="fullname" placeholder="Fullname" class="form-control mb-2">
                    <input type="tel" id="phone" placeholder="Phone Number" class="form-control mb-2">
                </div>
                <h4 class="text-2xl fw-normal mb-2">Order Options</h4>
                <div class="row gap-2 mb-3">
                    <div class="col-6">
                        <button class="btn btn-light btn-block">Dine-In</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-light btn-block">Takeaway</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 p-4">
                <h3 class="text-2xl fw-bold mb-2">Order Summary</h3>
                <hr>
                <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                        <div class="flex-column">
                            <span class="text-lg">Strawberry</span>
                            <span class="text-xs">Qty: 1</span>
                        </div>
                        <span class="text-lg">RM 10.00</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                        <span class="text-base">Subtotal:</span>
                        <span class="text-base">RM 10.00</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                        <span class="text-base">Tax:</span>
                        <span class="text-base">RM 1.00</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                        <span class="text-base">Total:</span>
                        <span class="text-base">RM 11.00</span>
                    </li>
                </ul>
            </div>
            <hr>
            <div class="row p-4">
                <div class="col-md-3 col-sm-12">
                  <h4 class="text-2xl fw-normal mb-2">Payment Options</h4>
                </div>
                <div class="col-md-2 col-sm-6 mb-3 pt-sm-1">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="cash" name="payment_option" value="cash">
                        <label class="form-check-label" for="cash">Cash</label>
                    </div>
                    <p class="sub-text">Pay at the counter</p>
                </div>
                <div class="col-md-4 col-sm-6 mb-3 pt-sm-1">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="direct_bank_transfer" name="payment_option" value="direct_bank_transfer">
                    <label class="form-check-label" for="direct_bank_transfer">Direct Bank Transfer</label>
                  </div>
                    <p class="sub-text">Make payment directly through bank account</p>
                    <input type="text" id="bank_holder_name" placeholder="Bank Holder Name" class="form-control mb-2">
                    <input type="text" id="bank_account_number" placeholder="Bank Account Number" class="form-control mb-2">
                    <input type="text" id="bank_name" placeholder="Bank Name" class="form-control mb-2">
                    <label for="receipt" class="form-label">Upload Receipt:</label>
                    <input type="file" id="receipt" class="form-control" accept="image/*">
                </div>
                <div class="col-md-3 col-sm-12">
                  <button class="btn btn-primary w-100 btn-block">Place Order</button>
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

.sub-text{
  font-size: 0.75rem;
  color: #828282;
}
</style>
