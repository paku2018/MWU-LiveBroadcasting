<template>
  <div role="main" class="main">
    <section class="common-page minh-100 together_we_join speakers-page image-page guestbook-registration">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-9">
            <div class="border-l text-left">
              <p>Speakers</p>
            </div>
          </div>
          <div class="col-12 col-md-3 text-right">
            <b-button type="button" class="btn-primary" @click="addSpeaker" v-show="showList">✚ Add Speaker</b-button>
            <b-button type="button" class="btn-primary mr-3" @click="save" v-show="!showList">Save</b-button>
            <b-button type="button" class="btn-primary" @click="back" v-show="!showList">Back</b-button>
          </div>
          <div class="col-12" v-show="showList">
            <h4 class="text-center text-yellow">Speakers List</h4>
            <div class="participate">
              <ul class="list-unstyled">
                <li v-for="speaker in speakers" :key="speaker.id">
                  <div class="remove-icon"><i class="fa fa-times pointer" @click="removeSpeaker(speaker.content_type_id)"></i></div>
                  <img :src="speaker.img" class="img-fluid">
                  <br>
                  <small> {{speaker.speaker_name}}</small>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12" v-show="!showList">
            <h4 class="text-center text-yellow">Edit information to add a speaker</h4>
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Name</label>
                  <input type="text" class="form-control form-input-control" v-model="speaker.speaker_name">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Email</label>
                  <input type="text" class="form-control form-input-control" v-model="speaker.email">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Password</label>
                  <input type="password" class="form-control form-input-control" v-model="speaker.password">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Confirm Password</label>
                  <input type="password" class="form-control form-input-control" v-model="confirm_password">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Label name</label>
                  <input type="text" class="form-control form-input-control" v-model="speaker.label_name">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Content name</label>
                  <input type="text" class="form-control form-input-control" v-model="speaker.name">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Notes</label>
                  <textarea type="text" class="form-control form-input-control" v-model="speaker.notes"></textarea>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Bio</label>
                  <textarea type="text" class="form-control form-input-control" v-model="speaker.bio"></textarea>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Content Type</label>
                  <b-form-radio-group name="radius" v-model="speaker.speaker_type">
                    <b-form-radio value="1">Speaker</b-form-radio>
                    <b-form-radio value="0">Video</b-form-radio>
                  </b-form-radio-group>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group mb-2">
                  <label class="text-yellow mb-1">Video URL</label>
                  <input type="text" class="form-control form-input-control" v-model="speaker.video_url">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="custom-group">
                  <div class="photo-preview d-flex align-items-center">
                    <div class="upload-photo mr-3" v-if="!speaker.photo_url">
                      Speaker photo in here
                    </div>
                    <div class="flower mr-3" v-if="speaker.photo_url" style="margin-bottom: .5rem">
                      <img :src="photo_url" class="img-fluid round-image">
                    </div>
                    <div class="photo-action text-left">
                      <input type="file" ref="avatarFile" @change="inputFile" accept="image/x-png,image/gif,image/jpeg" style="display:none">
                      <button type="button" class="btn btn-primary" @click="$refs.avatarFile.click()">Upload speaker picture</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from '../../constants/config';
  import {validateEmail} from "../../util";

  export default {
  data () {
    return {
      speakers:[],
      showList: true,
      speaker:{
        speaker_name:'',
        email:'',
        password:'',
        label_name:'',
        notes:'',
        bio:'',
        name:'',
        speaker_type:1,
        video_url:'',
        photo_url:'',
        image:null
      },
      photo_url:'',
      confirm_password:''
    }
  },
  mounted() {
    this.getSpeakerList();
  },
  methods:{
    addSpeaker(){
      getApiManager()
          .post(`${apiBaseUrl}/api/admin/event/get`)
          .then((response) => {
            let res = response.data;
            if(res.status===true){
              this.reset();
              this.showList = false;
            }else{
              this.$notify({
                group: 'foo',
                type: 'warn',
                title: 'Notify',
                text: 'You should create a event at first.',
                animation_type:'slide'
              });
            }
          })
          .catch((error) => {
            console.log(error)
          })
    },
    save(){
      if(this.speaker.speaker_name=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input a speaker name',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.email=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input an email',
          animation_type:'slide'
        });
        return;
      }
      if(!validateEmail(this.speaker.email)) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Email format is incorrect.',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.password=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input a password',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.password!=this.confirm_password)
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Confirm a password',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.label_name=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input a label name',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.name=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input a content name',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.notes=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input a notes',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.bio=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input a bio',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.speaker_type==0 && this.speaker.video_url=='')
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Input a video URL',
          animation_type:'slide'
        });
        return;
      }
      if(this.speaker.image==null)
      {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: 'Select a photo',
          animation_type:'slide'
        });
        return;
      }
      const formData = new FormData();
      for(let key in this.speaker){
        formData.append(key,this.speaker[key])
      }
      getApiManager()
          .post(`${apiBaseUrl}/api/admin/speaker/create`, formData)
          .then((response) => {
            let res = response.data;
            if(res.status===true){
              this.getSpeakerList();
              this.showList = true;
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
    back(){
      this.showList = true;
    },
    reset(){
      this.speaker.speaker_name = ''
      this.speaker.email = ''
      this.speaker.password = ''
      this.speaker.label_name = ''
      this.speaker.notes = ''
      this.speaker.bio = ''
      this.speaker.name = ''
      this.speaker.speaker_type = 1
      this.speaker.video_url = ''
      this.speaker.photo_url = ''
      this.speaker.image = null
    },
    inputFile(event){
      this.speaker.photo_url = event.target.files[0].name;
      this.speaker.image = event.target.files[0];
      //set image to the div area
      var reader = new FileReader();
      var ref = this;
      reader.onload = function (e) {
        ref.photo_url = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    getSpeakerList(){
      this.speakers = [];
      getApiManager()
        .post(`${apiBaseUrl}/api/admin/speaker/list`)
        .then((response) => {
          let res = response.data;
          if(res.status===true){
            let data = res.data;
            for(let i=0;i<data.length;i++){
              this.speakers.push({id:data[i].speaker_id,img:`${apiBaseUrl}/`+data[i].profile_url,speaker_name:data[i].speaker_name,content_type_id:data[i].content_type_id});
            }
            this.showList = true;
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeSpeaker(content_type_id){
      this.$swal({
        title: 'Are you sure?',
        text: "You will remove this speaker.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#057bfd',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          getApiManager()
                  .post(`${apiBaseUrl}/api/admin/speaker/remove`,{content_type_id:content_type_id})
                  .then((response) => {
                    let res = response.data;
                    if(res.status===true){
                      this.getSpeakerList();
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                  })
        }
      });
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
