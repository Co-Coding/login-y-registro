import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {


  usuario:UsuarioModel = new UsuarioModel;
  recordarme = false;

  constructor( private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit( form:NgForm ){

    if ( form.invalid ) { return; }

    if ( this.recordarme === true ){
      localStorage.setItem('email', this.usuario.email)
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp => {
      console.log(resp)
      Swal.close();

      if (this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/login')

    }, (err) =>{
      Swal.fire({
        icon: 'error',
  title: 'Error al autenticar',
  text: err.error.error.message
      });
    });


     


    // console.log(form);
    // console.log(this.usuario);
    
  }

}
