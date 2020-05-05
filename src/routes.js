import App from './App.vue'
import Login from  './components/auth/Login'
import Register from  './components/auth/Register'

const routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

export default routes
