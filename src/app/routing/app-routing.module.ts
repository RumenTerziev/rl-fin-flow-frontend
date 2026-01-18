import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ConverterComponent } from '../applications/converter/converter.component';
import { ProfileComponent } from '../profile/profile.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AuthGuard } from '../auth/auth.guard';
import { ChatAiComponent } from '../applications/chat-ai/chat-ai.component';
import { AboutComponent } from '../about/about.component';
import { ApplicationsComponent } from '../applications/applications.component';
import { ServerErrorComponent } from '../server-error/server-error.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
  {
    path: 'applications/converter',
    component: ConverterComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'applications/chat-ai', component: ChatAiComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: '/' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
