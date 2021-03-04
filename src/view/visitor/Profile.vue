<template>
  <div role="main" class="main">
    <transition name="fade">
      <section class="common-page minh-100 d-flex align-items-center" v-if="page==='home'">
          <div class="container">
            <div class="col-12 text-center">
              <h1 class="mb-0 text-white" style="letter-spacing: 0.3rem;">MOURN WITH US</h1>
              <h3 class="text-white text-overline">AN INCLUSIVE ONLINE FUNERAL EXPERIENCE</h3>
            </div>
          </div>
      </section>
    </transition>
    <section class="guestbook-registration image-page" v-show="page=='profile'">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-9">
            <div class="border-l text-left">
              <p>GUESTBOOK REGISTRATION</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="custom-group mb-3">
              <div class="photo-preview d-flex align-items-center">
                <div class="upload-photo pointer mr-3" v-if="!profile.image" @click="$refs.image.click()">
                  Click to add your photo
                </div>
                <div class="flower pointer mr-3" v-if="profile.image" style="margin-bottom: .5rem" @click="$refs.image.click()">
                  <img :src="avatar_url" class="img-fluid round-image">
                </div>
                <div class="photo-action text-left">
                  <input type="file" ref="image" @change="inputFile" accept="image/x-png,image/gif,image/jpeg" style="display:none">
                  <h6 class="text-primary mt-2">Or select and photo profile from the photos on the right</h6>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="d-flex mb-2">
                  <input type="text" class="form-control" v-model="profile.full_name" placeholder="Type your name here">
                  <button type="button" class="btn btn-primary" @click="goDashboard">Submit</button>
                </div>
                <div class="img-box">
                  <img :src="require('@/assets/img/how-it-works.png')" class="img-fluid float-left mr-2" style="border-radius: 0">
                  <label class="text-primary">How<br> This<br> Works
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower1.png')" class="img-fluid" @click="setImage('flower1.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower2.png')" class="img-fluid" @click="setImage('flower2.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower3.png')" class="img-fluid" @click="setImage('flower3.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower4.png')" class="img-fluid" @click="setImage('flower4.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower5.png')" class="img-fluid" @click="setImage('flower5.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower6.png')" class="img-fluid" @click="setImage('flower6.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower7.png')" class="img-fluid" @click="setImage('flower7.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower8.png')" class="img-fluid" @click="setImage('flower8.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower9.png')" class="img-fluid" @click="setImage('flower9.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower10.png')" class="img-fluid" @click="setImage('flower10.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower11.png')" class="img-fluid" @click="setImage('flower11.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower12.png')" class="img-fluid" @click="setImage('flower12.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower13.png')" class="img-fluid" @click="setImage('flower13.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower14.png')" class="img-fluid" @click="setImage('flower14.png')">
              </a>
            </div>
            <div class="flower">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower15.png')" class="img-fluid" @click="setImage('flower15.png')">
              </a>
            </div>
            <div class="flower mb-lg-0">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower16.png')" class="img-fluid" @click="setImage('flower16.png')">
              </a>
            </div>
            <div class="flower mb-lg-0">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower17.png')" class="img-fluid" @click="setImage('flower17.png')">
              </a>
            </div>
            <div class="flower mb-lg-0">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower18.png')" class="img-fluid" @click="setImage('flower18.png')">
              </a>
            </div>
            <div class="flower mb-lg-0">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower19.png')" class="img-fluid" @click="setImage('flower19.png')">
              </a>
            </div>
            <div class="flower mb-lg-0">
              <a href="javascript:void(0);">
                <img :src="require('@/assets/img/flower20.png')" class="img-fluid" @click="setImage('flower20.png')">
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="footer" v-show="page=='profile'">

    </div>
  </div>
</template>
<script>
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from "../../constants/config";
  import {mapActions} from "vuex";

  export default {
  data () {
    return {
      page:"home",
      profile:{
        event_id:0,
        full_name:'',
        image:null,
        type:"default",
        profile_url:''
      },
      avatar_url:null,
    }
  },
  mounted() {
    this.profile.event_id = this.$route.params.id;
    getApiManager()
            .post(`${apiBaseUrl}/api/visitor/profile/get-event`, {event_id:this.profile.event_id})
            .then((response) => {
              let res = response.data;
              if(res.status===true){
                console.log("event")
              }
            })
            .catch((error) => {
              console.log(error)
            })
    window.setTimeout(() => {
      this.page = ""
    }, 3000)
    window.setTimeout(() => {
      this.page = "profile"
    }, 4000)
  },
  methods:{
    ...mapActions(['setLoggedInfo']),
    setImage(item){
      this.profile.profile_url = item
      this.profile.type = "default"
      this.profile.image = item;
      this.avatar_url= require('@/assets/img/'+item);
    },
    inputFile(event){
      this.profile.image = event.target.files[0];
      this.profile.type = "random";
      //set image to the div area
      var reader = new FileReader();
      var ref = this;
      reader.onload = function (e) {
        ref.avatar_url = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    save(){
      if(this.profile.full_name=='') {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Please input a name.',
          animation_type:'slide'
        });
        return;
      }
    },
    back(){
      this.$router.push('/home');
    },
    goDashboard(){
      const formData = new FormData();
      for (let key in this.profile) {
        formData.append(key, this.profile[key]);
      }
      getApiManager()
          .post(`${apiBaseUrl}/api/visitor/profile/create`, formData)
          .then((response) => {
            let res = response.data;
            if(res.status===true){
              this.setLoggedInfo({token: res.id, name:this.profile.full_name, role:'visitor',event_id:this.profile.event_id});
              localStorage.setItem('deceased_name',res.name);
              this.$router.push('/visitor/dashboard')
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
  },
  components: {

  },
  computed: {
  },
  watch:{

  }
}
</script>
