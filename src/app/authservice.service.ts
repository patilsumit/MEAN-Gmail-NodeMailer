import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';


export interface UserDetails {
  _id: string
  user_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id: string
  user_name: string
  email: string
  password: string
}

const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private token: string

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(BACKEND_URL +`/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
          this.router.navigateByUrl('/users/profile')
        }
        
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(BACKEND_URL + `/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  sendEmail(data){
    
    return this.http.post(BACKEND_URL + `/sendemail`,data);
    
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
