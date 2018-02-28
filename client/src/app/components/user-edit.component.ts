import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
	selector: 'user-edit',
	templateUrl: '../views/user-edit.html',
	providers: [UserService]
})

export class UserEditComponent implements OnInit{
	public titulo: string;
	public user:User;
	public identity;
	public token;
	public alertMessage;

	constructor(
		private _userService: UserService
	){
		this.titulo = 'Actualzar mis datos';
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.user = this.identity;
	}

	ngOnInit(){
		console.log('user-edit.component.ts cargado');
	}

	onSubmit(){ 
		this._userService.updateUser(this.user).subscribe(
			response => {
				if(!response.user){
					this.alertMessage = 'El usuario no se ha actualizado';
					console.log(response);
				}else{
					//this.user = response.user;
					localStorage.setItem('identity', JSON.stringify(this.user));
					document.getElementById("identity_name").innerHTML = this.user.name;

					this.alertMessage = 'Datos actualizados correctamente.';
				}
			},
			error => {
	  			var errorMessage = <any>error;

	  			if(errorMessage != null){
	  				var body = JSON.parse(error._body);
	  				this.alertMessage = body.message;
	  				console.log(error);
	  			}
	  		}
		);
	}

	public filesToUploand: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUploand = <Array<File>>fileInput.target.files;
		console.log(this.filesToUploand);
	}

	makeFileRequest(url:string, params:Array<string>, files: Array<File>){
		var token = this.token;

		return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i > files.length; i++){
				formData.append('image', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		});
	}
}
