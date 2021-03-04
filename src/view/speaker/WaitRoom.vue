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
                <a href="#" class="text-yellow hover-yellow mr-5" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
                <button class="btn btn-danger" @click="goLive">Start</button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <section class="together_we_join minh-custom with-footer speaker-room-page">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <p class="text-uppercase">Together we join you. We are here with you</p>
            <ul class="list-unstyled">
              <li v-for="visitor in visitors" :key="visitor.visitor_id" class="mr-3">
                <a href="#">
                  <img :src=visitor.profile_url class="img-fluid">
                </a>
                <br>
                <small> {{visitor.name}}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <div class="participate speaker_list">
            <ul class="list-unstyled mb-0">
              <li v-for="speaker in speakers" :key="speaker.speaker_id">
                <i>
                  <img :src="require('@/assets/img/i-icon.png')">
                </i>
                <img :src=speaker.profile_url class="img-fluid">
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-5 text-center text-lg-right" v-if="event">
          <img :src="event.program_url" class="img-fluid">
        </div>
<!--        <div class="col-md-3 text-center text-lg-right">-->
<!--          <p class="text-white">40 People<br> are participating in this event</p>-->
<!--        </div>-->
<!--        <div class="col-md-2 text-center text-lg-right">-->
<!--          <img :src="require('@/assets/img/obituary-sm.png')" class="img-fluid">-->
<!--        </div>-->
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
        speakers:[],
        visitors:[],
        checkTimer: null,
        event:null
    }
  },
  mounted() {
    this.getDetail();
    this.checkTimer = setInterval(() => {
      this.checkLive()
    }, 1000 * 10)
  },
  methods:{
    ...mapActions(['signOut']),
    logout() {
      this.signOut();
      this.$router.push('/login')
    },
    checkLive() {
      getApiManager()
        .post(`${apiBaseUrl}/api/speaker/event/get`)
        .then((response) => {
          let res = response.data;
          if(res.status===true) {
            let detail = res.detail;
            clearInterval(this.checkTimer);
            if(detail.status == 1) {
              this.$router.push('/speaker/start');
            } else if(detail.status == 2) {
              this.$router.push('/speaker/live');
            }
          }
        })
        .catch((error) => {
        })
    },
    getDetail() {
      var ref = this;
      getApiManager()
        .post(`${apiBaseUrl}/api/speaker/all`)
        .then((response) => {
          let res = response.data;
          if(res.status===true) {
            let detail = res.detail;
            ref.speakers = detail.speakers;
            var i;
            for(i = 0; i < ref.speakers.length; i ++) {
              ref.speakers[i].profile_url = apiBaseUrl + "/" + ref.speakers[i].profile_url;
            }
            ref.visitors = detail.visitors;
            for(i = 0; i < ref.visitors.length; i ++) {
              ref.visitors[i].profile_url = apiBaseUrl + "/" + ref.visitors[i].profile_url;
            }
            ref.event = detail.event;
            ref.event.program_url = apiBaseUrl + "/" + ref.event.program_url;
          }
        })
        .catch((error) => {
        })
    },
      goLive(){
        getApiManager()
          .post(`${apiBaseUrl}/api/speaker/event/modify`, {status: 1})
          .then((response) => {
            let res = response.data;
            if(res.status===true) {
              clearInterval(this.checkTimer);
              this.$router.push('/speaker/start')
            }
          })
          .catch((error) => {
            this.$notify({
              group: 'foo',
              type: 'warn',
              title: 'Error',
              text: 'Server Error',
              animation_type:'slide'
            });
          })

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
