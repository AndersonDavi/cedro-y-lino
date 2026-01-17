import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FooterService } from '../../services/footer.service';
@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements OnInit, OnDestroy {
  private footerService = inject(FooterService);

  ngOnInit(): void {
    this.footerService.setFooterStyleToShow('full');
  }

  ngOnDestroy(): void {
    this.footerService.setFooterStyleToShow('small');
  }
}
