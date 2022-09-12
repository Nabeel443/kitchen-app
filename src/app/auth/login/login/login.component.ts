import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  alertMessage: any = {};

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSignIn() {
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        foundUser =>  {
        console.log(foundUser);
        this.alertService.success('User loggedIn successfully!');
      },
      err =>  {
        console.log(err);
        this.alertService.error('Auth failed.');
      })

      this.alertService.getAlert().subscribe(message  =>  {
        switch (message.type) {
          case 'success':
            this.alertMessage.cssClass = "alert alert-success";
            break;
          case 'error':
            this.alertMessage.cssClass = "alert alert-danger";
            break;
        }
        this.alertMessage.message = message.text;
      });
  }

}
