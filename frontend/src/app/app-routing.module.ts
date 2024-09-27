import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorralesComponent } from './corrales/corrales.component';

const routes: Routes = [
  { path: 'corrales', component: CorralesComponent },
  { path: '', redirectTo: '/corrales', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
