import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { SharedService } from '../services/shared/shared.service';
import { Haptics } from '@capacitor/haptics';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { Vibration } from '@ionic-native/vibration/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  x:any;
  y:any;
  z:any;
  password: string = '';
  botonActivo: boolean = false;
  pedirContrasenia: boolean = false;
  toast: boolean = false;
  mensajeToast: string = '';
  titulo = 'Bienvenido '+new TitleCasePipe().transform(this.auth.emailUsuarioLogeado.split('@')[0]);
  seMovio: boolean = false;
  audioDerecha = "../../assets/audio/alarma1.mp3";
  audioIzquierda = "assets/audio/alarma2.mp3";
  audioFlash = "assets/audio/Alarma-De-Carro.mp3";
  audioVibrando = "assets/audio/Alarmas-Para-Despertar-Fuertes.mp3";
  audioInvalidPassword = "assets/audio/Alarma-Nuclear.mp3";

  sonidoDerecha = new Audio(this.audioDerecha);
  sonidoIzquierda = new Audio("assets/audio/alarma2.mp3");
  sonidoFlash = new Audio(this.audioFlash);
  sonidoVibrando = new Audio(this.audioVibrando);
  sonidoInvalidPassword = new Audio(this.audioInvalidPassword);

  constructor(private auth:AuthService, public sharedService:SharedService, private flashlight: Flashlight, 
    private vibration:Vibration) {}  

  async ngOnInit() {
  };

  vibrarSiSeMovioElEquipo() {
    Motion.addListener('accel', event => {
    const {x, y , z} = event.accelerationIncludingGravity;
    this.x = x;
    this.z = z;
    this.y = y;
    
    if(this.sharedService.botonActivo) {
      if(x < -5) {
        this.sonidoDerecha.play();
        
        this.sonidoInvalidPassword.pause();
        this.vibration.vibrate(0)
        this.sonidoVibrando.pause()
        this.sonidoIzquierda.pause();
        this.sonidoFlash.pause(); 
        
        this.seMovio = true;
      } else if(x > 5) {
        this.sonidoIzquierda.play();

        this.sonidoVibrando.pause()
        this.sonidoDerecha.pause();
        this.sonidoInvalidPassword.pause();
        this.sonidoFlash.pause();
        this.vibration.vibrate(0)
        
        this.seMovio = true;
      } else if(y >= 5) {
        this.vibration.vibrate(0)
        this.sonidoIzquierda.pause();
        this.sonidoDerecha.pause();
        this.sonidoVibrando.pause()
        this.sonidoInvalidPassword.pause();
        
        this.sonidoFlash.play();
        this.flashlight.switchOn();
        setTimeout(()=>{
          this.sonidoFlash.remove();
          this.flashlight.switchOff();
        },5000);
        this.seMovio = true;
      } else if(x >= -1 && x <= 1 && y <= 1 
        && y >= -1 && z >= 9 && this.seMovio) {
          this.sonidoIzquierda.pause();
          this.sonidoDerecha.pause();
          this.sonidoFlash.pause();
          this.sonidoInvalidPassword.pause();
          //si se movio y lo dejaron de manera horizontal, solo vibra por 5 segundos mas sonido
          this.flashlight.switchOff();
        this.sonidoVibrando.play();
        this.vibration.vibrate(5000);
        setTimeout(()=>{
          this.sonidoVibrando.pause()
          this.vibration.vibrate(0);
          },5000)
        this.seMovio = false;
        }
      }
    });
  }

  validarContrasenia(){
    this.pedirContrasenia = true;
  }

  compararContrasenias(){
    this.sonidoIzquierda.pause();
    this.sonidoDerecha.pause();
    this.sonidoFlash.pause();
    this.sonidoVibrando.pause()
    this.pedirContrasenia = false;
    if(this.auth.clave == this.password) {
      this.sharedService.botonActivo = false;
      this.showToast(`Contraseña Correcta`,1500)
      this.flashlight.switchOff();
      this.sonidoInvalidPassword.pause();
    } else {
      this.vibration.vibrate(5000);
      
      this.sonidoInvalidPassword.play()
      this.flashlight.switchOn();
      setTimeout(()=>{
        this.flashlight.switchOff();
        this.sonidoInvalidPassword.pause();
      },5000)
      this.showToast('Contraseña Incorrecta',5000)
    }
    this.password = '';
  }

  showToast(mensaje: string, tiempo: number) {
    this.mensajeToast = mensaje;
    this.toast = true;
    setTimeout(()=> {
      this.toast = false;
      this.mensajeToast = "";
    },tiempo)
  }
}
