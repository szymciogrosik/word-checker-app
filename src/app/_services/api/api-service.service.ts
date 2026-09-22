import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {CustomTranslateService} from '../translate/custom-translate.service';

@Injectable({providedIn: 'root'})
export class ApiService {
  private cache: { [char: string]: Set<string> } = {};
  private customTranslateService = inject(CustomTranslateService);

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
        if (text.trim().startsWith('<')) {
          throw new Error(this.customTranslateService.get('api.error.htmlReceived'));
        }

        const wordsArray = text.split('\n').map(w => w.trim()).filter(w => w.length > 0);
        this.cache[firstChar] = new Set(wordsArray);
        const found = this.cache[firstChar].has(lowerWord);
        return { data: { found } };
      }),
      catchError(err => {
        console.error(`${this.customTranslateService.get('api.error.downloadFailed')} assets/words/${firstChar}.txt`, err);
        throw err;
      })
    );
  }
}
