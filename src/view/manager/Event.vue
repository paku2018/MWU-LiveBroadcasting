<template>
  <div role="main" class="main">
    <section class="common-page minh-100 guestbook-registration">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-9">
            <div class="border-l text-left">
              <p>Event</p>
            </div>
          </div>
          <div class="col-12 col-md-3 text-right">
            <b-button type="button" class="btn-primary" v-show="is_create && e_count==0" @click="addEvent()">✚ Create</b-button>
          </div>
        </div>
        <div class="row" v-if="is_create && e_count>0">
          <div class="col-12 col-md-8 offset-md-2 mb-3">
            <h4 class="text-yellow mb-1">Information</h4>
          </div>
          <div class="col-12 col-md-8 offset-md-4">
            <div class="text-left">
              <h5 class="text-yellow mt-3">Deceased name : {{eventItem.decease_name}}</h5>
              <h5 class="text-yellow mt-3">Start Time : {{eventItem.start_date_time}}</h5>
              <h5 class="text-yellow mt-3">Timezone : {{eventItem.time_zone}}</h5>
              <h5 class="text-yellow mt-3">Donation URL : {{eventItem.donation_url}}</h5>
              <h5 class="text-yellow mt-3">Flowershop URL : {{eventItem.flowershop_url}}</h5>
              <h5 class="text-yellow mt-3">Reminder URL : {{eventItem.reminder_url}}</h5>
              <h5 class="text-yellow mt-3">Zoom meeting URL : {{eventItem.zoom_meeting_url}}</h5>
              <h5 class="text-yellow mt-3">Visitor URL : {{base_url}}/#/visitor/home/{{eventItem.event_id}}</h5>
              <h5 class="text-yellow mt-3">Condolence Telephone Number : {{eventItem.tel}}</h5>
            </div>
            <div class="photo-preview d-flex align-items-center w-100 mt-3">
              <h5 class="text-yellow mr-2">Program Image: </h5>
              <div class="flower" style="margin-bottom: .5rem">
                <img :src="eventItem.program_url" class="img-fluid" alt="no img" style="height: 100%">
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-show="is_create && e_count==0">
          <div class="col-12 col-md-8 offset-md-2 mt-3">
            <h4 class="text-yellow mb-1">There is no event yet.</h4>
          </div>
        </div>
        <div class="row" v-show="!is_create">
          <div class="col-12 col-md-8 offset-md-2">
            <h4 class="text-yellow mb-1">Create a new event</h4>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Deceased name</label>
              <input type="text" class="form-control form-input-control" v-model="eventItem.decease_name">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Start time</label>
              <date-picker v-model="eventItem.start_date_time" type="datetime" format="MM/DD/YYYY HH:mm" valueType="YYYY-MM-DD HH:mm:00"></date-picker>
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Timezone</label>
              <b-form-select v-model="eventItem.time_zone" :options="timezones" class="form-input-control"></b-form-select>
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Donation URL</label>
              <input type="text" class="form-control form-input-control" v-model="eventItem.donation_url">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Flower shop URL</label>
              <input type="text" class="form-control form-input-control" v-model="eventItem.flowershop_url">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Reminder URL</label>
              <input type="text" class="form-control form-input-control" v-model="eventItem.reminder_url">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Zoom meeting URL</label>
              <input type="text" class="form-control form-input-control" v-model="eventItem.zoom_meeting_url">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Condolence Telephone number</label>
              <input type="text" class="form-control form-input-control" v-model="eventItem.tel">
            </div>
            <div class="custom-group mb-2">
              <div class="photo-preview d-flex align-items-center">
                <div class="upload-photo mr-3" v-if="!eventItem.program_url">
                  Program Image in here
                </div>
                <div class="flower mr-3" v-if="eventItem.program_url" style="margin-bottom: .5rem">
                  <img :src="eventItem.program_url" class="img-fluid round-image">
                </div>
                <div class="photo-action text-left">
                  <input type="file" ref="programImage" @change="inputFile" accept="image/x-png,image/gif,image/jpeg" style="display:none">
                  <button type="button" class="btn btn-primary" @click="$refs.programImage.click()">Upload program image</button>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right col-12 col-md-8 offset-md-2">
            <b-button type="button" class="btn-primary mr-3" @click="save()">Save</b-button>
            <b-button type="button" class="btn-primary" @click="back()">Back</b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from '../../constants/config';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
  data () {
    return {
      is_create: true,
      e_count:0,
      eventItem:{
        decease_name:'',
        start_date_time:null,
        time_zone:'',
        program_url:'',
        image:null,
        donation_url:'',
        flowershop_url:'',
        reminder_url:'',
        zoom_meeting_url:'',
        tel:''
      },
      timezones:[
        {value:'PST',text:'PST'},
        {value:'EST',text:'EST'},
        {value:'MNT',text:'MNT'}
      ],
      base_url:window.location.origin
    }
  },
  mounted() {
    getApiManager()
      .post(`${apiBaseUrl}/api/admin/event/get`)
      .then((response) => {
        let res = response.data;
        if(res.status===true) {
          this.eventItem = res.detail;
          this.eventItem.program_url = `${apiBaseUrl}`+"/"+this.eventItem.program_url;
          this.e_count = 1;
          this.is_create = true;
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
  },
  methods:{
    onAction(action, data = null){
      alert(action)
      console.log(data)
    },
    addEvent(){
      this.is_create = false;
    },
    save(){
      const formData = new FormData();
      for (let key in this.eventItem) {
        formData.append(key, this.eventItem[key]);
      }
      getApiManager()
              .post(`${apiBaseUrl}/api/admin/event/create`, formData)
              .then((response) => {
                let res = response.data;
                if(res.status===true){
                  this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: 'Success',
                    text: 'The event was created successfully.',
                    animation_type:'slide'
                  });
                  this.$router.go()
                }
                else{
                  this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Error',
                    text: 'Server Error',
                    animation_type:'slide'
                  });
                }
              })
              .catch((error) => {
              })
    },
    back(){
      this.is_create = true;
    },
    inputFile(event){
      this.eventItem.program_url = event.target.files[0].name;
      this.eventItem.image = event.target.files[0];
      //set image to the div area
      var reader = new FileReader();
      var ref = this;
      reader.onload = function (e) {
        ref.eventItem.program_url = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
  },
  components: {
    'date-picker':DatePicker
  },
  computed: {
  },
  watch:{

  }
}
</script>
