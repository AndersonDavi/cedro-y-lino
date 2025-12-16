import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FooterService } from '../../services/footer.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-services-page',
  imports: [CommonModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPage implements OnInit, OnDestroy {
  public cardToShow = signal(0);
  public footerService = inject(FooterService);
  public navbarService = inject(NavbarService);

  public ngOnInit(): void {
    this.footerService.setFooterStyleToShow('small');
  }
  public ngOnDestroy(): void {
    this.footerService.setFooterStyleToShow('full');
    this.navbarService.setNavbarStyleToShow('transparent');
  }
  public setCardToShow(card: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.cardToShow.set(card);
    switch (card) {
      case 1:
        this.navbarService.setNavbarStyleToShow('text-white');
        break;
      case 2:
        this.navbarService.setNavbarStyleToShow('text-white');
        break;
      case 3:
        this.navbarService.setNavbarStyleToShow('text-white');
        break;
      default:
        this.navbarService.setNavbarStyleToShow('text-white');
        break;
    }
  }
  closeModal() {
    this.cardToShow.set(0);
    this.navbarService.setNavbarStyleToShow('transparent');
  }
}
