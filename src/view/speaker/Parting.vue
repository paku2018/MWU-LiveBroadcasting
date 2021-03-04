<template>
  <div role="main" class="main">
    <header class="header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12">
            <nav class="navbar navbar-expand-md navbar-dark pl-lg-0">
              <a class="navbar-brand" href="javascript:void(0);">{{event_info?event_info.decease_name:"MOURN WITH US"}}</a>
              <div class="navbar-list">
                <router-link tag="a" class="text-yellow hover-yellow mr-3 mr-md-5" to="/speaker/profile">Profile</router-link>
              </div>
              <div class="action logout">
                <a href="#" class="text-yellow hover-yellow mr-3" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <section class="common-page with-footer speaker-room-page" style="min-height: 560px">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="row">
              <div class="col-12">
                <div class="border-l text-left">
                  <p v-if="event_info">PARTING</p>
                </div>
              </div>
              <div class="col-md-7">
                <div class="img-box pointer" @click="goNext('upload_photo')">
                  <img :src="require('@/assets/img/upload-photo.png')" class="img-fluid float-left mr-2">
                  <label class="text-primary">Upload<br>
                    Your<br>
                    Photos
                  </label>
                </div>
                <div class="img-box pointer" @click="goNext('donation')">
                  <img :src="require('@/assets/img/DonateWithPaypal.png')" class="img-fluid float-left mr-2">
                  <label class="text-primary">Donate
                    With<br>
                    <b>PayPal</b>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-7" v-if="event_info">
            <img :src="event_info.program_url" class="img-fluid">
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-end">
        <div class="col-md-4">
          <div class="form-group">
            <textarea class="form-control" rows="3" placeholder="Please leave a personal mesagge or a memory here" v-model="message"></textarea>
          </div>
        </div>
        <div class="col-md-2 pl-lg-0">
          <div class="form-group">
            <button type="button" class="btn btn-primary btn-sm" @click="goNext('condolence')">Send your condolences</button>
          </div>
        </div>
        <div class="col-md-5 border-left pl-lg-4">
          <div class="img-box mt-0 form-group">
            <img :src="require('@/assets/img/parting-footer.png')" class="img-fluid float-left mr-2">
            <label class="text-primary">Leave a Voice Condolence<br>
              <b v-if="event_info">{{event_info.tel}}</b>
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
      event_info:null,
      message:''
    }
  },
  mounted() {
    getApiManager()
      .post(`${apiBaseUrl}/api/speaker/event/get`)
      .then((response) => {
        let res = response.data;
        if(res.status===true) {
          let detail = res.detail;
          this.event_info = detail;
          this.event_info.program_url = `${apiBaseUrl}/`+this.event_info.program_url;
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
    goNext(page){
      if(page=="condolence"){
        if(this.message==''){
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Waring',
            text: 'Please input the message.',
            animation_type:'slide'
          });
          return;
        }
        getApiManager()
          .post(`${apiBaseUrl}/api/speaker/condolence/create`, { message:this.message})
          .then((response) => {
            let res = response.data;
            if(res.status===true){
              this.$router.push('/speaker/condolence/'+res.condolence_id);
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
      }
      else if(page=="upload_photo")
        this.$router.push('/speaker/'+page);
      else{
        this.$router.push('/speaker/page/'+page);
      }
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
