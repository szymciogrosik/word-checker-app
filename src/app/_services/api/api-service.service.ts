import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {
  private cache: { [char: string]: Set<string> } = {};

  constructor(private http: HttpClient) {}

  public searchExact(word: string): Observable<{ data: { found: boolean } }> {
    if (!word) return of({ data: { found: false } });
    
    const lowerWord = word.toLowerCase();
    const firstChar = lowerWord.charAt(0);

    if (this.cache[firstChar]) {
      const found = this.cache[firstChar].has(lowerWord);
      return of({ data: { found } });
    }

    return this.http.get(`assets/words/${firstChar}.txt?v=${environment.buildVersion}`, { responseType: 'text' }).pipe(
      map(text => {
        const wordsArray = text.split('\n').map(w => w.trim()).filter(w => w.length > 0);
        this.cache[firstChar] = new Set(wordsArray);
        const found = this.cache[firstChar].has(lowerWord);
        return { data: { found } };
      }),
      catchError(err => {
        console.error(`Nie udalo sie pobrac pliku assets/words/${firstChar}.txt`, err);
        this.cache[firstChar] = new Set();
        return of({ data: { found: false } });
      })
    );
  }
}
