import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  toast: boolean = false;
  mensaje: string = "";
  spinnerShow: boolean = false;
  listaDeCorreos: any = [];
  user = {
    email: '',
    password: '',
  };

  constructor(private route:Router, private auth:AuthService) { }

  async  ngOnInit() {
    const res = await this.auth.traerTodo('users');
    res?.subscribe((listaref: any) => {
      this.listaDeCorreos = listaref.map((userRef: any) => userRef.payload.doc.data());
    });
  }

  loginWithValidation() {
    let existe=this.listaDeCorreos.find((email: any) => email.email == this.user.email && email.password == this.user.password);
    console.log(existe)
    if (existe) { 
        try{ 
          this.spinnerShow = true;
          setTimeout(()=>{
            this.auth.onLogin(this.user.email, this.user.password).then((res)=>{
              console.log(res)
              if(res != "Error on login") {
                this.auth.emailUsuarioLogeado = this.user.email;   
                //this.database.role = this.user.role;
                this.auth.clave = this.user.password;
                this.user.email = "";
                this.user.password = "";
                this.route.navigate(['/home']);
                this.spinnerShow = false;
              }
            });
          },2000)
        }catch(error){
          console.log(error)
          this.showToast("Error login", 2000);
          this.spinnerShow = false;
         // this.toastService.show("Error login", {classname:'bg-warning', "delay":"2000"});
        }
    }else if(this.user.email == '' || this.user.password==''){
      this.showToast("Por favor complete todos los campos", 2000);
      //this.toastService.show("Por favor complete todos los campos", {classname:'bg-warning', "delay":"2000"});
    }else{
      this.showToast("El usuario no existe", 2000);
      //this.toastService.show("El usuario no existe", {classname:'bg-danger',"delay":"2000"});
    }
  }
  
  userAutocomplete(email:string,password:string) {
    this.user.email = email;
    this.user.password = password;
  }

  showToast(mensaje: string, tiempo: number) {
    this.mensaje = mensaje;
    this.toast = true;
    setTimeout(()=> {
      this.toast = false;
      this.mensaje = "";
    },tiempo)
  }

}
