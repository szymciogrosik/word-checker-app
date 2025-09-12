import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-manage-dictionary',
  imports: [
    ReactiveFormsModule,
    MatButton,
    TranslateModule,
    MatProgressBar,
  ],
  templateUrl: './manage-dictionary.component.html',
  styleUrl: './manage-dictionary.component.scss'
})
export class ManageDictionaryComponent {
  fileName: string;
  fileSizeMB: number;
  loading: boolean;
  progress: number;
  totalWords: number;

  constructor() {
    this.setDefaultSelectedFileValues();
  }

  private setDefaultSelectedFileValues(): void {
    this.fileName = '';
    this.fileSizeMB = 0;
    this.loading = false;
    this.progress = 0;
    this.totalWords = 0;
  }

  onRemoveAll() {
    this.setDefaultSelectedFileValues();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.fileName = file.name;
    this.fileSizeMB = (file.size / (1024 * 1024)).toFixed(2) as unknown as number;
    this.loading = true;
    this.progress = 0;
    this.totalWords = 0;

    const reader = file.stream().getReader();
    const decoder = new TextDecoder();
    const fileSize = file.size;
    let partial = '';
    let processedBytes = 0;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      processedBytes += value.length;
      const chunk = decoder.decode(value, { stream: true });
      partial += chunk;

      let lines = partial.split('\n');
      partial = lines.pop() || '';

      for (const line of lines) {
        const word = line.trim();
        if (word) this.totalWords++;
      }

      this.progress = +(processedBytes / fileSize * 100).toFixed(2);
    }

    if (partial.trim()) {
      this.totalWords++;
    }

    this.loading = false;
  }

}
