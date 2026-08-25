import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Adiciona possibilidade de injeção de parametros da rota como inputs
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
};
