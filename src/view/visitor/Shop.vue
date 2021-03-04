<template>
  <div role="main" class="main">
    <section class="common-page with-footer speaker-room-page">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-9">
            <div class="border-l text-left">
              <p>ONLINE SHOP</p>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <iframe :src="require('@/assets/img/online-flower-shop.jpg')" width="100%" height="425"></iframe>
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-end">
        <div class="col-md-9">
        </div>
        <div class="col-md-3">
          <div class="img-box mt-0 pointer" @click="goBack">
            <img :src="require('@/assets/img/return_program.png')" class="img-fluid float-left mr-2">
            <label class="text-primary">Return to<br>
              program
            </label>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from '../../constants/config';

  export default {
  data () {
    return {
      e_id:0
    }
  },
  mounted() {
    this.e_id = this.$route.params.id;
  },
  methods:{
    goBack(){
      this.$router.push('/visitor/dashboard/'+this.e_id);
    }
  },
  components: {

  },
  computed: {
  },
  watch:{

  }
}
</script>
