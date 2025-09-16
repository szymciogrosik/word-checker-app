import {Injectable} from '@angular/core';
import {Functions, httpsCallable} from '@angular/fire/functions';
import {from} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {
  private searchExactFunctionName: string = 'searchExact';

  constructor(
    private functions: Functions
  ) {
  }

  public searchExact(word: string) {
    const callableFn = httpsCallable(this.functions, this.searchExactFunctionName);
    return from(callableFn({word}));
  }

}
