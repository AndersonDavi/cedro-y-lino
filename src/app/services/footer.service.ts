import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public footerStyleToShow = signal<'full' | 'small'>('small');
  public setFooterStyleToShow(style: 'full' | 'small') {
    this.footerStyleToShow.set(style);
  }
}
