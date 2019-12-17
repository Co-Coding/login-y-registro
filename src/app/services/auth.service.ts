import { Injectable } from '@angular/core';
import { UsuarioModel } from '../components/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient ) { 
  
    this.leerToken();

  }

  userToken: string;

  private url = 'https://identitytoolkit.googleapis.com/v1/'
  private API_KEY = 'AIzaSyD9-T9_GbAd5fKRoGjqWpcO-3WqzFDxLhY'

  // Sign Up
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Sign In
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  login( usuario:UsuarioModel ){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }accounts:signInWithPassword?key=${ this.API_KEY }`, authData
    ).pipe(
      map( resp => { 
         this.guardarToken(resp['idToken']);
         return resp;
        
        })
    )
  }

  logout(){
    localStorage.removeItem('token');
  }

  nuevoUsuario( usuario:UsuarioModel ){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }accounts:signUp?key=${ this.API_KEY }`, authData
    ).pipe(
      map( resp => { 
         this.guardarToken(resp['idToken']);
         return resp;
        
        })
    )
  }

  guardarToken( idToken:string ){
  
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){

    if ( localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    } return this.userToken;
  }

  estaAutenticado(): boolean{
    return this.userToken.length > 2;
  }

}
