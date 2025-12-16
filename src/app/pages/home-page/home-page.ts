import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {
  private navbarService = inject(NavbarService);

  images = [
    'backgrounds/mesa_de_trabajo_1.webp',
    'backgrounds/mesa_de_trabajo_2.webp',
  ];

  public currentIndex = signal(0);
  public intervalId!: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000); // cambiar cada 3 segundos
    this.navbarService.setNavbarStyleToShow('transparent');
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  nextImage() {
    console.log(this.currentIndex());
    this.currentIndex.set((this.currentIndex() + 1) % this.images.length);
  }
}
