<template>
  <div role="main" class="main">
    <section class="upload-your-photo with-footer pb-3">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="border-l">
              <p class="text-left">UPLOAD YOUR<br> PHOTOS</p>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <h6 class="text-primary mt-5 mb-2">Please leave a personal message that will display along the photo</h6>
                  <textarea class="form-control bg-white" rows="5" placeholder="Please input a message." v-model="photo.message"></textarea>
                </div>
                <div class="row">
                  <div class="col-12 col-md-6 pr-lg-0">
                    <div class="photo-area pointer bg-white p-2 d-flex align-items-center" @click="$refs.photoFile.click()" v-if="!photo.img">
                      <h6 class="mb-0">Click here to upload photo</h6>
                    </div>
                    <div class="photo-area pointer" v-if="photo.img" @click="$refs.photoFile.click()">
                      <img :src="photo.img" class="photo-image">
                    </div>
                    <input type="file" ref="photoFile" @change="inputFile" accept="image/x-png,image/gif,image/jpeg" style="display:none">
                  </div>
                  <div class="col-md-6 col-4 pl-lg-0 text-right">
                    <button type="button" class="btn btn-primary" @click="submit">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6" v-show="imgList.length>0">
            <h6 class="text-primary mt-4 mt-lg-0 mb-2">Click on photos to enlarge
            </h6>
            <div class="row">
              <div class="col-md-3 col-6 text-center mb-2" v-for="image in imgList" :key="image.id">
                <div class="photo-box pointer" @click="goNext('enlarge',image.photo_id)">
                  <img :src="image.picture_url" class="img-fluid" style="height: 113px">
                  <h6 class="text-yellow">{{image.message}}</h6>
                </div>
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

  export default {
  data () {
    return {
      event_id:0,
      visitor_id:0,
      photo:{
        message:'',
        img:null,
        imgFile:null,
      },
      imgList:[]
    }
  },
  mounted() {
    this.event_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).event_id:0;
    this.visitor_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).token:0;
    this.getImgList();
  },
  methods:{
    goNext(page,img_id=0){
      if(page=="enlarge")
        this.$router.push('/visitor/enlarge/'+img_id);
    },
    goBack(){
      this.$router.push('/visitor/dashboard');
    },
    inputFile(event){
      this.photo.img = event.target.files[0].name;
      this.photo.imgFile = event.target.files[0];
      //set image to the div area
      var reader = new FileReader();
      var ref = this;
      reader.onload = function (e) {
        ref.photo.img = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    submit(){
      if(this.photo.message==''){
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Warning',
          text: 'Please input a message.',
          animation_type:'slide'
        });
        return;
      }
      if(this.photo.imgFile==null){
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Warning',
          text: 'Please select an image.',
          animation_type:'slide'
        });
        return;
      }
      //call api to upload photo
      const formData = new FormData();
      formData.append('event_id', this.event_id)
      formData.append('visitor_id', this.visitor_id)
      formData.append('message', this.photo.message)
      formData.append('image', this.photo.imgFile)
      getApiManager()
          .post(`${apiBaseUrl}/api/visitor/photo/create`, formData)
          .then((response) => {
            let res = response.data;
            if(res.status===true){
              this.imgList = [];
              this.photo.message = ''
              this.photo.img = ''
              this.photo.imgFile = null
              this.getImgList();
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
    getImgList(){
      getApiManager()
              .post(`${apiBaseUrl}/api/visitor/photo/list`, {visitor_id:this.visitor_id})
              .then((response) => {
                let res = response.data;
                if(res.status===true){
                  this.imgList = res.data;
                  for(let i=0;i<this.imgList.length;i++){
                    this.imgList[i].picture_url = `${apiBaseUrl}/`+this.imgList[i].picture_url
                  }
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
