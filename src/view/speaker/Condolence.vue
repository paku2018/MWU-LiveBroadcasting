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
              <div class="action logout">
                <a href="#" class="text-yellow hover-yellow mr-3" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <section class="condolence custom-height">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="border-l">
              <p class="text-left">CONDOLENCES</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12 mb-lg-5">
                <p>{{message}}</p>
              </div>
              <div class="col-md-12 text-center mt-lg-5" v-if="speaker.speaker_name">
                <img :src="speaker.profile_url" class="img-fluid">
                <p class="mb-0"><small>
                  {{speaker.speaker_name}}
                </small></p>
              </div>
            </div>
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
      condolence_id:0,
      message:'',
      speaker:{
        speaker_name:'',
        profile_url:null
      },
      event:null
    }
  },
  mounted() {
    this.condolence_id = this.$route.params.c_id;
    getApiManager()
      .post(`${apiBaseUrl}/api/speaker/condolence/get-info`, {condolence_id:this.condolence_id})
      .then((response) => {
        let res = response.data;
        if(res.status===true){
          this.message = res.detail.message
          this.speaker.speaker_name = res.detail.speaker_name
          this.speaker.profile_url = `${apiBaseUrl}/`+res.detail.profile_url
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
    getApiManager()
            .post(`${apiBaseUrl}/api/speaker/event/get`)
            .then((response) => {
              let res = response.data;
              if(res.status===true) {
                let detail = res.detail;
                this.event = detail;
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
