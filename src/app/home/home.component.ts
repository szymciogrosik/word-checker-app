import { Component } from '@angular/core';
import { ApiService } from '../_services/api/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  results: string[] = [];
  query: string = '';

  constructor(private api: ApiService) {}

  searchWord() {
    this.api.searchExact(this.query).subscribe({
      next: (res: any) => {
        // Cloud Run zwraca np. { found: true, word: "test" }
        this.results = res.found ? [res.word] : [];
      },
      error: (err) => {
        console.error('Błąd API', err);
        this.results = [];
      }
    });
  }
}
