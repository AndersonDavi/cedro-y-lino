import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { CustomFooterComponent } from "../components/footer/custom-footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, CustomFooterComponent, CommonModule],
  template: `

  <div class="flex flex-col min-h-screen bg-primary-500">
    <custom-navbar class="fixed top-5 left-0 right-0 z-50"/>
    <main class="overflow-x-clip">
      <router-outlet/>
    </main>
    <custom-footer/>
  </div>

   @if (loading()) {
   <!-- @if (true) { -->
  <div class="fixed h-screen w-screen top-0 left-0 right-0 z-50 bg-primary-500 flex items-center justify-center">
    <img src="/logos/4.1.webp" alt="Logo de la empresa" class="size-40 object-contain">
    <img src="/logos/6.0.webp" alt="Logo de la empresa" class="size-14 absolute bottom-5 object-contain">
  </div>
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public loading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
  }
}
