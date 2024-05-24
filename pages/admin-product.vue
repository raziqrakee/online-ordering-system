<!-- AdminProduct.vue -->
<template>
  <div class="admin-product">
    <div class="sidebar" style="padding-left: 0px; padding-right: 0px;">
      <div class="logo">
        <img src="~/static/logo.png" alt="Logo" class="img-fluid" width="98px">
      </div>
      <el-menu :default-active="activeLink" class="sidebar-menu" @select="handleSelect">
          <el-menu-item index="dashboard" class="custom-sidebar-item">
            <i class="el-icon-menu"></i>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="product" class="custom-sidebar-item" >
            <i class="el-icon-goods"></i>
            <span>Product</span>
          </el-menu-item>
          <el-menu-item index="order" class="custom-sidebar-item">
            <i class="el-icon-shopping-cart-2"></i>
            <span>Order</span>
          </el-menu-item>
          <el-menu-item index="reservation" class="custom-sidebar-item">
            <i class="el-icon-date"></i>
            <span>Reservation</span>
          </el-menu-item>
          <el-menu-item index="report" class="custom-sidebar-item">
            <i class="el-icon-document"></i>
            <span>Sale Report</span>
          </el-menu-item>
        </el-menu>
      <div class="logout">
        <el-button type="danger" icon="el-icon-switch-button" round @click="logout()">Logout</el-button>
      </div>
    </div>
    <div class="content" style="background-color: #f6f6f6;padding: 0px;">
      <div class="header" style="background-color: #fff; padding: 20px">
        <div class="search">
          <el-input placeholder="Search" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="user">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              Admin <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item>Settings</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="admin-product bg-light" style="padding:20px; height: 80vh; margin: 0 20px;">
        <div class="row">
            <div class="col-12">
                <div class="d-flex flex-row justify-content-between align-items-center my-4">
                    <h1 class="text-3xl font-bold">Products</h1>
                    <div class="d-flex align-items-center gap-1">
                        <div class="relative">
                            <button onclick="toggleDropdown()" class="btn btn-outline-secondary btn-w d-flex align-items-center shadow">
                                <span>Filter</span>
                                <img src="/assets/filter-product.svg" alt="Delete" class="btn-img cursor-pointer" onclick="toggleDropdown()">
                            </button>
                            <div id="dropdownMenu" class="dropdown-menu dropdown-menu-end">
                                <button class="dropdown-item">Title</button>
                                <button class="dropdown-item">ID</button>
                                <button class="dropdown-item">Description</button>
                                <button class="dropdown-item">Price</button>
                                <button class="dropdown-item">Status</button>
                                <button class="dropdown-item">Category</button>
                                <button class="dropdown-item">Action</button>
                            </div>
                        </div>
                        <button class="btn btn-secondary btn-w d-flex align-items-center shadow">
                            <span>Add Product</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="btn-img" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="row bg-white p-4 gap-4 mt-4 rounded-xl">
                    <table class="table">
                        <thead class="bg-gray-100 text-center rounded-xl">
                            <tr>
                                <th scope="col" class="px-6 m-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">
                                    Description
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price (RM)
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status (Quantity)
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 text-center">
                            <tr class="border-b-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img src="/assets/product-1.png" alt="Product Icon" class="product-list-img">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">Coklat</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">F001</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900 text-start">
                                      Premium Rich and creamy chocolate ice cream, crafted from the finest
                                      cocoa beans and fresh dairy.
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">20</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">In stock (100)</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">Dessert</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                  <div class="d-flex flex-row gap-2 p-6 justify-between whitespace-nowrap text-sm text-gray-500">
                                    <img src="/assets/edit-product.svg" alt="Edit" class="btn-list-img cursor-pointer">
                                    <img src="/assets/delete-product.svg" alt="Delete" class="btn-list-img w-6 cursor-pointer">
                                  </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 'product',
    }
  },
  methods:{
    handleSelect(index) {
      this.activeLink = index;
      this.$router.push(`/admin-${index}`);
    },
      logout(){
          this.$cookies.remove("token")
          // this.$router.push("/login")
          window.location.href = "login"
      }
  }
}
</script>

<style>

/* Add custom styles for the admin product */
.admin-product {
  display: flex;
  height: 100vh;
}

.sidebar {
  background-color: #FFE9F5;
  color: #fff;
  padding: 20px;
  width: 200px;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.sidebar-menu {
  border-right: none;
}

.custom-sidebar-item{
  background-color: #FFE9F5;
}

.logout {
  position: absolute;
  bottom: 20px;
  left: 40px;
  right: 20px;
}

.content {
  flex: 1;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search {
  width: 300px;
}

.user {
  cursor: pointer;
}

.stats {
  margin-top: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
}

.stat-icon {
  font-size: 36px;
  margin-right: 10px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
  color: #888;
}

.btn-img{
  width: 20px;
  height: 20px;
  margin-inline-start: 10px;
}

.btn-list-img{
  width: 30px;
  height: 30px;
}

.btn-w{
  min-width: 160px;
  justify-content: center;
}

.btn-secondary{
  background-color: #FFE9F5;
  color: #000000;
  border-color: #FFE9F5;
}

.btn-outline-secondary{
  border-color: #FFE9F500;
}

.btn-outline-secondary::hover{
  background-color: #FFE9F5;
  color: #000000;
  border-color: #FFE9F5;
}

.product-list-img{
  width: 60px;
}
</style>
