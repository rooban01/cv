import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ContactComponent } from './cv/contact/contact.component';
import { ContactDisplayComponent } from './cv/contact-display/contact.display.component';
import { AuthGuard } from './auth/auth.guard';
import { ClientComponent } from './client/client.component';
import { PortfolioComponent } from './cv/portfolio/portfolio.component';
import { CompetencesComponent } from './cv/competences/competences.component';
import { MoiComponent } from './cv/moi/moi.component';
import { ElecDisplayComponent } from './cv/competences/elec-display/elec-display-component/elec-display-component';
import { ExperienceDisplayComponent } from './cv/competences/experience-display/experience-display/experience-display.component';
import { AtoutDisplayComponent } from './cv/competences/atout-display/atout-display-component/atout-display-component';
import { FormationDisplayComponent } from './cv/competences/formation-display/formation-display-component/formation-display-component';
import { LangueDisplayComponent } from './cv/competences/langue-display/langue-display-component/langue-display-component';
import { LoisirDisplayComponent } from './cv/competences/loisir-display/loisir-display-component/loisir-display-component';
import { ProgressBarBackend } from './shared/progress-bar/progress-bar-backend/progress-bar-backend.component';
import { ProgressBarFrontend } from './shared/progress-bar/progress-bar-frontend/progress-bar-frontend.component';
import { ProgressBarBureautique } from './shared/progress-bar/progress-bar-bueautique/progress-bar-bureautique.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { ContactAdminDisplayComponent } from './cv/admin/contact-admin-display/contact.admin.display.component';
import { AdminPageComponent } from './cv/admin/admin-page/admin-page.component';
import { HeaderAdminComponent } from './cv/admin/header-admin/header.admin.component';
import { MoiAdminComponent } from './cv/admin/moi-admin/moi-admin-component/moi-admin-component';
import { PortfolioAdminComponent } from './cv/admin/portfolio-admin-component/portfolio-admin-component';
import { ElecAdminComponent } from './cv/admin/competance-admin/elecronique/elec-admin/elec-admin.component';
import { ExperienceAdminComponent } from './cv/admin/competance-admin/experience/experience-admin/experience-admin.component';
import { FormationAdminComponent } from './cv/admin/competance-admin/formation/formation-admin/formation-admin.component';
import { LanguesAdminComponent } from './cv/admin/competance-admin/langues/langues-admin/langues-admin.component';
import { AtoutsAdminComponent } from './cv/admin/competance-admin/mesAtous/atouts-admin/atouts-admin.component';
import { LoisirAdminComponent } from './cv/admin/competance-admin/loisir/loisir-admin/loisir-admin.component';
import { InformatiqueAdminComponent } from './cv/admin/competance-admin/informatique/informatique.admin.component';
import { MessageComponent } from './cv/message/message.component';
import { ContactFormComponent } from './cv/contact-form/contact-form.component';
import { CvAdminComponent } from './cv/admin/cv-admin/cv-admin.component';
import { InfoDisplayComponent } from './cv/competences/info-display/info-display-component';
import { InformatiquesAdminComponent } from './cv/admin/competance-admin/informatiques/informatiques-admin/informatiques-admin.component';




const routes: Routes = [

  { path: 'admin20072007', component: AdminPageComponent },
  { path: 'admin20072007/message', component: ContactAdminDisplayComponent },
  { path: 'admin20072007/header', component: HeaderAdminComponent },
  { path: 'admin20072007/moi', component:  MoiAdminComponent },
  { path: 'admin20072007/portfolio', component:  PortfolioAdminComponent },
  { path: 'admin20072007/informatique', component:  InformatiqueAdminComponent },
  { path: 'admin20072007/informatiques', component:  InformatiquesAdminComponent },
  { path: 'admin20072007/electronique', component:  ElecAdminComponent },
  { path: 'admin20072007/experience', component:  ExperienceAdminComponent },
  { path: 'admin20072007/formation', component:  FormationAdminComponent },
  { path: 'admin20072007/langue', component:  LanguesAdminComponent },
  { path: 'admin20072007/atout', component:  AtoutsAdminComponent },
  { path: 'admin20072007/loisir', component:  LoisirAdminComponent },
  { path: 'admin20072007/cv', component:  CvAdminComponent },


   { path: 'message', component:MessageComponent},

   { path: 'contactform', component:ContactFormComponent},
  // { path: 'contacts', component: ContactComponent},
  { path: 'contacts', component: ContactComponent,  canActivate: [AuthGuard] },
   { path: 'moi', component: MoiComponent },
   { path: 'portfolio', component: PortfolioComponent },
   { path: '', redirectTo: 'home', pathMatch: 'full' },

   { path: 'competance', component: CompetencesComponent,
        children: [

          { path: 'atout', component: AtoutDisplayComponent },
          { path: 'exp', component: ExperienceDisplayComponent},
          { path: 'elec', component: ElecDisplayComponent },
          { path: 'informatique', component: InfoDisplayComponent },
          { path: 'electronique', component: ElecDisplayComponent },
          { path: 'form', component: FormationDisplayComponent },
          { path: 'langue', component: LangueDisplayComponent },
          { path: 'loisir', component: LoisirDisplayComponent },
          { path: 'backend', component: ProgressBarBackend },
          { path: 'frontend', component: ProgressBarFrontend },
          { path: 'logiciel', component: ProgressBarBureautique },
          { path: 'orm', component: ProgressBarComponent },
        ] },


        { path: '', component: ClientComponent },
   { path: 'home', component: ClientComponent },
   { path: 'edit/:contactId', component: ContactFormComponent, canActivate: [AuthGuard] },
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},


];

@NgModule({
  imports: [ RouterModule.forRoot(routes),RouterModule.forChild(routes) ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}

