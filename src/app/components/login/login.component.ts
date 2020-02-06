import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {


  usuario:UsuarioModel = new UsuarioModel;
  recordarme = false;

  constructor( private auth:AuthService, private router:Router ) { }

  ngOnInit() {
    // Mantener checkbox
      if(localStorage.getItem('checkBox')){
        this.recordarme = JSON.parse(localStorage.getItem("checkBox"));
        // console.log(localStorage['checkBoxes'].length);
      }

      if (this.recordarme === false ){
        localStorage.removeItem('email')
      }

    if (localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email')
    };
  }

  

  login( form:NgForm ){

    if ( form.invalid ) { return; }

  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text: 'Espere por favor...'
  });
  Swal.showLoading();

    this.auth.login(this.usuario)
    .subscribe( resp =>{
      Swal.close();

  if ( this.recordarme === true ){
      localStorage.setItem('email', this.usuario.email)
    }
     else {
      localStorage.removeItem('email')
    }

     this.router.navigateByUrl('/home')
    // console.log(form);
    }, (err) =>{
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
  }

  // Mantener checkbox
valueChange(){
  localStorage.setItem("checkBox", JSON.stringify(this.recordarme));
}

}
