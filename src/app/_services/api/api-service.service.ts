import {Injectable} from '@angular/core';
import {Functions, httpsCallable} from '@angular/fire/functions';
import {from} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(
    private functions: Functions
  ) {
  }

  public searchExact(word: string) {
    const callableFn = httpsCallable(this.functions, 'searchExact');
    return from(callableFn({word}));
  }
}
