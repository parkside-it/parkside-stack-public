import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Environment } from '../environments/ienvironment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements Environment {
  constructor() {}

  get production(): boolean {
    return environment.production;
  }

  get languages(): string[] {
    return environment.languages;
  }

  get currentLocale(): string {
    return environment.currentLocale;
  }
}
