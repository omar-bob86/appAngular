import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'MUSYFY!';
  public user: User;
  public identity;
  public token;
  public errorMessage;

  constructor(
  	private _userService:UserService
  	){
  	this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
  	
  }

  public onSubmit(){
  	console.log(this.user);

  	this._userService.signup(this.user).subscribe(
  		response => {
  			let identity = response.user;
  			this.identity = identity;

  			if(!this.identity._id){
  				alert("El usuario no está correctamente identificado");
  			}else{
  				//Crear elemento en el localstorage para tener al usuario sesión
  			}
  		},
  		error => {
  			var errorMessage = <any>error;

  			if(errorMessage != null){
  				var body = JSON.parse(error._body);
  				this.errorMessage = body.message;;
  				console.log(error);
  			}
  		}
  	);
  }
}
