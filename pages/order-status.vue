<template>
  <div class="container d-flex align-items-center justify-content-center" style="height: 100vh">
    <div class="row justify-content-center w-80">
      <div class="col-md-12">
        <div class="text-center m-4">
          <img src="~/static/logo.png" alt="Logo" class="img-fluid" style="max-width: 150px;">
        </div>
        <div class="timeline-horizontal d-flex align-items-center justify-content-between gap-4">
          <div class="timeline-item" :class="{ 'completed': status === 'accepted', 'inactive': status !== 'accepted' }">
            <div class="timeline-icon" :class="{ 'pulse': status === 'accepted' }">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="timeline-content mt-2" :class="{ 'text-muted': status !== 'accepted' }">
              <h5>Order Accepted</h5>
            </div>
          </div>
          <div class="timeline-item" :class="{ 'completed': status === 'preparing', 'inactive': status !== 'preparing' }">
            <div class="timeline-icon" :class="{ 'pulse': status === 'preparing' }">
              <i class="bi bi-hourglass-split"></i>
            </div>
            <div class="timeline-content mt-2" :class="{ 'text-muted': status !== 'preparing' }">
              <h5>Preparing Your Order</h5>
            </div>
          </div>
          <div class="timeline-item" :class="{ 'completed': status === 'ready', 'inactive': status !== 'ready' }">
            <div class="timeline-icon" :class="{ 'pulse': status === 'ready' }">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="timeline-content mt-2" :class="{ 'text-muted': status !== 'ready' }">
              <h5>Order Ready for Pickup</h5>
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
      status: 'accepted',
    };
  },
};
</script>

<style scoped>
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
  background-color: #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
}

.timeline-item.completed .timeline-icon {
  background-color: #28a745;
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
    transform: scale(1.1);
  }
}
</style>
