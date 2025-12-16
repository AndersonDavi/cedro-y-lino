import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'custom-footer',
  imports: [RouterModule],
  templateUrl: './custom-footer.component.html',
  styleUrl: './custom-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'size-full'
  }
})

export class CustomFooterComponent {
  public footerService = inject(FooterService);
  public footerStyle = computed(() => this.footerService.footerStyleToShow());
  lang: 'es' | 'en' = window.location.pathname.startsWith('/es') ? 'es' : 'en';

  getRoute(service: 'Accounting' | 'Payroll' | 'Taxes' | 'Other services') {
    const map = {
      es: {
        Accounting: 'Cuentas',
        Payroll: 'Salarios',
        Taxes: 'Impuestos',
        'Other services': 'Cuentas'
      },
      en: {
        Accounting: 'Accounting',
        Payroll: 'Payroll',
        Taxes: 'Taxes',
        'Other services': 'Accounting'
      }
    };
    const base = this.lang === 'es' ? '/services/' : '/services/';
    return base + map[this.lang as keyof typeof map][service];
  }
}
