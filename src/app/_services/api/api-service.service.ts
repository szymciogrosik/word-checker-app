import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient, private auth: Auth) {}

  public searchExact(word: string) {
    return from(this.auth.currentUser?.getIdToken(true) || Promise.resolve(''))
      .pipe(
        switchMap(token => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get(`${this.baseUrl}/exact?q=${word}`, { headers });
        })
      );
  }
}
