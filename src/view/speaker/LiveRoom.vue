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
                <button type="button" class="btn btn-danger" @click="endEventLive">End</button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <section class="together_we_join minh-custom with-footer speaker-room-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3 offset-md-1" v-if="current_user">
            <div class="border-l text-left">
              <p>{{current_seq_name}}</p>
            </div>
            <div class="profile-pic">
              <img :src="current_user.profile_url" class="mr-2 mb-1 live_profile_img"> {{current_user.speaker_name}}
            </div>
            <h6 class="text-primary mt-3">{{current_user.bio}}</h6>

          </div>
          <div class="col-md-6">
            <div class="mt-3">
              <video autoplay v-show="runningVideo" class="w-100 img-fluid"></video>
            </div>
          </div>
          <div class="col-md-2">
            <div class="participate participate-box" v-if="waiting">
              <div class="w-100 text-right" v-if="current_user && current_user.content_type_id==content_type_id">
                <button class="btn btn-blank" @click="endMyLive">END</button>
              </div>
              <ul class="list-unstyled mb-0" v-if="current_user">
                <li class="mr-0">
                  <i>
                    <img :src="require('@/assets/img/i-icon.png')">
                  </i>
                  <img :src="current_user.profile_url" class="img-fluid" />
                  <p class="text-custom mb-0" style="font-size: 1rem">
                    {{current_user.speaker_name}}
                  </p>
                  <div class="mt-2" v-if="current_user && current_user.content_type_id!=content_type_id">
                    <button type="button" class="btn btn-info btn-sm" @click="passLive()">Pass the Mic Override</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <div class="participate speaker_list">
            <ul class="list-unstyled mb-0">
              <li v-for="speaker in speakers" :key="speaker.content_type_id">
                <i>
                  <img :src="require('@/assets/img/i-icon.png')">
                </i>
                <img :src=speaker.profile_url class="img-fluid">
                <span v-if="event && speaker.content_type_id==current_user.content_type_id">
                    Live
                </span>
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
                  <ul class="list-unstyled mb-0" v-if="current_user">
                    <li>
                      <i>
                        <img :src="require('@/assets/img/i-icon.png')">
                      </i>
                      <img :src=current_user.profile_url class="img-fluid" />
                      <p class="text-custom">{{current_user.name}}</p>
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
  import {admin_key, apiBaseUrl, company_prefix, liveBaseUrl} from '../../constants/config';
  import {mapActions} from "vuex";
  import Room from 'janus-room';
  import {janusUrl, iceServer} from "../../constants/config";

  export default {
  data () {
    return {
      room: null,
      plugin: null,
      runningVideo: false,
      stream: null,
      error: null,
      speakers:[],
      event: null,
      visitors:[],
      current_user:null,
      event_id:null,
      content_type_id: null,
      show_note_modal:false,
      show_count_modal:false,
      show_mini_modal:false,
      count_number : 10,
      connection: null,
      my_info:null,
      current_seq_name:'',
      waiting:true,
    }
  },
  mounted() {
    //current speaker id
    this.event_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).event_id:0;
    this.content_type_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:0;

    this.connection = new WebSocket(liveBaseUrl);
    let ref = this;
    this.connection.onmessage = function(event) {
      //this.isLoading = false;
      let data = JSON.parse(event.data);
      console.log(data)
      if(data.type == 'change_live') {
        ref.receiveLiveUser(data.order, data.speaker);
      } else if(data.type == 'user_info') {
        ref.connection.send(JSON.stringify({
          type: "my_info",
          event_id: ref.event_id,
          content_type_id: ref.content_type_id
        }));
      } else if(data.type=="end_live"){
        //route after finishes lives
        this.$router.push('/speaker/parting')
      }
    };

    this.getDetail();
  },
  methods:{
    onLocalJoin() {
      console.log("Receive Local video");
      this.runningVideo = true;
      let target = document.getElementsByTagName('video')[0];
      this.room.attachStream(target, 0);
    },
    onRemoteJoin(index, remoteUsername, feedId) {
      console.log("Receive Remote video");
      this.runningVideo = true;
      let target = document.getElementsByTagName('video')[0];
      this.room.attachStream(target, index);
    },
    onRemoteUnjoin(index) {
      this.runningVideo = false;
    },
    onMessage(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
    registerUserName() {
      console.log("User Name is " + this.content_type_id);
      this.room.register({
        username: 'speaker_' + this.content_type_id,
        room: parseInt(company_prefix) + this.event_id
      });

    },
    setStream(stream) {
      if (stream.active) {
        this.stream = stream
      } else {
        this.stream = null
      }
    },
    onCleanup() {
      this.stream = null;
      this.status = null;
      this.error = null
    },
    changeVideoStream(stream) {
      this.stream = stream;
    },
    stopLive() {
      this.runningVideo = false;
      this.room.unpublishOwnFeed();
    },
    startLive() {
      var publishOwnFeed = false;
      if(this.current_user.content_type_id == this.content_type_id) {
        publishOwnFeed = true;
      }
      var options = {
        server: janusUrl, // required
        iceservers: iceServer,
        // Event handlers
        onLocalJoin: this.onLocalJoin,
        onRemoteJoin: this.onRemoteJoin,
        onRemoteUnjoin: this.onRemoteUnjoin,
        onMessage: this.onMessage,
        onError: this.onError,
        room: parseInt(company_prefix) + this.event_id,
        publishOwnFeed: publishOwnFeed,
      };
      this.room = new Room(options);
      var ref = this;
      this.room.init()
              .then(function(){
                ref.createRoom();
              })
              .catch(function(err){
                console.log(err);
              });
    },
    createRoom() {
      var ref = this;
      this.room.createRoom({
        room: parseInt(company_prefix) + this.event_id,
        publishers: 100,
        admin_key: admin_key
      })
              .then(() => {
                setTimeout(function() {
                  ref.registerUserName();
                }, 1000);
              })
              .catch((err) => {
                alert(err);
              })

    },
    ...mapActions(['signOut']),
    logout() {
      this.signOut();
      this.$router.push('/login')
    },
    countDown(){
      this.show_count_modal = true;
      this.count_number = 10;
      this.countDownTimer();
    },
    countDownTimer() {
      if(this.count_number > 0) {
        setTimeout(() => {
          this.count_number -= 1
          this.countDownTimer()
        }, 1000)
      }else{
        this.waiting = true;
        this.show_count_modal = false;
        this.setCurrentUser(this.content_type_id);
        if(this.current_user.speaker_type!=0){
          this.publishOwnFeed();
        }
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
            ref.visitors = detail.visitors;
            for(i = 0; i < ref.visitors.length; i ++) {
              ref.visitors[i].profile_url = apiBaseUrl + "/" + ref.visitors[i].profile_url;
            }
            ref.event = detail.event;
            ref.event.program_url = apiBaseUrl + "/" + ref.event.program_url;
            ref.setCurrentOrder(ref.event.cur_order);
            ref.setCurrentUser(ref.event.cur_speaker);
            ref.startLive();
          }
        })
        .catch((error) => {
        })
    },
    setCurrentUser(speaker) {
      this.event.cur_speaker = speaker;
      for(var i = 0; i < this.speakers.length; i ++) {
        if(this.speakers[i].content_type_id == speaker) {
          this.current_user = this.speakers[i];
        }
      }
      if(this.current_user.speaker_type == 0){
        this.setVideoUrl|(this.current_user.video_url);
      }
    },
    setCurrentOrder(order){
      this.event.cur_order = order;
      for(var i = 0; i < this.speakers.length; i ++) {
        if(this.speakers[i].order == order) {
          this.current_seq_name = this.speakers[i].name;
        }
      }
    },
    receiveLiveUser(order, speaker) {
      console.log("receive")
      this.setCurrentOrder(order);


      if(speaker == this.content_type_id) {
        this.waiting = false;
        this.countDown();
      } else {
        this.setCurrentUser(speaker);
        this.stopLive();
      }

    },
    setVideoUrl(url){
      let target = document.getElementsByTagName('video')[0];
      target.src = url;
      target.load();
    },
    changeLiveUser(order, speaker) {
      var ref = this;
      console.log("Change Order" + order);
      getApiManager()
        .post(`${apiBaseUrl}/api/speaker/event/modify`, {cur_order: order, cur_speaker: speaker})
        .then((response) => {
          let res = response.data;
          if(res.status===true) {
            ref.connection.send(JSON.stringify({
              type: 'change_live',
              order: order,
              speaker: speaker
            }));
            ref.setCurrentOrder(order);
            ref.setCurrentUser(speaker);
          }
        })
        .catch((error) => {
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: 'Server Error',
            animation_type: 'slide'
          });
        });
    },
    publishOwnFeed() {
      this.room.publishOwnFeed({
        audioSend: true,
        videoSend: true,
        replaceVideo: true,
        replaceAudio: true,
      });
    },
    endEventLive() {
      var ref = this;
      getApiManager()
        .post(`${apiBaseUrl}/api/speaker/event/modify`, {status: 3})
        .then((response) => {
          let res = response.data;
          if(res.status===true) {
            ref.connection.send(JSON.stringify({
              type: 'end_live'
            }));
            this.$router.push('/speaker/parting')
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
    endMyLive() {
      this.stopLive();
      for(var i = 0; i < this.speakers.length; i ++) {
        if(this.speakers[i].order == this.event.cur_order) {
          if(i == this.speakers.length - 1) {
            this.endEventLive();
          } else {
            this.changeLiveUser(this.speakers[i + 1].order, this.speakers[i + 1].content_type_id);
          }
          return ;
        }
      }
      this.endEventLive();
    },
    passLive() {
      for(var i = 0; i < this.speakers.length; i ++) {
        if(this.speakers[i].content_type_id == this.content_type_id) {
          this.changeLiveUser(this.event.cur_order, this.speakers[i].content_type_id);
          this.countDown();
          break;
        }
      }
    },

  },
  components: {
  },
  computed: {
  },
  watch:{

  }
}
</script>
