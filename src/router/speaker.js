import {auth_speaker} from './middleware/auth';

export const speakerRoutes = {
  path: '/speaker',
  component: () => import('../view/speaker/index'),
  redirect: '/speaker/profile',
  children: [
    {
      path: 'profile',
      component: () => import('../view/speaker/Profile'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'wait',
      component: () => import('../view/speaker/WaitRoom'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'start',
      component: () => import('../view/speaker/SpeakerRoom'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'live',
      component: () => import('../view/speaker/LiveRoom'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'parting',
      component: () => import('../view/speaker/Parting'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'condolence/:c_id',
      component: () => import('../view/speaker/Condolence'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'upload_photo',
      component: () => import('../view/speaker/UploadPhoto'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'enlarge/:img_id',
      component: () => import('../view/speaker/Enlarge'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
    {
      path: 'page/:type',
      component: () => import('../view/speaker/CustomPage'),
      meta: {
        middleware: [
          auth_speaker
        ]
      }
    },
  ],
};
