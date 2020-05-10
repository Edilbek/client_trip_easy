import App from './App.vue';
import Login from  './components/auth/Login';
import Register from  './components/auth/Register';
import Logout from './components/auth/Logout';
import About from './components/marketing/About';
import Contact from './components/marketing/Contact';
import Profile from './components/marketing/Profile';
import AddTrip from "./components/trip/AddTrip";
import ShowTrip from "./components/trip/ShowTrip";
import MyListTrip from "./components/trip/MyListTrip";
import City from "./components/City";

const routes = [
  {
    path: '/',
    name: 'home',
    component: App,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/cities',
    name: 'cities',
    component: City
  },
  {
    path: '/addTrip',
    name: 'addTrip',
    component: AddTrip,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/trips/:id',
    name: 'showTrip',
    component: ShowTrip
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/myTrips',
    name: 'myTrips',
    component: MyListTrip,
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
