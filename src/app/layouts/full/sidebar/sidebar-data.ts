import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },

  {
    displayName: 'Restaurants',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/restaurants',
  },

  {
    displayName: 'Donations',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/donations',
  },



  {
    displayName: 'Events',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/events',
  },



  {
    displayName: 'CommunityCenters',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/communities',
  },

  {
    displayName: 'Shelters',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/shelters',
  },




  {
    displayName: 'Users',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/users',
  },




  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    bgcolor: 'accent',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    bgcolor: 'warning',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    bgcolor: 'success',
    route: '/extra/icons',
  },

  

];
