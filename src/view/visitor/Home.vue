<template>
  <div role="main" class="main">
    <section class="common-page minh-100 home-page" style="background: none">
      <div class="container max-height d-flex align-items-center justify-content-center">
        <div class="row flex-grow-1">
          <transition name="fade">
            <div class="col-12 text-center" v-show="page=='home'">
              <h1 class="mb-0 text-white" style="letter-spacing: 0.3rem;">MOURN WITH US</h1>
              <h3 class="text-white text-overline">AN INCLUSIVE ONLINE FUNERAL EXPERIENCE</h3>
            </div>
          </transition>
          <transition name="fade">
            <div class="col-12 col-md-6 offset-md-3 text-center" v-show="page=='info'">
              <div class="card">
                <div class="card-header">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center w-100">
                      <div class="image mb-0">
                        <img :src="'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'" class="img-fluid br-50">
                      </div>
                      <div class="image-title text-left">
                        <h5 class="mb-1">Susie Tucker</h5>
                        <h6 class="mb-0 text-grey">Today at 6:00 PM</h6>
                      </div>
                    </div>
                    <div>
                      <button class="btn btn-primary" @click="gotoProfile">Next</button>
                    </div>
                  </div>
                  <h6 class="text-left mt-2 mb-0">Susie W. Tucker - Online funeral service - 4/1/2020 2:00pm PST</h6>
                </div>
                <div class="card-body">
                  <h6 class="text-left">If you would like to purchase flowers, please register yourself for the service several days in advance,
                    you will see the option to purchase there. Have a look at all the pre-service activities once you've registered.
                  All pre-service activities can be done days before the service to 30 minutes before the online service begins. Thank you.</h6>
                </div>
                <div class="card-footer">
                  <h4 class="text-left">Online Funeral | mournwithus.com - Online Real Time Streaming Funeral Services</h4>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import { ref } from 'vue'
  export default {
  data () {
    return {
      page:"home",
      e_id:0
    }
  },
  mounted() {
    window.setTimeout(() => {
      this.page = ""
    }, 3000)
    window.setTimeout(() => {
      this.page = "info"
    }, 4000)
    this.e_id = this.$route.params.id;
  },
  methods:{
    gotoProfile(){
      this.$router.push('/visitor/profile/'+this.e_id)
    }
  },
  components: {

  },
  computed: {
  },
  watch:{

  },
}
</script>
