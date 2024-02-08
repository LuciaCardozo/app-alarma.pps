import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VibratorPage } from './vibrator.page';

const routes: Routes = [
  {
    path: '',
    component: VibratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VibratorPageRoutingModule {}
