import { Component, OnInit, OnDestroy } from '@angular/core';
import { Motion, MotionOrientationEventResult } from '@capacitor/motion';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-vibrator',
  templateUrl: './vibrator.page.html',
  styleUrls: ['./vibrator.page.scss'],
})
export class VibratorPage implements OnInit {
  motionState: string = '';
  sounds = {
    right: 'path/to/right-sound.mp3',
    left: 'path/to/left-sound.mp3',
    vertical: 'path/to/vertical-sound.mp3',
    flat: 'path/to/flat-sound.mp3'
  };
  acelerometro: any={x:0,y:0,z:0};

  constructor(
    private deviceMotion: DeviceMotion,
    private vibration: Vibration,
  ) { }


  ngOnInit() {

  }


  startMotionDetection() {
    Motion.addListener('orientation', (event: MotionOrientationEventResult) => {
      const { beta, gamma } = event;

      if (gamma > 10) {
        this.acelerometro.x = gamma
        this.motionState = 'right';
        this.vibration.vibrate(1000);
      } else if (gamma < -10) {
        this.acelerometro.x = gamma
        this.motionState = 'left';
        this.vibration.vibrate(1000);
      } else if (beta > 10 || beta < -10) {
        this.acelerometro.y = beta
        this.motionState = 'vertical';
        this.vibration.vibrate(1000);
      } else {
        this.motionState = 'flat';
        this.vibration.vibrate(1000);
      }
    });
  }

  medir(){
    this.startMotionDetection();
    // this.deviceMotion.watchAcceleration({ frequency: 200 }).subscribe(
    //   (acceleration: DeviceMotionAccelerationData) => {
    //   }
    // );
  }
}
