import {Component} from '@angular/core';
import {environment} from "../../environments/environment";
import {CustomCommonModule} from "../_imports/CustomCommon.module";
import {ApiService} from "../_services/api/api-service.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CustomCommonModule],
})
export class HomeComponent {
  loading = false;
  queryWord: string;
  lastSearchedWord: string | undefined;
  presentWord: boolean | undefined;

  constructor(private api: ApiService) {
    this.resetQueryAndSearchResults();
  }

  protected readonly environment = environment;

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
      error: (err) => {
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
  }

  resetSearchResult() {
    this.lastSearchedWord = undefined;
    this.presentWord = undefined;
  }

  openDictionary() {
    window.open('https://sjp.pl/' + this.lastSearchedWord, '_blank');
  }
}
