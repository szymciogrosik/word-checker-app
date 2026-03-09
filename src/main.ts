import {enableProdMode, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {getAnalytics, provideAnalytics} from '@angular/fire/analytics';
<<<<<<< HEAD
import {getFunctions, provideFunctions} from '@angular/fire/functions';
=======
>>>>>>> template/main
import {provideTranslateService} from '@ngx-translate/core';
import {AppComponent} from './app/app.component';
import {routing} from './app/app-routing.module';
import {environment} from './environments/environment';
<<<<<<< HEAD
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {AssetsService} from './app/_services/util/assets.service';
=======
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {AssetsService} from "./app/_services/util/assets.service";
>>>>>>> template/main
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorIntl} from './app/_services/util/custom-paginator-intl.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
<<<<<<< HEAD
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: AssetsService.BASE_PATH + 'i18n/',
=======
    provideZoneChangeDetection(), provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: AssetsService.BASE_PATH + "i18n/",
>>>>>>> template/main
        suffix: `.json?v=${environment.buildVersion}`
      }),
      fallbackLang: `${environment.default_language}`,
      lang: `${environment.default_language}`
    }),
    importProvidersFrom(routing),
    importProvidersFrom(MatNativeDateModule),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
<<<<<<< HEAD
    provideFunctions(() => getFunctions()),
=======
>>>>>>> template/main
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    {provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}
  ]
}).catch(error => {
<<<<<<< HEAD
  console.error('Init failed: ' + error);
=======
  console.error("Init failed: " + error)
>>>>>>> template/main
});
