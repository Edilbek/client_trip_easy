import App from './App.vue';
import Login from  './components/auth/Login';
import Register from  './components/auth/Register';
import About from './components/marketing/About';
import Contact from './components/marketing/Contact';

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
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }
]

export default routes
