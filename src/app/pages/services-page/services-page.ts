import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-services-page',
  imports: [CommonModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPage {
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
