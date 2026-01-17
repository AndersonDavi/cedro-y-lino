import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'inicio',
      loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
    },
    {
      path: 'proyectos',
      loadComponent: () => import('./pages/projects-page/projects-page').then(m => m.ProjectsPage)
    },
    {
      path: 'proyectos/:id',
      loadComponent: () => import('./pages/project-detail-page/project-detail-page').then(m => m.ProjectDetailPage)
    },
    {
      path: 'servicios',
      loadComponent: () => import('./pages/services-page/services-page').then(m => m.ServicesPage)
    },
    {
      path: 'nosotros',
      loadComponent: () => import('./pages/about-page/about-page').then(m => m.AboutPage)
    },
    {
      path: 'contacto',
      loadComponent: () => import('./pages/contact-page/contact-page').then(m => m.ContactPage)
    },
    {
      path: '**',
      redirectTo: 'inicio'
    }
  ]
}];
