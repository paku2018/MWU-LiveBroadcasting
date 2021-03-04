<template>
  <div role="main" class="main">
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

  export default {
  data () {
    return {
      event_id:0,
      type:'shop',
      page_title:'ONLINE SHOP',
      page_url:''
    }
  },
  mounted() {
    this.type = this.$route.params.type;
    this.event_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).event_id:0;

    getApiManager()
            .post(`${apiBaseUrl}/api/visitor/profile/get-event`, {event_id:this.event_id})
            .then((response) => {
              let res = response.data;
              if(res.status===true){
                if(this.type=="shop"){
                  this.page_url = res.detail.flowershop_url;
                }else if(this.type=="donation")
                  this.page_url = res.detail.donation_url;
                else if(this.type=="calendar")
                  this.page_url = res.detail.reminder_url;
              }
              else{
                this.$notify({
                  group: 'foo',
                  type: 'warn',
                  title: 'Error',
                  text: 'Server Error',
                  animation_type:'slide'
                });
                return;
              }
            })
            .catch((error) => {
              console.log(error)
            })
  },
  methods:{
    goBack(){
      this.$router.push('/visitor/dashboard');
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
