import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_API_URL = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    return this.http.post(this.BASE_API_URL + '/users/signup', authData);
  }

  signIn(email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    return this.http.post(this.BASE_API_URL + '/users/login', authData);
  }
}
