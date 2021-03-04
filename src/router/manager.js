import {auth_manager} from './middleware/auth';

export const managerRoutes = {
  path: '/admin',
  component: () => import('../view/manager/index'),
  redirect: '/admin/event',
  children: [
    {
      path: 'profile',
      component: () => import('../view/manager/Profile'),
      meta: {
        middleware: [
          auth_manager
        ]
      }
    },
    {
      path: 'event',
      component: () => import('../view/manager/Event'),
      meta: {
        middleware: [
          auth_manager
        ]
      }
    },
    {
      path: 'speakers',
      component: () => import('../view/manager/Speakers'),
      meta: {
        middleware: [
          auth_manager
        ]
      }
    }
  ],
};
