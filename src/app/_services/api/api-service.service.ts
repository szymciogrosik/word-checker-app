import {Injectable} from '@angular/core';
import {Functions, httpsCallable} from '@angular/fire/functions';
import {from} from 'rxjs';
import {Auth, getIdToken} from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(
    private functions: Functions,
    private auth: Auth
  ) {
  }

  public searchExact(word: string) {
    getIdToken(this.auth.currentUser!).then(token => console.log('Firebase ID token', token));

    const callableFn = httpsCallable(this.functions, 'searchExact');
    return from(callableFn({word}));
  }
}
