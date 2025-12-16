
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public navbarStyleToShow = signal<'transparent' | 'solid' | 'text-white'>('transparent');
  public setNavbarStyleToShow(style: 'transparent' | 'solid' | 'text-white') {
    this.navbarStyleToShow.set(style);
  }
}
