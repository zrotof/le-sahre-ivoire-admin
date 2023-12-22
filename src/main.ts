import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Routes, provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FontAwesomeModule, HttpClientModule),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
  ]
})
.catch(err => console.error(err));
