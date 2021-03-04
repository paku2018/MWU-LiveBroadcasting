<template>
  <div role="main" class="main">
    <header class="header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12">
            <nav class="navbar navbar-expand-md navbar-dark pl-lg-0">
              <a class="navbar-brand" href="javascript:void(0);">{{event?event.decease_name:"MOURN WITH US"}}</a>
              <div class="navbar-list">
                <router-link tag="a" class="text-yellow hover-yellow mr-3 mr-md-5" to="/speaker/profile">Profile</router-link>
              </div>
              <a href="#" class="text-yellow hover-yellow logout" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <section class="upload-your-photo with-footer pb-3">
      <div class="container">
        <div class="row mt-3">
          <div class="col-md-12">
            <iframe :src="page_url" width="100%" height="425"></iframe>
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
  import {mapActions} from "vuex";

  export default {
  data () {
    return {
      type:'shop',
      page_url:'',
      event:null
    }
  },
  mounted() {
    this.type = this.$route.params.type;
    getApiManager()
            .post(`${apiBaseUrl}/api/speaker/event/get`)
            .then((response) => {
              let res = response.data;
              if(res.status===true) {
                this.event = res.detail
                if(this.type=="shop"){
                  this.page_url = res.detail.flowershop_url;
                }else if(this.type=="donation")
                  this.page_url = res.detail.donation_url;
                else if(this.type=="calendar")
                  this.page_url = res.detail.reminder_url;
              }
            })
            .catch((error) => {
              console.log(error)
            })
  },
  methods:{
    ...mapActions(['signOut']),
    logout() {
      this.signOut();
      this.$router.push('/login')
    },
    goBack(){
      this.$router.push('/speaker/parting');
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
