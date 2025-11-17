import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
