<template>
  <div class="admin-product">
    <Sidebar></Sidebar>
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
        <div class="row w-100">
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
                    </th>
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
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sold
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
                    <td>
                      <div class="flex-shrink-0 h-10 w-10">
                          <img :src="product.image_url" alt="Product Icon" class="product-list-img">
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.id }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 text-start">
                        {{ product.description ?? '(No description available)'}}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.price }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.quantity }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.sold }}</div>
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
            <el-input v-model="editProduct.name"></el-input>
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
            <el-select v-model="editProduct.category" filterable placeholder="Select">
              <el-option
                v-for="item in categories"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="Image" class="w-100">
          <div v-if="editProduct.image" class="d-flex w-100 align-items-center gap-4">
            <el-image
              :src="editProduct.image"
              style="width: auto; height: 200px; object-fit: cover;"
            ></el-image>
            <el-button type="danger" @click="removeEditImage()">Remove</el-button>
          </div>
          <div v-else>
            <el-upload
              class="w-100 mb-4 h-25 justify-content-center"
              action=""
              :show-file-list="false"
              accept="image/*"
              :on-change="handleEditUploadImage"
              :auto-upload="false"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              ref="upload"
            >
              <i class="el-icon-plus pb-3"></i>
              <div class="el-upload__text fw-normal">Drop your image here, or browse</div>
              <div class="el-upload__text fw-thin">Support: jpg, jpeg, png</div>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer d-flex justify-content-center">
        <el-button class="btn btn-w btn-secondary" @click="showEditModalVisible = false">Cancel</el-button>
        <el-button class="btn btn-w btn-primary" type="primary" @click="updateEditProduct">Update</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showDeleteModalVisible" title="Confirm Delete">
      <span>Are you sure you want to delete this product?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn btn-w btn-secondary" @click="showDeleteModalVisible = false">Cancel</el-button>
        <el-button class="btn btn-w btn-danger" type="danger" @click="deleteProduct">Delete</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showAddModalVisible" class="fw-bolder" title="Add Product">
      <el-form :model="newProduct" ref="newProductForm">
        <div class="d-flex row">
          <el-form-item label="Product Name" class="col-md-7 col-sm-6">
            <el-input v-model="newProduct.name"></el-input>
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
            <el-select v-model="newProduct.category" filterable placeholder="Select">
              <el-option
                v-for="item in categories"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="Image" class="w-100">
          <div v-if="newProduct.image" class="d-flex align-items-center w-100 gap-4">
            <el-image
              :src="newProduct.image"
              style="width: auto; height: 200px; object-fit: cover;"
            ></el-image>
            <el-button @click="removeImage('new')" type="danger" class="btn-w" style="width: auto; height: 45px;">Remove</el-button>
          </div>
          <div v-else>
            <el-upload
              class="w-100"
              action=""
              :show-file-list="false"
              accept="image/*"
              :on-change="handleNewUploadImage"
              :auto-upload="false"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList"
              :on-remove="handleRemove"
              ref="upload"
            >
              <i class="el-icon-plus pb-3"></i>
              <div class="el-upload__text fw-normal">Drop your image here, or browse</div>
              <div class="el-upload__text fw-thin">Support: jpg, jpeg, png</div>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer d-flex gap-4 justify-content-center">
        <el-button class="btn btn-w btn-secondary" @click="discardNewProduct()">Discard</el-button>
        <el-button class="btn btn-w btn-primary" type="primary" @click="insertNewProduct()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import { Message } from 'element-ui';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      activeLink: 'product',
      showEditModalVisible: false,
      showDeleteModalVisible: false,
      showAddModalVisible: false,
      editProduct: {
        name: '',
        id: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: null,
      },
      newProduct: {
        name: '',
        id: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: null,
      },
      products: [],
      fileList: [],
      categories: [
        { value: 'Korean', label: 'Korean' },
        { value: 'Snacks', label: 'Snacks' },
        { value: 'Beverages', label: 'Beverages' },
        { value: 'Desserts', label: 'Desserts' }
      ],
    };
  },
  created() {
    this.fetchProducts();
  },
  watch: {
    'editProduct.image': {
      handler(newValue, oldValue) {
        // Your logic to handle image changes goes here
      },
      deep: true
    }
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:8000/api/products')
        .then(response => {
          if (response.data.status === 200) {
            this.products = response.data.products;
          }
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    showEditModal(product) {
      this.editProduct = { ...product };
      console.log("image on edit mode", this.editProduct)
      this.editProduct.image = this.editProduct.image_url
      this.showEditModalVisible = true;
    },
    handleEditUploadImage(file, fileList) {
      this.fileList = fileList;
      this.editProduct.image = URL.createObjectURL(file.raw);
    },
    updateProduct() {
      axios.put(`http://localhost:8000/api/products/${this.editProduct.id}/edit`, this.editProduct)
        .then(response => {
          if (response.data.status === 200) {
            this.fetchProducts();
            this.showEditModalVisible = false;
          }
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    },
    showDeleteModal(productId) {
      this.deleteProductId = productId;
      this.showDeleteModalVisible = true;
    },
    deleteProduct() {
      axios.delete(`http://localhost:8000/api/products/${this.deleteProductId}/delete`)
        .then(response => {
          if (response.data.status === 200) {
            this.fetchProducts();
            this.showDeleteModalVisible = false;
          }
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    },
    handleNewUploadImage(file, fileList) {
      // const reader = new FileReader();
      // reader.readAsDataURL(file.raw);
      // reader.onload = () => {
      //   this.newProduct.image = reader.result;
      // };
      this.fileList = fileList;
      this.newProduct.image = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
    console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    saveNewProduct() {
      axios.post('http://localhost:8000/api/products', this.newProduct)
        .then(response => {
          if (response.data.status === 200) {
            this.fetchProducts();
            this.clearNewProductForm();
            this.showAddModalVisible = false;
          }
        })
        .catch(error => {
          console.error('Error adding new product:', error);
        });
    },
    async updateEditProduct() {
      try {
        // Create a new FormData object
        const formData = new FormData();

        // Append the product data to the FormData object
        for (const [key, value] of Object.entries(this.editProduct)) {
          formData.append(key, value);
        }

        // Append the image file to the FormData object
        if (this.fileList.length > 0) {
          const file = this.fileList[0].raw;
          formData.append('image', file, file.name);
        }

        let response;

        // Check if it's an edit operation
        if (this.editProduct.id) {
          // Edit operation
          response = await axios.post(`http://localhost:8000/api/product/${this.editProduct.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }

        if (response.data.status === 200) {
          this.fetchProducts();
          this.clearNewProductForm();
          this.showAddModalVisible = false;
          this.editProduct.id = null; // Reset the editProductId after a successful operation

          // Show success message
          Message.success('Product Updated Successfully');

          // Close the edit modal after a delay
          setTimeout(() => {
            this.showEditModalVisible = false;
          }, 2000); // Close after 2 seconds (adjust as needed)
        } else {
          console.error('Error with product operation:', response.data);
          // Optionally show an error message
          Message.error('Error updating product. Please try again.');
        }
      } catch (error) {
        console.error('Error with product operation:', error);
        // Optionally show an error message
        Message.error('Error updating product. Please try again.');
      }
    },

    async insertNewProduct() {
      try {
        // Create a new FormData object
        const formData = new FormData();

        // Append the product data to the FormData object
        for (const [key, value] of Object.entries(this.newProduct)) {
          formData.append(key, value);
        }

        // Append the image file to the FormData object
        if (this.fileList.length > 0) {
          const file = this.fileList[0].raw;
          formData.append('image', file, file.name);
        }

        // Send the FormData object to the server
        const response = await axios.post('http://localhost:8000/api/product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.status === 200) {
          this.fetchProducts();
          this.clearNewProductForm();
          this.showAddModalVisible = false;
        } else {
          console.error('Error adding new product:', response.data);
        }
      } catch (error) {
        console.error('Error adding new product:', error);
      }
    },
    discardNewProduct() {
      this.clearNewProductForm();
      this.showAddModalVisible = false;
    },
    clearNewProductForm() {
      this.newProduct = {
        name: '',
        id: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: null,
      };
    },
    removeEditImage() {
      const product = {...this.editProduct}
      product.image = null;
      product.image_url = null; // Add this line
      this.editProduct = {}
      this.editProduct = product
      console.log(this.editProduct);
    },
  }
};
</script>


<style>
.admin-product {
  display: flex;
  height: 100vh;
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
  cursor: pointer;
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
/* .btn-warning{
  background-color:  ;
} */
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
