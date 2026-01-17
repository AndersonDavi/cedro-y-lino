import { Injectable, signal } from '@angular/core';
import { Project } from '../interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjetcsService {
  private projects = signal<Project[]>([]);
  private projectsFolder = 'projects';

  constructor() {
    this.loadProjects();
  }

  getProjects() {
    return this.projects();
  }

  getProjectById(id: string) {
    return this.projects().find(p => p.id === id);
  }

  loadProjects() {
    this.projects.set([
      {
        id: 'bano_lujo',
        Title: 'BAÑO DE LUJO',
        Description: 'Este baño de lujo fue diseñado para ofrecer una experiencia de confort y sofisticación. Las paredes de mármol, con su elegante textura y tonalidades, aportan una sensación de frescura y modernidad. La imponente tina se convierte en el centro del espacio, mientras que el gran espejo con aro de luz crea una atmósfera de amplitud y luminosidad. Los acabados en madera y los detalles en dorado, como el porta toallas, aportan un toque cálido y lujoso que completa el diseño. Cada elemento fue cuidadosamente elegido para transformar este baño en un refugio exclusivo, donde la funcionalidad y la elegancia se fusionan perfectamente.',
        Images: ['1.png', '2.png', '3.png']
      },
      {
        id: 'armonia_infantil',
        Title: 'ARMONÍA INFANTIL',
        Description: 'En la creación de esta habitación infantil, se buscó un diseño que combinara calidez y serenidad. El contraste entre los tonos tierra y el baby blue aportó una atmósfera equilibrada y relajante. Para añadir un toque acogedor, se incorporaron textiles suaves que invitan al confort y la tranquilidad. Cada elemento, desde el mobiliario hasta los detalles decorativos, fue seleccionado con cuidado para lograr un espacio funcional y estéticamente armonioso, pensado especialmente para el descanso y el juego del niño.',
        Images: ['1.jpg', '2.jpg', '3.jpg']
      },
      {
        id: 'bano_tropical',
        Title: 'BAÑO TROPICAL',
        Description: 'El diseño de este baño tropical se centró en crear un ambiente único y relajante, combinando elementos naturales con detalles personalizados. El papel tapiz tropical, con sus vibrantes motivos, le dio al espacio un toque exótico y fresco. Los espejos redondos aportaron suavidad y elegancia, mientras que el lavamanos de mármol, cuidadosamente seleccionado, brindó sofisticación y funcionalidad. Las divisiones en madera, que aportaron calidez y textura al conjunto, completaron la propuesta, generando un ambiente armonioso y acogedor. Cada detalle fue pensado para transformar el baño en un refugio lleno de frescura y estilo.',
        Images: ['1.png', '2.png', '3.png']
      }
    ]);
  }
}
