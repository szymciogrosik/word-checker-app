# Sprawdzacz słów

A fast, free Polish word checker app — verifies whether a word is allowed in Polish word games (like Scrabble or Literaki).

**🔗 Live:** [Sprawdzacz słów](https://word-checker-app-2cbfd.web.app/)

---

## What is this?

**Sprawdzacz słów** ("Word Checker") lets you instantly look up whether any Polish word is valid for use in word games. Instead of querying a cloud database (slow, paid), the entire dictionary of ~2 million Polish words is served as lightweight static text files, split alphabetically, directly alongside the Angular app.

### How it works

1. **Type a word** in the search field.
2. The app downloads a small chunk file matching the word's first letter (e.g. `assets/words/d.txt` for words starting with "D").
3. The chunk is parsed into an in-memory `Set<string>` and **cached in the browser** — subsequent lookups for words with the same letter are instant (0 ms, no network request).
4. The result ("Yes, this word is allowed" / "No, this word is not allowed") is displayed immediately.
5. If the word is valid, a link to [sjp.pl](https://sjp.pl) is shown so you can check its meaning.

### Dictionary source

The dictionary comes from [sjp.pl](https://sjp.pl/sl/growy/) — a regularly updated list of all words valid in Polish word games.

---

## Tech stack

- **Angular** (standalone components, zoneless change detection)
- **Firebase** (Auth, Firestore, Hosting, Analytics)
- **@ngx-translate** — Polish / English UI
- **Angular Material** — UI components

---

## Updating the dictionary

A Bash script automates downloading and splitting the latest dictionary release:

```bash
./update_dictionary.sh sjp-YYYYMMDD.zip
```

What the script does:
1. Downloads the ZIP from `https://sjp.pl/sl/growy/<filename>` into `_sources/`.
2. Extracts `slowa.txt` from the ZIP.
3. Clears old chunks in `src/assets/words/`.
4. Splits `slowa.txt` alphabetically into individual chunk files (`a.txt`, `b.txt`, ... `z.txt`, etc.) using a Node.js stream for memory efficiency.
5. Updates `src/assets/status/status.json` with `lastDictionaryUpdateTime`.
6. Cleans up temporary files from `_sources/` (preserving `.gitignore`).

After running the script, commit the updated `src/assets/words/` and `src/assets/status/status.json`, then deploy.

---

## Quick start

```bash
# Install dependencies
npm install

# Run locally
ng serve
# Open http://localhost:4200
```

---

## Connect with template (first time only)

This project is based on the [Angular Firebase Accelerator](https://github.com/szymciogrosik/angular-firebase-accelerator) template.

```bash
./script_connect_with_template.sh
```

Resolve any conflicts, then commit and push:

```bash
git commit -m "Permanently link template history"
git push origin main
```

---

## Sync with template

To pull in future template updates:

```bash
./script_sync_with_template.sh
```

Resolve conflicts, then commit and push:

```bash
git commit -m "Merged latest changes from template repository"
git push origin main
```

---

## Firebase setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Enable **Email/Password** and **Google** auth providers.
3. Set up **Firestore** (Warsaw region, production mode).
4. Register a **Web app** and copy the config into the `src/environments/` files.
5. Set up **Firebase Hosting**.

See the [Angular Firebase Accelerator README](https://github.com/szymciogrosik/angular-firebase-accelerator) for detailed step-by-step Firebase and GitHub Actions setup instructions.

---

## Links

- **Live app:** [Sprawdzacz słów](https://word-checker-app-2cbfd.web.app/)
- **Dictionary source:** [sjp.pl](https://sjp.pl/sl/growy/)
- **Angular CLI:** https://github.com/angular/angular-cli
- **Firebase CLI:** https://firebase.google.com/docs/cli
