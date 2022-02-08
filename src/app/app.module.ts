import { AngularMaterialsModule } from './angular-materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildPcComponent } from './build-pc/build-pc.component';
import { PickPartComponent } from './pick-part/pick-part.component';
import { PickedPartsComponent } from './picked-parts/picked-parts.component';
import { MainAppNavComponent } from './main-app-nav/main-app-nav.component';
import { FilterToolbarComponent } from './filter-toolbar/filter-toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PcPartMoreDetailDialogComponent } from './pc-part-more-detail-dialog/pc-part-more-detail-dialog.component'; 
import { HttpClientModule } from '@angular/common/http';
import { SavedPcBuildTableComponent } from './saved-pc-build-table/saved-pc-build-table.component';
import {MatTooltipModule} from '@angular/material/tooltip';





@NgModule({
  declarations: [
    AppComponent,
    BuildPcComponent,
    PickPartComponent,
    PickedPartsComponent,
    MainAppNavComponent,
    FilterToolbarComponent,
    PcPartMoreDetailDialogComponent,
    SavedPcBuildTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialsModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
