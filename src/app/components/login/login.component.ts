import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

    if (localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email')
       this.recordarme = true
    };
  }

  onSubmit( form:NgForm ){

    if ( form.invalid ) { return; }

    if ( this.recordarme === true ){
      localStorage.setItem('email', this.usuario.email)
    } else {
      localStorage.removeItem('email')
    }

    this.auth.login(this.usuario)
    .subscribe( resp => console.log(resp)
     );

     this.router.navigateByUrl('/home')
    console.log(form);

  }


}
