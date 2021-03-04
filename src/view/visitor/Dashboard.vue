<template>
  <div role="main" class="main">
    <section class="common-page with-footer speaker-room-page">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="row">
              <div class="col-12">
                <div class="border-l text-left">
                  <p v-if="event_info">LIVESTREAM SERVICE STARTS<br> ON {{event_info.start_date_time}} <br> {{event_info.time_zone}}
                  </p>
                </div>
              </div>
              <div class="col-md-7">
                <div class="img-box pointer" @click="goNext('shop')">
                  <img :src="require('@/assets/img/order-to-funeral.png')" class="img-fluid float-left mr-2">
                  <label class="text-primary">Order to
                    Funeral
                    Home
                  </label>
                </div>
                <div class="img-box pointer" @click="goNext('donation')">
                  <img :src="require('@/assets/img/DonateWithPaypal.png')" class="img-fluid float-left mr-2">
                  <label class="text-primary">Donate
                    With<br>
                    <b>PayPal</b>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-7" v-if="event_info">
            <img :src="event_info.program_url" class="img-fluid" style="height: 100%">
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-end">
        <div class="col-md-4">
          <div class="form-group">
            <textarea class="form-control" rows="3" placeholder="Please leave a personal mesagge or a memory of our loved Susie here" v-model="message"></textarea>
          </div>
        </div>
        <div class="col-md-2 pl-lg-0">
          <div class="form-group">
            <button type="button" class="btn btn-primary btn-sm" @click="goNext('condolence')">Send your condolences</button>
          </div>
        </div>
        <div class="col-md-3 border-left pl-lg-4">
          <div class="img-box mt-0 form-group pointer" @click="goNext('calendar')">
            <img :src="require('@/assets/img/calendar.png')" class="img-fluid float-left mr-2">
            <label class="text-primary">Send me
              a Calendar
              Reminder
            </label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="img-box mt-0 form-group pointer" @click="goNext('upload_photo')">
            <img :src="require('@/assets/img/upload-photo.png')" class="img-fluid float-left mr-2">
            <label class="text-primary">Upload<br>
              Your<br>
              Photos
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
      event_info:null,
      visitor_id:0,
      message:''
    }
  },
  mounted() {
    this.event_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).event_id:0;
    this.visitor_id = JSON.parse(localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).token:0;

    getApiManager()
      .post(`${apiBaseUrl}/api/visitor/profile/get-event`, {event_id:this.event_id})
      .then((response) => {
        let res = response.data;
        if(res.status===true){
          this.event_info = res.detail;
          this.event_info.program_url = `${apiBaseUrl}/`+this.event_info.program_url;
          if(res.detail.status==3){
            this.$router.push('/visitor/parting');
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
  },
  methods:{
    goNext(page){
      if(page=="condolence"){
        if(this.message==''){
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Waring',
            text: 'Please input the message.',
            animation_type:'slide'
          });
          return;
        }
        getApiManager()
          .post(`${apiBaseUrl}/api/visitor/condolence/create`, {event_id:this.event_id, message:this.message,visitor_id:this.visitor_id})
          .then((response) => {
            let res = response.data;
            if(res.status===true){
              this.$router.push('/visitor/condolence/'+res.condolence_id);
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
      else if(page=="upload_photo")
        this.$router.push('/visitor/'+page);
      // else if(page=="shop")
      //   window.open(this.event_info.flowershop_url,"_blank");
      // else if (page=="donation")
      //   window.open(this.event_info.donation_url,"_blank");
      // else if(page=="calendar")
      //   alert("coming soon")
      else{
        this.$router.push('/visitor/page/'+page);
      }
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
