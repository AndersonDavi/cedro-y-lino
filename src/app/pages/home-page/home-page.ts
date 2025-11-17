import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {

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
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  nextImage() {
    console.log(this.currentIndex());
    this.currentIndex.set((this.currentIndex() + 1) % this.images.length);
  }
}
