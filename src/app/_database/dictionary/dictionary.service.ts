import { Injectable, inject } from '@angular/core';
import { Firestore, doc, writeBatch, getDoc } from '@angular/fire/firestore';

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
    let batchSize = words.length;
    for (let i = 0; i < words.length; i += batchSize) {
      const batch = writeBatch(this.firestore);
      const chunk = words.slice(i, i + batchSize);

      chunk.forEach(rawWord => {
        const word = rawWord.trim();
        if (!word) return;
        const docRef = doc(this.firestore, `${this.path}/${word}`);
        batch.set(docRef, { word });
      });

      await batch.commit();
      await new Promise(r => setTimeout(r, 500));
    }
  }

  public async exists(word: string): Promise<boolean> {
    const docRef = doc(this.firestore, `${this.path}/${word.trim()}`);
    const snapshot = await getDoc(docRef);
    return snapshot.exists();
  }
}
