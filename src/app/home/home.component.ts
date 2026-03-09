import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {ApiService} from '../_services/api/api-service.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButton,
    MatInput,
    MatFormField,
    FormsModule,
    MatLabel,
    MatIcon
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('wordInput') wordInput!: ElementRef;

  loading = false;
  queryWord: string;
  lastSearchedWord: string | undefined;
  presentWord: boolean | undefined;

  constructor(private api: ApiService) {
    this.resetQueryAndSearchResults();
  }

  protected readonly environment = environment;

  ngOnInit(): void {}

  searchWord() {
    this.resetSearchResult();

    let queryToSearch = this.queryWord.toLowerCase();
    if (!queryToSearch) {
      return;
    }

    this.loading = true;
    this.api.searchExact(queryToSearch).subscribe({
      next: (res: any) => {
        this.lastSearchedWord = queryToSearch;
        this.presentWord = res.data.found;
      },
      error: err => {
        console.error('Error in call to search words API ', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  resetQueryAndSearchResults() {
    this.queryWord = '';
    this.resetSearchResult();

    setTimeout(() => {
      if (this.wordInput) {
        this.wordInput.nativeElement.focus();
      }
    });
  }

  resetSearchResult() {
    this.lastSearchedWord = undefined;
    this.presentWord = undefined;
  }

  openDictionary() {
    window.open('https://sjp.pl/' + this.lastSearchedWord, '_blank');
  }
}
