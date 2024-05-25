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
        <el-menu-item index="product" class="custom-sidebar-item">
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
                    <button class="dropdown-item">Stock Quantity</button>
                    <button class="dropdown-item">Category</button>
                    <button class="dropdown-item">Action</button>
                  </div>
                </div>
                <button @click="showAddModalVisible = true" class="btn btn-secondary btn-w d-flex align-items-center shadow">
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
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock Quantity
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
                  <tr class="border-b-gray-50" v-for="product in products" :key="product.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img :src="product.image" alt="Product Icon" class="product-list-img">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ product.title }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.id }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 text-start">
                        {{ product.description }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.price }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.status }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.category }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="d-flex flex-row gap-2 p-6 justify-between whitespace-nowrap text-sm text-gray-500">
                        <img src="/assets/edit-product.svg" alt="Edit" class="btn-list-img cursor-pointer" @click="showEditModal(product)">
                        <img src="/assets/delete-product.svg" alt="Delete" class="btn-list-img w-6 cursor-pointer" @click="showDeleteModal(product.id)">
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
    <el-dialog :visible.sync="showEditModalVisible" title="Edit Product">
      <el-form :model="editProduct">
        <div class="d-flex row">
          <el-form-item label="Product Name" class="col-md-7 col-sm-6">
            <el-input v-model="editProduct.title"></el-input>
          </el-form-item>
          <el-form-item label="ID" class="col-md-5 col-sm-6">
            <el-input v-model="editProduct.id" disabled></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Description">
          <el-input v-model="editProduct.description"></el-input>
        </el-form-item>
        <div class="d-flex row">
          <el-form-item label="Price (RM)" class="col-md-5 col-sm-6">
            <el-input v-model="editProduct.price"></el-input>
          </el-form-item>
          <el-form-item label="Stock Quantity" class="col-md-3 col-sm-6">
            <el-input v-model="editProduct.quantity"></el-input>
          </el-form-item>
          <el-form-item label="Category" class="col-md-4 col-sm-6">
            <el-input v-model="editProduct.category"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Image" class="w-100">
          <div v-if="editProduct.image" class="d-flex w-100">
            <el-image
              :src="editProduct.image"
              style="width: auto; height: 50px; object-fit: cover;"
            ></el-image>
            <el-button @click="removeImage('edit')">Remove</el-button>
          </div>
          <div v-else>
            <el-upload
              class="w-100"
              action=""
              :show-file-list="false"
              accept="image/*"
              :on-change="handleEditUploadImage"
            >
              <el-upload
                class="mb-4 w-100 h-25 justify-content-center"
                action="your_upload_endpoint_here"
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                ref="upload"
              >
                <i class="el-icon-plus"></i>
                <div class="el-upload__text fw-normal">
                  Drop your image here, or browse
                </div>
                <div class="el-upload__text fw-thin">
                  Support: jpg, jpeg, png
                </div>
              </el-upload>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer d-flex justify-content-center">
        <el-button class="btn btn-w btn-secondary" @click="showEditModalVisible = false">Cancel</el-button>
        <el-button class="btn btn-w btn-primary" type="primary" @click="updateProduct">Update</el-button>
      </span>
    </el-dialog>
    
    <el-dialog :visible.sync="showAddModalVisible" class="fw-bolder" title="Add Product">
      <el-form :model="newProduct">
        <div class="d-flex row">
          <el-form-item label="Product Name" class="col-md-7 col-sm-6">
            <el-input v-model="newProduct.title"></el-input>
          </el-form-item>
          <el-form-item label="ID" class="col-md-5 col-sm-6">
            <el-input v-model="newProduct.id"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Description">
          <el-input v-model="newProduct.description"></el-input>
        </el-form-item>
        <div class="d-flex row">
          <el-form-item label="Price (RM)" class="col-md-5 col-sm-6">
            <el-input v-model="newProduct.price"></el-input>
          </el-form-item>
          <el-form-item label="Stock Quantity" class="col-md-3 col-sm-6">
            <el-input v-model="newProduct.quantity"></el-input>
          </el-form-item>
          <el-form-item label="Category" class="col-md-4 col-sm-6">
            <el-input v-model="newProduct.category"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Image" class="w-100">
          <div v-if="newProduct.image" class="d-flex w-100">
            <el-image
              :src="newProduct.image"
              style="width: auto; height: 50px; object-fit: cover;"
            ></el-image>
            <el-button @click="removeImage('new')">Remove</el-button>
          </div>
          <div v-else>
            <el-upload
              class="w-100"
              action=""
              :show-file-list="false"
              accept="image/*"
              :on-change="handleNewUploadImage"
            >
              <el-upload
                class="mb-4 w-100 h-25 justify-content-center"
                action="your_upload_endpoint_here"
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                ref="upload"
              >
                <i class="el-icon-plus pb-3"></i>
                <div class="el-upload__text fw-normal">
                  Drop your image here, or browse
                </div>
                <div class="el-upload__text fw-thin">
                  Support: jpg, jpeg, png
                </div>
              </el-upload>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer d-flex gap-4 justify-content-center">
        <el-button class="btn btn-w btn-secondary" @click="discardNewProduct">Discard</el-button>
        <el-button class="btn btn-w btn-primary" type="primary" @click="saveNewProduct">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 'product',
      showEditModalVisible: false,
      showDeleteModalVisible: false,
      showAddModalVisible: false,
      editProduct: {},
      deleteProductId: null,
      editProduct: {
        title: '',
        id: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: null
      },
      newProduct: {
        title: '',
        id: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: null
      },
      products: [
        {
          id: 'F001',
          title: 'Coklat',
          description: 'Premium Rich and creamy chocolate ice cream, crafted from the finest cocoa beans and fresh dairy.',
          price: 20,
          quantity: '100',
          category: 'Dessert',
          image: '/assets/product-1.png'
        }
      ]
    };
  },
  methods: {
    handleSelect(index) {
      this.activeLink = index;
      this.$router.push(`/admin-${index}`);
    },
    logout() {
      this.$cookies.remove('token');
      window.location.href = 'login';
    },
    showEditModal(product) {
      this.editProduct = { ...product };
      this.showEditModalVisible = true;
    },
    handleEditUploadImage(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.editProduct.image = reader.result;
      };
    },
    updateProduct() {
      const index = this.products.findIndex(p => p.id === this.editProduct.id);
      if (index !== -1) {
        this.products.splice(index, 1, this.editProduct);
      }
      this.showEditModalVisible = false;
    },
    showDeleteModal(productId) {
      this.deleteProductId = productId;
      this.showDeleteModalVisible = true;
    },
    deleteProduct() {
      this.products = this.products.filter(p => p.id !== this.deleteProductId);
      this.showDeleteModalVisible = false;
    },
    handleUploadImage(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.newProduct.image = reader.result;
      };
    },
    handleNewUploadImage(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.newProduct.image = reader.result;
      };
    },
    removeImage(type) {
      if (type === 'edit') {
        this.editProduct.image = null;
      } else if (type === 'new') {
        this.newProduct.image = null;
      }
    },
    handlePictureCardPreview(file) {
      this.previewImageUrl = file.url;
      this.$refs.previewModal.open();
    },
    closePreviewModal() {
      this.previewImageUrl = '';
      this.$refs.previewModal.close();
    },
    handleRemove(file) {
      const index = this.newProduct.images.indexOf(file);
      this.newProduct.images.splice(index, 1);
      this.$notify({
        title: 'Remove',
        message: 'Remove functionality is not implemented yet.',
        type: 'warning'
      });
    },
    saveNewProduct() {
      // Perform save operation, e.g., adding the new product to the list
      const formattedPrice = parseFloat(this.newProduct.price).toLocaleString('en-MY', { style: 'currency', currency: 'MYR' });
      this.products.push({
        ...this.newProduct,
        price: formattedPrice
      });

      this.clearNewProductForm();
      this.showAddModalVisible = false;
    },
    discardNewProduct() {
      this.clearNewProductForm();
      this.showAddModalVisible = false;
    },
    clearNewProductForm() {
      this.newProduct = {
        title: '',
        id: '',
        description: '',
        price: '',
        status: '',
        category: '',
        image: null
      };
    }
  }
};
</script>

<style>
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
.custom-sidebar-item {
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
.btn-img {
  width: 20px;
  height: 20px;
  margin-inline-start: 10px;
}
.btn-list-img {
  width: 30px;
  height: 30px;
}
.btn-w {
  min-width: 160px;
  justify-content: center;
}
.btn-secondary {
  background-color: #FFE9F5;
  color: #000000;
  border-color: #FFE9F5;
}
.btn-outline-secondary {
  border-color: #FFE9F500;
}
.btn-outline-secondary::hover {
  background-color: #FFE9F5;
  color: #000000;
  border-color: #FFE9F5;
}
.product-list-img {
  width: 60px;
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
.el-dialog{
  border-radius: 16px;
  padding: 10px;
}
.el-upload--text{
  padding: 0px;
}
.el-button--primary:focus, .el-button--primary {
  background: #000000;
  border-color: #000000;
  color: #FFFFFF;
}
.el-button--primary:focus, .el-button--primary:hover {
  background: #787b82;
  border-color: #787b82;
  color: #FFFFFF;
}
.el-upload{
  width: 100%;
}
.el-upload--picture-card{
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
