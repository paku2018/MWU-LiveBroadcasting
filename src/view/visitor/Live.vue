<template>
  <div role="main" class="main">
    <section class="common-page with-footer speaker-room-page" style="min-height: 580px">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <p>{{current_seq_name}}</p>
            <div class="profile-pic" v-if="current_user">
              <img :src="current_user.profile_url" class="mr-2 mb-1 live_profile_img"> {{current_user.speaker_name}}
            </div>
          </div>
          <div class="col-md-7 offset-lg-1"></div>
          <div class="col-md-4 order-4 order-lg-0">
            <h6 class="text-primary mt-3" v-if="current_user">{{current_user.bio}}</h6>
          </div>
          <div class="col-md-7 offset-lg-1">
            <div class="photo-frame">
              <video autoplay v-show="runningVideo" class="w-100 img-fluid"></video>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-center">
        <div class="col-md-2">
          <p class="text-primary">LIVE MESSAGES:</p>
        </div>
        <div class="col-md-4">
          <div class="profile-pic border-0">
            <img src="assets/img/SamanthaGrey.png" class="mr-2"> Samantha Grey
          </div>
          <p class="text-primary mt-2">Lorem ipsum is the beginning of a pseudo-Latin passage commonly used as placeholder text when a graphic.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import {getApiManager} from "../../api";
  import {admin_key, apiBaseUrl, company_prefix, liveBaseUrl} from '../../constants/config';
  import Room from 'janus-room';
  import {janusUrl, iceServer} from "../../constants/config";

  export default {
  data () {
    return {
      runningVideo: false,
      event_id:0,
      speakers: [],
      visitors: [],
      event: null,
      visitor_id: 0,
      connection: null,
      room: null,
      current_seq_name:'',
      current_user:null
    }
  },
  mounted() {
    this.event_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).event_id:0;
    this.visitor_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:0;
    this.getDetail();

    this.connection = new WebSocket(liveBaseUrl);
    let ref = this;
    this.connection.onmessage = function(event) {
      //this.isLoading = false;
      let data = JSON.parse(event.data);
      if(data.type == 'change_live') {
        ref.receiveLiveUser(data.order, data.speaker);
      } else if(data.type == 'user_info') {
        ref.connection.send(JSON.stringify({
          type: "my_info",
          event_id: ref.event_id,
        }));
      }else if(data.type=="end_live"){
        this.$router.push('/visitor/parting')
      }
    };
  },
  methods:{
    getDetail() {
      var ref = this;
      getApiManager()
        .post(`${apiBaseUrl}/api/visitor/all`,{event_id:this.event_id})
        .then((response) => {
          let res = response.data;
          if(res.status===true) {
            let detail = res.detail;
            ref.speakers = detail.speakers;
            for(var i = 0; i < ref.speakers.length; i ++) {
              ref.speakers[i].profile_url = apiBaseUrl + "/" + ref.speakers[i].profile_url;
            }
            ref.visitors = detail.visitors;
            for(i = 0; i < ref.visitors.length; i ++) {
              ref.visitors[i].profile_url = apiBaseUrl + "/" + ref.visitors[i].profile_url;
            }
            ref.event = detail.event;
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
      this.event.cur_order = order;
      this.event.cur_speaker = speaker;
      this.setCurrentOrder(order);
      this.setCurrentUser(speaker);
    },
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
      this.room.register({
        username: 'visitor_' + this.visitor_id,
        room: parseInt(company_prefix) + this.event_id,
      });

    },
    startLive() {
      var publishOwnFeed = false;
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
