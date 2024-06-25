import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  isDarkTheme = this.darkThemeMediaQuery.matches;
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.getStoredTheme()
    this.setTheme()
  }

  getStoredTheme(){
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme){
      this.isDarkTheme = storedTheme === 'dark';
    }
  }

  changeTheme(){
    this.isDarkTheme = !this.isDarkTheme
    this.setTheme()
  }

  setTheme(){
    const theme = this.isDarkTheme ? 'dark' : 'light'
    localStorage.setItem('theme', theme);
    const htmlElement = this.document.getElementsByTagName('html');
    htmlElement[0]!.setAttribute('data-bs-theme', theme)
  }
}
