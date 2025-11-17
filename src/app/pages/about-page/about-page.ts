import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  public cardToShow = signal(0);
  public setCardToShow(card: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.cardToShow.set(card);
  }
  closeModal() {
    this.cardToShow.set(0);
  }
}
