import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  isUserSignup: boolean = false;
  alertMessage: any = {};

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.signupForm! = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSignUp(): void {
    if(this.signupForm.invalid)
      return;
    this.authService
      .createUser(this.signupForm.value.email, this.signupForm.value.password)
      .subscribe(
      data  =>  {
        this.alertService.success('Account created successfully!');
      },
      error =>  {
        this.alertService.error('Account already created with this email.');
      });

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
