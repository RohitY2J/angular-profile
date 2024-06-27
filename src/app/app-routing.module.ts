import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AngularIntroductionComponent } from './blog/blog.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'blog', component: AngularIntroductionComponent },
  //{ path: 'component2', component: Component2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
