import { NgModule } from '@angular/core';
import  { MatInputModule }   from '@angular/material/input';
import  { MatCardModule }   from '@angular/material/card';
import  { MatButtonModule }   from '@angular/material/button';
import  { MatExpansionModule } from '@angular/material/expansion';
import  { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import  { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({

  exports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule
  ],
  imports:[
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule {}
