import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProgressBarBureautique } from './shared/progress-bar/progress-bar-bueautique/progress-bar-bureautique.component';
import { ProgressBarBackend } from './shared/progress-bar/progress-bar-backend/progress-bar-backend.component';
import { ProgressBarFrontend } from './shared/progress-bar/progress-bar-frontend/progress-bar-frontend.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './cv/navbar/navbar.component';
import { HeaderComponent } from './cv/header/header.component';
import { MoiComponent } from './cv/moi/moi.component';
import { PortfolioComponent } from './cv/portfolio/portfolio.component';
import { CompetencesComponent } from './cv/competences/competences.component';




import { ContactComponent } from './cv/contact/contact.component';


import { HeaderAdminComponent } from './cv/admin/header-admin/header.admin.component';
import { PortfolioAdminComponent } from './cv/admin/portfolio-admin-component/portfolio-admin-component';
import { MoiAdminComponent } from './cv/admin/moi-admin/moi-admin-component/moi-admin-component';



import { AtoutsAdminComponent } from './cv/admin/competance-admin/mesAtous/atouts-admin/atouts-admin.component';
import { ElecAdminComponent } from './cv/admin/competance-admin/elecronique/elec-admin/elec-admin.component';
import { LoisirAdminComponent } from './cv/admin/competance-admin/loisir/loisir-admin/loisir-admin.component';
import { ExperienceAdminComponent } from './cv/admin/competance-admin/experience/experience-admin/experience-admin.component';
import { FormationAdminComponent } from './cv/admin/competance-admin/formation/formation-admin/formation-admin.component';
import { LanguesAdminComponent } from './cv/admin/competance-admin/langues/langues-admin/langues-admin.component';


import { ContactDisplayComponent } from './cv/contact-display/contact.display.component';
import { LoisirDisplayComponent } from './cv/competences/loisir-display/loisir-display-component/loisir-display-component';
import { ElecDisplayComponent } from './cv/competences/elec-display/elec-display-component/elec-display-component';
import { LangueDisplayComponent } from './cv/competences/langue-display/langue-display-component/langue-display-component';
import { FormationDisplayComponent } from './cv/competences/formation-display/formation-display-component/formation-display-component';
import { ExperienceDisplayComponent } from './cv/competences/experience-display/experience-display/experience-display.component';
import { AtoutDisplayComponent } from './cv/competences/atout-display/atout-display-component/atout-display-component';






import { AuthInterceptor } from './auth/auth-interceptor';
import { AngularMaterialModule } from './angular-material';

import { AuthModule } from './auth/auth.module';
import { ClientComponent } from './client/client.component';
import { ContactAdminDisplayComponent } from './cv/admin/contact-admin-display/contact.admin.display.component';
import { AdminPageComponent } from './cv/admin/admin-page/admin-page.component';
import { NavbarAdminComponent } from './cv/admin/navbar-admin/navbar.admin.component';

import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './cv/footer/footer/footer.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { MessageComponent } from './cv/message/message.component';
import { ContactFormComponent } from './cv/contact-form/contact-form.component';
import { CvAdminComponent } from './cv/admin/cv-admin/cv-admin.component';
import { SidenavbarComponent } from './cv/sidenavbar/sidenavbar.component';
import { InfoDisplayComponent } from './cv/competences/info-display/info-display-component';
import { InformatiquesAdminComponent } from './cv/admin/competance-admin/informatiques/informatiques-admin/informatiques-admin.component';
import { InformatiqueAdminComponent } from './cv/admin/competance-admin/informatique/informatique.admin.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompetencesComponent,
    PortfolioComponent,
    MoiComponent,
    ContactComponent,
    ProgressBarComponent,
    ProgressBarBackend,
    ProgressBarFrontend,
    ProgressBarBureautique,
    ContactDisplayComponent,
    NavbarComponent,

    HeaderAdminComponent,
    MoiAdminComponent,
    ElecAdminComponent,
    LoisirAdminComponent,
    ExperienceAdminComponent,
    FormationAdminComponent,
    LanguesAdminComponent,
    AtoutsAdminComponent,
    ContactAdminDisplayComponent,
    ExperienceDisplayComponent,
    FormationDisplayComponent,
    LangueDisplayComponent,
    LoisirDisplayComponent,
    AtoutDisplayComponent,
    ElecDisplayComponent,
    PortfolioAdminComponent,
    ClientComponent,
    AdminPageComponent,
    NavbarAdminComponent,
    InformatiqueAdminComponent,
    InformatiquesAdminComponent,
    ErrorComponent,
    FooterComponent,
    DropdownDirective,
    MessageComponent,
   ContactFormComponent,
   CvAdminComponent,
   SidenavbarComponent,
   InfoDisplayComponent






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    AngularMaterialModule,

    HttpClientModule,
    ScrollingModule,

    FormsModule,

    AuthModule,
    FlexLayoutModule,
    

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
       { provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
       { provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]

})
export class AppModule { }
