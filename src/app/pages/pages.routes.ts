import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { EventsComponent } from './events/events.component';
import { DonationsComponent } from './donations/donations.component';
import { UsersComponent } from './users/users.component';
import { CommunityCentersComponent } from './community-centers/community-centers.component';
import { SheltersComponent } from './shelters/shelters.component';

export const PagesRoutes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantsComponent,
  },

  {
    path: 'events',
    component: EventsComponent,
  },

  {
    path: 'donations',
    component: DonationsComponent,
  },

  {
    path: 'users',
    component: UsersComponent,
  },

  {
    path: 'communities',
    component: CommunityCentersComponent,
  },

  {
    path: 'shelters',
    component: SheltersComponent,
  },

  {
    path: 'dashboard',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },


];
