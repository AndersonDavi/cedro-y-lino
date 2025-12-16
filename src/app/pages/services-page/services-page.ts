import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'app-services-page',
  imports: [CommonModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPage implements OnInit,OnDestroy {
  public cardToShow = signal(0);
  public footerService = inject(FooterService);
  public ngOnInit(): void {
    this.footerService.setFooterStyleToShow('small');
  }
  public ngOnDestroy(): void {
    this.footerService.setFooterStyleToShow('full');
  }
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
