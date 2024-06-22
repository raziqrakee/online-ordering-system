<template>
  <div>
    <div class="header shadow">
      <div class="container d-flex align-items-center">
        <img src="@/static/logo.png" alt="Logo" class="logo">
        <h2 class="header-title">Your Order Status</h2>
      </div>
    </div>
    <div class="container d-flex mt-5 justify-content-center" style="height: 100vh">
      <div class="row justify-content-center w-80 mt-5 ">
        <div class="col-md-12">
          <div class="text-center m-4 visual-status">
            <img :src="statusImage" alt="Status Image" class="img-fluid" style="max-width: 150px;">
            <h5 class="mt-4">{{ statusText }}</h5>
          </div>
          <div class="timeline-horizontal d-flex align-items-center justify-content-between gap-4">
            <div class="timeline-item" :class="{ 'completed': status === 'received', 'inactive': status !== 'received' }">
              <div class="timeline-icon" :class="{ 'pulse': status === 'received' }">
                <img :src="receivedIcon" alt="Received Icon" class="w-100" :style="{ filter: status !== 'received' ? 'grayscale(100%)' : 'none' }">
              </div>
              <div class="timeline-content mt-2 text-center" :class="{ 'text-muted': status !== 'received' }">
                <p>Received</p>
              </div>
            </div>
            <div class="timeline-item" :class="{ 'completed': status === 'preparing', 'inactive': status !== 'preparing' }">
              <div class="timeline-icon" :class="{ 'pulse': status === 'preparing' }">
                <img :src="preparingIcon" alt="Preparing Icon" class="w-100" :style="{ filter: status !== 'preparing' ? 'grayscale(100%)' : 'none' }">
              </div>
              <div class="timeline-content mt-2 text-center" :class="{ 'text-muted': status !== 'preparing' }">
                <p>Preparing</p>
              </div>
            </div>
            <div class="timeline-item" :class="{ 'completed': status === 'ready', 'inactive': status !== 'ready' }">
              <div class="timeline-icon" :class="{ 'pulse': status === 'ready' }">
                <img :src="readyIcon" alt="Ready Icon" class="w-100" :style="{ filter: status !== 'ready' ? 'grayscale(100%)' : 'none' }">
              </div>
              <div class="timeline-content mt-2 text-center" :class="{ 'text-muted': status !== 'ready' }">
                <p>Ready</p>
              </div>
            </div>
          </div>
          <div class="text-center mt-5">
            <button @click="goToIndex" class="btn btn-link">Go to Home</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '~/plugins/event-bus';

export default {
  async asyncData({ params, $axios, $cookies }) {
    const orderId = params.id;
    if (!orderId) {
      console.error('Order ID is not provided');
      return;
    }

    try {
      const token = $cookies.get('token');
      const response = await $axios.get(`http://localhost:8000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { status: response.data.customer_order_status };
    } catch (error) {
      console.error('Error fetching order status:', error);
      return { status: '' };
    }
  },
  mounted() {
    EventBus.$on('order-updated', this.updateOrderStatus);
  },
  beforeDestroy() {
    EventBus.$off('order-updated', this.updateOrderStatus);
  },
  methods: {
    updateOrderStatus(order) {
      if (order.id === this.$route.params.id) {
        this.status = order.status;
      }
    },
    goToIndex() {
      this.$router.push('/');
    }
  },
  computed: {
    statusImage() {
      switch (this.status) {
        case 'received':
          return require('@/static/assets/order-accepted.png');
        case 'preparing':
          return require('@/static/assets/preparing-order.png');
        case 'ready':
          return require('@/static/assets/order-pickup.png');
        default:
          return require('@/static/logo.png');
      }
    },
    statusText() {
      switch (this.status) {
        case 'received':
          return 'Your Order Has Been Received';
        case 'preparing':
          return 'We Are Preparing Your Order';
        case 'ready':
          return 'Your Order is Ready for Pickup';
        default:
          return 'Please Order Again';
      }
    },
    receivedIcon() {
      return require('@/static/icon/done.png');
    },
    preparingIcon() {
      return require('@/static/icon/done.png');
    },
    readyIcon() {
      return require('@/static/icon/done.png');
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #FFE9F5;
  padding: 15px 0;
}
.logo {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
.header-title {
  margin: 0;
}
.timeline-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
}
.timeline-item.completed {
  transform: scale(1.1);
}
.timeline-item.inactive .timeline-icon {
  background-color: #ccc;
}
.timeline-item .timeline-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
}
.timeline-item h5 {
  margin: 0;
}
.timeline-item:last-child {
  margin-bottom: 0;
}
.pulse {
  animation: pulse 1s infinite alternate;
}
@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3);
  }
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>