import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')

const LoginLayout = () => import('../components/loginLayout.vue');

function loadView(view) 
{
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/dashboardContents/${view}.vue`)
    }

    function isAuthenticated() {
        if (localStorage.getItem('token') == null) {
          return true;
        }
      }

    const routes = [
        {
            path: '/dashboard',
            component: DashboardLayout,
            children: [
                {
                    name: 'UserController',
                    path: '/user',
                    component: loadView('userController'),
                    beforeEnter(to, from, next) {
                        if (!isAuthenticated()) 
                        {
                          next();
                        } 
                        else 
                        {
                          next('/');
                          alert('Please Login to Continue!');
                        }
                    }
                },
                {
                    name: 'ServicesController',
                    path: '/services',
                    component: loadView('servicesController'),
                    beforeEnter(to, from, next) {
                        if (!isAuthenticated()) 
                        {
                          next();
                        } 
                        else 
                        {
                          next('/');
                          alert('Please Login to Continue!');
                        }
                    }
                },
                {
                    name: 'Dashboard',
                    path: '/dashboard',
                    component: loadView('dashboard'),
                    beforeEnter(to, from, next) {
                      if (!isAuthenticated()) {
                        next();
                      } else {
                        next('/user');
                      }
                    }
                }
            ]
        },
        {
            path: '/',
            component: LoginLayout,
            name: 'loginLayout',
            beforeEnter(to, from, next) {
              if (isAuthenticated()) 
              {
                next();
              } 
              else 
              {
                next('/user');
              }
            }
          }
    ]

Vue.use(Router)
const router = new Router({ mode: 'history', routes: routes })
export default router
