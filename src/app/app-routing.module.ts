import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },  // default route
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/about' }  // wildcard route for 404, redirect to About
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
