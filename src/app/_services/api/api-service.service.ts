import { Injectable } from '@angular/core';
import { getFunctions, httpsCallable } from '@angular/fire/functions';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor() {}

  public searchExact(word: string) {
    const functions = getFunctions(); // firebase functions instance
    const callable = httpsCallable(functions, 'searchExact');
    return from(callable({ word })); // zwraca Observable
  }
}
