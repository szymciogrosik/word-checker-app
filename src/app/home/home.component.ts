import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {APP_CONFIG} from '../app.config.token';
import {MatCardModule} from '@angular/material/card';
import {ApiService} from '../_services/api/api-service.service';
import {SnackbarService} from '../_services/util/snackbar.service';
import {CustomTranslateService} from '../_services/translate/custom-translate.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatCardModule,
    MatButton,
    MatInput,
    MatFormField,
    FormsModule,
    MatLabel,
    MatIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @ViewChild('wordInput') wordInput!: ElementRef;

  loading = false;
  queryWord: string;
  lastSearchedWord: string | undefined;
  presentWord: boolean | undefined;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.resetQueryAndSearchResults();
  }

  protected readonly environment = inject(APP_CONFIG);
  private snackbarService = inject(SnackbarService);
  private customTranslateService = inject(CustomTranslateService);

  ngOnInit(): void {}

  searchWord() {
    this.resetSearchResult();

    let queryToSearch = this.queryWord.toLowerCase();
    if (!queryToSearch) {
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();
    
    this.api.searchExact(queryToSearch).subscribe({
      next: (res: any) => {
        this.lastSearchedWord = queryToSearch;
        this.presentWord = res.data.found;
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('Error in call to search words API ', err);
        this.snackbarService.openSnackBar(this.customTranslateService.get('search.word.error'));
        this.loading = false;
        this.cdr.markForCheck();
      },
      complete: () => {
        this.loading = false;
        this.cdr.markForCheck();
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
    this.cdr.markForCheck();
  }

  openDictionary() {
    window.open('https://sjp.pl/' + this.lastSearchedWord, '_blank');
  }

}
