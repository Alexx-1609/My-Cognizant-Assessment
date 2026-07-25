import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login() {

    // Dummy JWT for learning
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.demo.jwt.token'
    );

    localStorage.setItem(
      'loggedIn',
      'true'
    );

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');

  }

  isLoggedIn(): boolean {

    return localStorage.getItem('loggedIn') === 'true';

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

}