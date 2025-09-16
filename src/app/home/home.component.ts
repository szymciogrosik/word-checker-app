import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {CustomCommonModule} from "../_imports/CustomCommon.module";
import {ApiService} from "../_services/api/api-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CustomCommonModule],
})
export class HomeComponent implements OnInit {
  results: string[] = [];
  query: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
  }

  protected readonly environment = environment;

  searchWord() {
    this.api.searchExact(this.query).subscribe({
      next: (res: any) => {
        this.results = res.data.found ? [res.data.word] : [];
      },
      error: (err) => {
        console.error('Error in call to search words API ', err);
        this.results = [];
      }
    });
  }
}
