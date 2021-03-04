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
        </div>
        <div class="row">
          <div class="col-12 mt-3">
            <div class="table-responsive">
              <vuetable
                      ref="vuetable"
                      :api-mode="false"
                      :api-url="vuetableItems.apiUrl"
                      :fields="vuetableItems.fields"
                      :per-page="vuetableItems.perPage"
                      :http-method="vuetableItems.method"
                      :http-fetch="vueTableHttpFetch"
                      :data="localData"
                      pagination-path="pagination"
                      class="table-striped"
                      @vuetable:pagination-data="onPaginationData"
              >
                <template slot="action" slot-scope="props">
                  <b-button
                          class="mr-3"
                          size="sm"
                          variant="primary"
                          @click="onAction('live', props.rowData)">
                    <i class="fas fa-eye"></i>
                  </b-button>
                  <b-button
                          class="mr-3"
                          size="sm"
                          variant="primary"
                          @click="onAction('speaker', props.rowData)">
                    <i class="fas fa-video"></i>
                  </b-button>
                  <b-button
                          size="sm"
                          variant="primary"
                          @click="onAction('shop', props.rowData)">
                    <i class="fas fa-gifts"></i>
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
      </div>
    </section>
  </div>
</template>
<script>
  //import Vuetable from 'vuetable-2'
  import Vuetable from "../../components/Vuetable"
  import VuetablePaginationBootstrap from '../../components/VuetablePaginationBootstrap';
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from '../../constants/config';

  export default {
  data () {
    return {
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
            name: '__slot:action',
            title: 'Action',
            titleClass: 'text-center',
            dataClass: 'text-center',
            width: ''
          }
        ],
        perPage: 10,
        method: 'post'
      },
      localData:[
        {
          'id':1,
          'deceased_name': 'Test',
          'start_time': '2020-01-10',
          'time_zone': 'US',
          'program_url': 'https://test.com',
          'donation_url': 'https://test.com'
        },
        {
          'id':2,
          'deceased_name': 'Second',
          'start_time': '2020-01-25',
          'time_zone': 'WWW',
          'program_url': 'https://test1.com',
          'donation_url': 'https://test1.com'
        },
        {
          'id':3,
          'deceased_name': 'Third',
          'start_time': '2020-02-12',
          'time_zone': 'XXX',
          'program_url': 'https://apple.com',
          'donation_url': 'https://micro.com'
        }
      ]
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
      if(action==='live')
        this.$router.push('/visitor/event/live/'+data.id);
      else if(action==='speaker')
        this.$router.push('/visitor/speaker_room/'+data.id);
      else if(action==='shop')
        this.$router.push('/visitor/shop/'+data.id);
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
