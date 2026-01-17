import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProjetcsService } from '../../services/projetcs.service';
import { Project } from '../../interfaces/Project';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  private projectsService = inject(ProjetcsService);
  public projects = computed(() => this.projectsService.getProjects());
  constructor() {
    this.projectsService.loadProjects();
  }

  getFirstImage(project: Project) {
    return project.Images[0];
  }
}
