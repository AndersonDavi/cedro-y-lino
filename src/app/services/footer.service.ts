import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public footerStyleToShow = signal<'full' | 'small'>('full');
  public setFooterStyleToShow(style: 'full' | 'small') {
    this.footerStyleToShow.set(style);
  }
}
