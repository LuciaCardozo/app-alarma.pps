import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VibratorPageRoutingModule } from './vibrator-routing.module';

import { VibratorPage } from './vibrator.page';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VibratorPageRoutingModule
  ],
  declarations: [VibratorPage],
  providers:[DeviceMotion, Vibration]
})
export class VibratorPageModule {}
