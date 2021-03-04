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
                <button class="btn btn-danger">End</button>
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
                <span v-if="speaker.id==live_id">
                    Live
                </span>
                <div class="mt-2 d-table" v-if="speaker.content_type_id==first_content_id">
                  <button type="button" class="btn btn-warning btn-sm" v-if="speaker.content_type_id==content_type_id" style="width: 6rem" @click="countDown">Start</button>
                  <button type="button" class="btn btn-warning btn-sm" v-if="speaker.content_type_id!=content_type_id" @click="countDown">Pass the mic</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-5 text-center text-lg-right" v-if="event">
          <img :src="event.program_url" class="img-fluid">
        </div>
      </div>
    </footer>

    <!-- Eulogy Notes -->
    <transition name="pop" appear>
    <div class="modal fade show custom-modal" v-if="show_note_modal" id="EulogyNotes" tabindex="-1" role="dialog" aria-labelledby="Eulogy Notes" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="row">
              <div class="col-lg-12">
                <h5 class="text-custom"><img src="assets/img/move_icon.png"> Eulogy Notes</h5>
              </div>
              <div class="col-lg-12 text-custom mt-4 scroll-notes">
                <p>Lorem ipsum is the beginning of a pseudo-Latin passage commonly used as placeholder text when a graphic designer dummies up a page layout. It's intended to show how the type will look before the copy is available. I say pseudo-Latin
                  because though the passage contains recognizable Latin words, they don't seem to add up to anything, and some are just jabberwocky.</p>
                <p>I say pseudo-Latin because though the passage contains recognizable Latin words, they don't seem to add up to anything, and some are just jabberwocky.</p>
                <p>I say pseudo-Latin because though the passage contains recognizable Latin words,.</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </transition>

    <!-- Countdown -->
    <transition name="pop" appear>
    <div class="modal fade show custom-modal" v-if="show_count_modal" id="Countdown" tabindex="-1" role="dialog" aria-labelledby="Countdown" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-4 text-center">
                <div class="participate">
                  <ul class="list-unstyled mb-0" v-if="my_info">
                    <li>
                      <i>
                        <img :src="require('@/assets/img/i-icon.png')">
                      </i>
                      <img :src=my_info.profile_url class="img-fluid" />
                      <p class="text-custom">{{my_info.name}}<br>
                        <small>Eulogy Reading</small>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-8 text-center">
                <h5 class="text-custom my-4">You will be LIVE in</h5>
                <div class="countdown">
                  {{count_number}}
                </div>
                <p class="text-white mt-5">40 People attending are watching you now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </transition>
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
      my_info:null,
      event_id:0,
      live_id:0,
      first_content_id:1,
      show_note_modal:false,
      show_count_modal:false,
      count_number : 10,
      checkTimer: null,
      content_type_id: 0,
      event:null
    }
  },
  mounted() {
    this.content_type_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:0;
    this.event_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).event_id:0;
    this.getDetail();
    this.checkTimer = setInterval(() => {
      this.checkLive()
    }, 1000 * 10);
  },
  methods:{
    ...mapActions(['signOut']),
    logout() {
      this.signOut();
      this.$router.push('/login')
    },

    countDown(){
      getApiManager()
        .post(`${apiBaseUrl}/api/speaker/event/modify`, {status: 2, cur_speaker: this.content_type_id})
        .then((response) => {

          let res = response.data;
          if(res.status===true) {
            clearInterval(this.checkTimer);
            this.show_count_modal = true;
            this.countDownTimer();
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
        });
    },
    countDownTimer() {
      if(this.count_number > 0) {
        setTimeout(() => {
          this.count_number -= 1
          this.countDownTimer()
        }, 1000)
      }else{
        this.start();
      }
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
            for(var i = 0; i < ref.speakers.length; i ++) {
              ref.speakers[i].profile_url = apiBaseUrl + "/" + ref.speakers[i].profile_url;
              if(ref.speakers[i].content_type_id==ref.content_type_id){
                ref.my_info = ref.speakers[i];
              }
            }
            ref.first_content_id = ref.speakers[0].content_type_id;
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
    checkLive() {
      getApiManager()
        .post(`${apiBaseUrl}/api/speaker/event/get`)
        .then((response) => {
          let res = response.data;
          if(res.status===true) {
            let detail = res.detail;
            if(detail.status == 2) {
              clearInterval(this.checkTimer);
              this.$router.push('/speaker/live');
            }
          }
        })
        .catch((error) => {
        })
    },
    start(){
      clearInterval(this.checkTimer);
      this.count_number = 10;
      this.show_count_modal = false;
      this.$router.push('/speaker/live')
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
