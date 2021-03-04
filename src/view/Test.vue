<template>
  <div role="main" class="main">
    <section class="common-page minh-100">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-9">
            <div class="border-l text-left">
              <p>Events</p>
            </div>
          </div>
          <div class="col-12 col-md-3 text-right">
            <b-button type="button" class="btn-primary" v-show="viewList" @click="addEvent()">✚ Create</b-button>
          </div>
        </div>
        <div class="row" v-show="viewList">
          <div class="col-12 mt-3">
            <div class="table-responsive">
              <vuetable
                      ref="vuetable"
                      :api-mode="true"
                      :api-url="vuetableItems.apiUrl"
                      :fields="vuetableItems.fields"
                      :per-page="vuetableItems.perPage"
                      :http-method="vuetableItems.method"
                      :http-fetch="vueTableHttpFetch"
                      pagination-path="pagination"
                      class="table-striped"
                      @vuetable:pagination-data="onPaginationData"
              >
                <template slot="modify" slot-scope="props">
                  <b-button
                          size="sm"
                          variant="primary"
                          @click="onAction('modify', props.rowData)">
                    <i class="iconsminds-pen"/>
                  </b-button>
                </template>
                <template slot="remove" slot-scope="props">
                  <b-button
                          size="sm"
                          variant="danger btn-action"
                          @click="onAction('delete', props.rowData)">
                    <i class="iconsminds-remove"/>
                  </b-button>
                </template>
              </vuetable>
            </div>
            <div class="pagination-wrapper">
              <vuetable-pagination-bootstrap
                      ref="pagination"
                      @vuetable-pagination:change-page="onChangePage"
                      :initial-per-page="vuetableItems.perPage"
                      @onUpdatePerPage="vuetableItems.perPage = Number($event)"
              />
            </div>
          </div>
        </div>
        <div class="row" v-show="!viewList">
          <div class="col-12 col-md-8 offset-md-2">
            <h4 class="text-yellow mb-1">Create a new event</h4>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Name</label>
              <input type="text" class="form-control form-input-control" v-model="eventItem.name">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Start time</label>
              <input type="password" class="form-control form-input-control" v-model="eventItem.start_time">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Timezone</label>
              <input type="password" class="form-control form-input-control" v-model="eventItem.timezone">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Program Url</label>
              <input type="password" class="form-control form-input-control" v-model="eventItem.program_url">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Donation Url</label>
              <input type="password" class="form-control form-input-control" v-model="eventItem.donation_url">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Flower shop Url</label>
              <input type="password" class="form-control form-input-control" v-model="eventItem.flowershop_url">
            </div>
            <div class="custom-group mb-2">
              <label class="text-yellow mb-1">Reminder Url</label>
              <input type="password" class="form-control form-input-control" v-model="eventItem.reminder_url">
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
  //import Vuetable from 'vuetable-2'
  import Vuetable from "../components/Vuetable"
  import VuetablePaginationBootstrap from '../components/VuetablePaginationBootstrap';
  import {getApiManager} from "../api";
  import {apiBaseUrl} from '../constants/config';

  export default {
  data () {
    return {
      viewList: true,
      eventItem:{
        name:'',
        start_time:null,
        timezone:'',
        program_url:'',
        donation_url:'',
        flowershop_url:'',
        reminder_url:''
      },
      vuetableItems: { // main table options
        apiUrl: `${apiBaseUrl}/api/admin/event/list`,
        fields: [
          {
            name: 'deceased_name',
            title: 'Name',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          },
          {
            name: 'start_time',
            title: 'Start time',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          },
          {
            name: 'time_zone',
            title: 'Timezone',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          },{
            name: 'program_url',
            title: 'Program Url',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          },
          {
            name: 'donation_url',
            title: 'Donate Url',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          },{
            name: '__slot:modify',
            title: 'Modify',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          },{
            name: '__slot:remove',
            title: 'Delete',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          }
        ],
        perPage: 10,
        method: 'post'
      },
    }
  },
  mounted() {
    this.$refs.vuetable.$parent.transform = this.transform.bind(this);
  },
  methods:{
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    vueTableHttpFetch(apiUrl, httpOptions) {
      return getApiManager().post(apiUrl, {params:{
          page: httpOptions.params.page,
          per_page: this.vuetableItems.perPage,
          sort: httpOptions.params.sort
        }});
    },
    transform(response) {
      let transformed = {};
      let data = response.data;
      transformed.data = data;

      transformed.pagination = {
        total: response.total,
        per_page: response.per_page,
        current_page: response.page,
        last_page: response.last_page,
        from: data.from,
        to: data.to
      };
      return transformed
    },
    onAction(action, data = null){
      alert(action)
      console.log(data)
    },
    addEvent(){
      this.viewList = false;
    },
    save(){
      alert("coming soon")
    },
    back(){
      this.viewList = true;
    }
  },
  components: {
    Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
  },
  computed: {
  },
  watch:{
    'vuetableItems.perPage': function (newVal) {
      this.$refs.vuetable.refresh();
    }
  }
}
</script>
