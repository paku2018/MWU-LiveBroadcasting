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
                <a href="#" class="text-yellow hover-yellow mr-3 mr-md-5" @click="moveLive">Live</a>
              </div>
              <a href="#" class="text-yellow hover-yellow logout" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <section class="common-page minh-100 guestbook-registration image-page">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-9">
            <div class="border-l text-left">
              <p>Profile</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mb-3">
            <h4 class="text-yellow mb-1">Edit your profile</h4>
          </div>
          <div class="col-12 col-md-6">
            <div class="custom-group">
              <div class="photo-preview d-flex align-items-center">
                <div class="upload-photo mr-3" v-if="!image_url">
                  Your photo in here
                </div>
                <div class="flower mr-3" v-if="image_url" style="margin-bottom: .5rem">
                  <img :src="image_url" class="img-fluid round-image">
                </div>
                <div class="photo-action text-left">
                  <input type="file" ref="avatarFile" @change="inputFile" accept="image/x-png,image/gif,image/jpeg" style="display:none">
                  <button type="button" class="btn btn-primary" @click="$refs.avatarFile.click()">Upload your picture</button>
                  <h6 class="text-primary mt-2">Or select and photo profile from the photos on the right</h6>
                </div>
              </div>
              <div class="mt-3">
                <b-button type="button" class="btn-primary mr-3" @click="save">Submit</b-button>
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
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from "../../constants/config";

  export default {
  data () {
    return {
      profile:{
        image:null,
        type:'default',
        profile_url:''
      },
      image_url:'',
      event:null
    }
  },
  mounted() {
    getApiManager()
          .post(`${apiBaseUrl}/api/speaker/profile/get-info`)
          .then((response) => {
            let res = response.data;
            if(res.status===true) {
              this.image_url = `${apiBaseUrl}/`+res.detail.profile_url
              this.profile.profile_url = ''
            }else{
              if(res.error==null){
                this.$notify({
                  group: 'foo',
                  type: 'error',
                  title: 'Error',
                  text: 'Server Error',
                  animation_type:'slide'
                });
              }
            }
          })
          .catch((error) => {
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
    setImage(item){
      this.profile.type = "default"
      this.profile.profile_url = item;
      this.profile.image = null;
      this.image_url= require('@/assets/img/'+item);
    },
    inputFile(event){
      this.profile.type = "random"
      this.profile.image = event.target.files[0];
      //set image to the div area
      var reader = new FileReader();
      var ref = this;
      reader.onload = function (e) {
        ref.image_url = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    moveLive() {
      getApiManager()
        .post(`${apiBaseUrl}/api/speaker/event/get`)
        .then((response) => {
          let res = response.data;
          console.log(res);
          if(res.status===true) {
            let detail = res.detail;

            if(detail.status == 0) {
              this.$router.push('/speaker/wait')
            } else if(detail.status == 1) {
              this.$router.push('/speaker/start')
            } else if(detail.status == 2){
              this.$router.push('/speaker/live')
            } else if(detail.status == 3){
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Finished',
                text: 'The event was already finished.',
                animation_type:'slide'
              });
            }
          }else{
            if(res.error==null){
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Error',
                text: 'Server Error',
                animation_type:'slide'
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    save(){
      if(this.profile.profile_url == '' && this.profile.image==null){
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: 'Please select an image.',
            animation_type:'slide'
          });
          return;
      }
      const formData = new FormData();
      for(let key in this.profile){
        formData.append(key,this.profile[key])
      }
        getApiManager()
            .post(`${apiBaseUrl}/api/speaker/profile/modify`, formData)
            .then((response) => {
              let res = response.data;
              if(res.status===true){
                this.$notify({
                  group: 'foo',
                  type: 'success',
                  title: 'Success',
                  text: 'The profile was saved successfully.',
                  animation_type:'slide'
                });
                return;
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
