import { SavedPcBuildTableComponent } from './saved-pc-build-table/saved-pc-build-table.component';
import { BuildPcComponent } from './build-pc/build-pc.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'build-pc', component: BuildPcComponent, },
  { path: 'saved-pc-builds', component: SavedPcBuildTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
