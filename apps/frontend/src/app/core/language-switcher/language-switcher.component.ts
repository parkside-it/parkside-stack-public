import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentService } from '@psf/environment.service';

@Component({
  selector: 'ps-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
  constructor(private router: Router, private envService: EnvironmentService) {}

  ngOnInit(): void {}

  get supportedLocales(): string[] {
    return this.envService.languages.filter((lang: string) => {
      return location.pathname.substring(1, 3) !== lang;
    });
  }
}
