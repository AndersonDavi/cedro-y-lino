import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, HostListener, inject, input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { DropdownItem } from '../../interfaces/dropdown-item';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'custom-navbar',
  imports: [RouterModule, CommonModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full h-fit flex flex-col'
  }
})
export class NavbarComponent {
  public mobileView = signal(false);
  public isLarge = signal(false);
  public isMenuOpen = signal(true);
  private navbarService = inject(NavbarService);

  public navbarStyle = computed(() => {
    return this.navbarService.navbarStyleToShow();
  });

  constructor(private router: Router) {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    this.mobileView.set(window.innerWidth < 768);
    this.isLarge.set(window.innerWidth >= 1170);
    this.isMenuOpen.set(!this.mobileView());
  }
  toggleMenu() {
    if (!this.mobileView()) return;
    this.isMenuOpen.set(!this.isMenuOpen());
    const navContainer = document.querySelector('.nav-container');

    if (this.isMenuOpen()) {
      navContainer?.classList.remove('nav-blur-container');
      navContainer?.classList.add('nav-blur-active');
    } else {
      navContainer?.classList.remove('nav-blur-active');
      navContainer?.classList.add('nav-blur-container');
    }
  }
  itemClick() {
    this.toggleMenu();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
