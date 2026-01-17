import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjetcsService } from '../../services/projetcs.service';
import { Project } from '../../interfaces/Project';

@Component({
    selector: 'app-project-detail-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './project-detail-page.html',
    styleUrl: './project-detail-page.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPage implements OnInit {
    private route = inject(ActivatedRoute);
    private projectsService = inject(ProjetcsService);

    public project = signal<Project | undefined>(undefined);
    public currentImageIndex = signal(0);
    public isModalOpen = signal(false);
    public modalImageIndex = signal(0);

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            const foundProject = this.projectsService.getProjectById(id);
            this.project.set(foundProject);
        });
    }

    nextImage() {
        const images = this.project()?.Images || [];
        if (images.length === 0) return;
        this.currentImageIndex.update(i => (i + 1) % images.length);
    }

    prevImage() {
        const images = this.project()?.Images || [];
        if (images.length === 0) return;
        this.currentImageIndex.update(i => (i - 1 + images.length) % images.length);
    }

    openModal(index: number) {
        this.modalImageIndex.set(index);
        this.isModalOpen.set(true);
    }

    closeModal() {
        this.isModalOpen.set(false);
    }

    nextModalImage() {
        const images = this.project()?.Images || [];
        if (images.length === 0) return;
        this.modalImageIndex.update(i => (i + 1) % images.length);
    }

    prevModalImage() {
        const images = this.project()?.Images || [];
        if (images.length === 0) return;
        this.modalImageIndex.update(i => (i - 1 + images.length) % images.length);
    }
}
