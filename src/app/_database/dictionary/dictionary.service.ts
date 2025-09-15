import { Injectable, inject } from '@angular/core';
import {Firestore, doc, writeBatch, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private firestore: Firestore;
  private path = 'dictionary_polish';

  constructor() {
    this.firestore = inject(Firestore);
  }

  public async addWords(words: string[]): Promise<void> {
    const batchLimit = 400;
    for (let i = 0; i < words.length; i += batchLimit) {
      const batch = writeBatch(this.firestore);
      const chunk = words.slice(i, i + batchLimit);

      chunk.forEach(rawWord => {
        const word = rawWord.trim();
        if (!word) return;
        const docRef = doc(this.firestore, `${this.path}/${word}`);
        batch.set(docRef, { word });
      });

      await batch.commit();
    }
  }

  public async exists(word: string): Promise<boolean> {
    const docRef = doc(this.firestore, `${this.path}/${word.trim()}`);
    const snapshot = await getDoc(docRef);
    return snapshot.exists();
  }
}
