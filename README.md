# Word Checker App

This project was generated with latest version of [Angular CLI](https://github.com/angular/angular-cli).

## Local server

Run `ng serve` for a local server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## GitHub pages

[Deployed app on GitHub pages](https://szymciogrosik.github.io/angular-firebase-accelerator)

## Firebase hosting

[Deployed app on firebase hosting](https://angular-firebase-accelerator.web.app)

## Change version of angular cli

npm uninstall -g @angular/cli

npm cache clean --force

npm cache verify

npm install -g @angular/cli@wished.version.here

ng version

## Setup firebase

- Create a project
- Enable authentication (email and google with default settings)
- Add dummy user in authentication console by: email: email@gmail.com, pass: <whatever you want> -> copy the uid and store somewhere
- Navigate to the Settings in Authentication, and select Authorized domains. Add your GitHub pages domain, in my case it is: szymciogrosik.github.io

- Create Firebase database -> location: Warsaw -> Start in prod mode
- Add dummy user in authentication console by:  (location -> users -> AdamAbacki -> the rest as following)
- email: type string: email@gmail.com (your google email)
- firstName: type string: Adam
- lastName: type string: Abacki
- roles: type array -> string: ADMIN_FULL_ACCESS
- uid: type string: <copied from authentication>
- Fill in "Rules" tab
```json
rules_version = '2';

service cloud.firestore {
 match /databases/{database}/documents {
   // Match any document in the database
   match /{document=**} {
     allow read: if false;
     allow write: if false;
   }

	 // Specific rules for the 'public_settings' collection
   match /public_settings/{document=**} {
     allow read: if true;
     allow write: if request.auth != null;
   }
   
   // Specific rules for the 'users' collection
   match /users/{document=**} {
     allow read: if request.auth != null;
     allow write: if request.auth != null;
   }
 }
}
```

- Generate firebase config (Settings on the top -> General -> Scroll down "Web" -> process with guide)
- Add firebase config to codebase (without api key ofc), to the files:
  - environment.ts
  - firebase/environment.ts
  - ftp/environment.ts
  - gh-pages/environment.ts

- Install firebase cli (https://firebase.google.com/docs/cli?hl=pl)
- firebase login
- firebase init - will be added GH secret FIREBASE_SERVICE_ACCOUNT_<PROJECT_NAME> as private key generated on service accounts page

- GH settings -> Workflow permissions -> Read and write permissions
- + Allow GitHub Actions to create and approve pull requests
- GH settings -> pages -> enable from GitHub Actions

- GH Pages
- GH -> Settings -> Pages -> GitHub Actions
- GH -> Settings -> Environment -> github-pages -> Deployment branches and tags -> add release/gh-pages
- Firebase -> Authentication -> Settings -> Authorized domains -> add GitHub page
- GH -> Settings -> environment -> gh-pages -> add secret FIREBASE_API_KEY

- Copy and paste environment-example.ts to environment.ts
