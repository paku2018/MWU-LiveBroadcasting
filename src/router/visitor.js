import {auth_visitor, check_auth_visitor} from './middleware/auth';

export const visitorRoutes = {
  path: '/visitor',
  component: () => import('../view/visitor/index'),
  redirect: '/visitor/home',
  children: [
    {
      path: 'home/:id',
      component: () => import('../view/visitor/Profile'),
      meta: {
        middleware: [
          check_auth_visitor
        ]
      }
    },
    {
      path: 'dashboard',
      component: () => import('../view/visitor/Dashboard'),
      meta: {
        middleware: [
          auth_visitor
        ]
      }
    },
    {
      path: 'page/:type',
      component: () => import('../view/visitor/CustomPage'),
      meta: {
        middleware: [
          auth_visitor
        ]
      }
    },
    {
      path: 'upload_photo',
      component: () => import('../view/visitor/UploadPhoto'),
      meta: {
        middleware: [
          auth_visitor
        ]
      }
    },
    {
      path: 'enlarge/:img_id',
      component: () => import('../view/visitor/Enlarge'),
      meta: {
        middleware: [
          auth_visitor
        ]
      }
    },
    {
      path: 'condolence/:c_id',
      component: () => import('../view/visitor/Condolence'),
      meta: {
        middleware: [
          auth_visitor
        ]
      }
    },
    {
      path: 'waiting/:id',
      component: () => import('../view/visitor/Waiting'),
    },
    {
      path: 'live',
      component: () => import('../view/visitor/Live'),
    },
    {
      path: 'parting',
      component: () => import('../view/visitor/Parting'),
      meta: {
        middleware: [
          auth_visitor
        ]
      }
    },
  ],
};
