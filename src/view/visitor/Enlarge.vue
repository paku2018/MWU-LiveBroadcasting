<template>
  <div role="main" class="main">
    <section class="upload-your-photo with-footer enlarge-page">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="border-l">
              <p class="text-left">UPLOAD YOUR<br> PHOTOS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-end">
        <div class="col-md-6">
        </div>
        <div class="col-md-3">
          <div class="img-box mt-0 pointer" @click="goNext('upload_photo')">
            <img :src="require('@/assets/img/upload-photo.png')" class="img-fluid float-left mr-2">
            <label class="text-primary">Upload<br>
              Your<br>
              Photos
            </label>
          </div>
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

    <!-- Modal -->
    <transition name="pop" appear>
      <div class="modal fade show" v-if="show_modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true" @click="closeModal">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="row" v-if="modal_info">
                <div class="col-lg-12">
                  <div class="media align-items-center">
                    <img :src="modal_info.profile_url" class="mr-3" alt="">
                    <div class="media-body">
                      <h6 class="text-left mb-0"><b>Photo by {{modal_info.full_name}}</b></h6>
                    </div>
                  </div>
                  <p class="mt-2">{{modal_info.message}}</p>
                  <img :src="modal_info.picture_url" class="img-fluid">
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

  export default {
  data () {
    return {
      event_id:0,
      img_id:0,
      show_modal:false,
      modal_info:{
        full_name:'',
        profile_url:null,
        picture_url:null,
        message:''
      }
    }
  },
  mounted() {
    this.img_id = this.$route.params.img_id;
    window.setTimeout(() => {
      this.show_modal = true
    }, 500)
    getApiManager()
        .post(`${apiBaseUrl}/api/visitor/photo/get-info`, {photo_id:this.img_id})
        .then((response) => {
          let res = response.data;
          if(res.status===true){
            let detail = res.detail;
            this.modal_info.full_name = detail.full_name
            this.modal_info.profile_url = `${apiBaseUrl}/`+detail.profile_url
            this.modal_info.picture_url = `${apiBaseUrl}/`+detail.picture_url
            this.modal_info.message = detail.message
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
  methods:{
    goBack(){
      this.$router.push('/visitor/dashboard');
    },
    goNext(page){
      this.$router.push('/visitor/'+page);
    },
    closeModal(){
      this.show_modal = false;
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
