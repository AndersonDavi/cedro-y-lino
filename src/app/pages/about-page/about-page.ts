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
  currentIndex = signal(0);

  teamMembers = [
    {
      name: 'MARÍA ALEJANDRA <br />RODRIGUEZ MOLINARES',
      roles: ['arquitecta', 'especialista en diseño de interiores', 'fundadora y directora creativa'],
      description: 'Apasionada por crear espacios que conecten con la esencia de quienes los habitan, combina su formación como arquitecta y su especialización en diseño de interiores con una sensibilidad especial por los detalles, la atmósfera y la funcionalidad. Disfruta diseñar mobiliario que aporte equilibrio y cuente historias dentro de cada proyecto, y lidera la dirección creativa para garantizar coherencia estética, calidez y un sello único en cada propuesta.',
      image: '/backgrounds/photo1.webp'
    },
    {
      name: 'NELSON F. <br />ANNICHIARICO M.',
      roles: ['arquitecto', 'fundador y', 'director de producción'],
      description: 'Experto en la materialización de ideas, lidera los procesos de producción asegurando que cada detalle técnico se ejecute con precisión. Su enfoque se centra en la calidad de los materiales y la excelencia en la construcción para garantizar resultados duraderos y estéticos.',
      image: '/backgrounds/photo1.webp' // Placeholder, user might want to change it later
    },
    {
      name: 'ILVA MONARES AMAYA',
      roles: ['arquitecta', 'especialista en diseño de interiores', 'fundadora y ceo'],
      description: 'Con una visión estratégica y un liderazgo inspirador, guía a la empresa hacia la excelencia en cada proyecto. Su experiencia en gestión y diseño permite que el equipo trabaje en armonía para superar las expectativas de nuestros clientes.',
      image: '/backgrounds/photo1.webp' // Placeholder
    }
  ];

  next() {
    this.currentIndex.update(i => (i + 1) % this.teamMembers.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.teamMembers.length) % this.teamMembers.length);
  }
}

