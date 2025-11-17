import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  model,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DropdownItem } from '../../interfaces/dropdown-item';

@Component({
  selector: 'custom-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
  host: {
    class: 'size-full min-h-fit flex flex-col',
  },
})
export class DropdownComponent {
  //TODO: FUNCIONALIDAD FORMULARIOS REACTIVOS, FUNCIONALIDAD PARA MOSTRAR POR GRUPOS, NORMALIZAR MYUASCULAS Y MIONUSCULAS
  defaultValue = input<DropdownItem | null>(null);
  label = input<string>('');
  showLabel = input<boolean>(false);
  canSelectNull = input<boolean>(true);
  canSearch = input<boolean>(true);
  searchOutput = output<string>();
  pageChange = output<number>();
  private currentPage = 0;
  inputLoading = model<boolean>(false);
  open = model<boolean>(false); // se puede exponer como [(open)] desde el padre si se desea [web:3]
  search = model<string>(''); // usable en plantilla o desde el padre [web:3]
  disabledSig = signal<boolean>(false); // estado disabled proveniente del formulario [web:93]
  labelItemType = input<string>('');
  disabled = input<boolean>(false);
  constructor(private eRef: ElementRef) {
    effect(() => {
      const loading = this.inputLoading();
      if (!loading && this.open()) {
        setTimeout(() => this.adjustDropdownPosition(), 0);
      }
    });
  }
  ngOnInit() {
    queueMicrotask(() => this.setDefaultSelection());
  }
  public searchType = input<'localeFilter' | 'outputFilter'>('localeFilter');

  public itemSelected: OutputEmitterRef<DropdownItem> = output<DropdownItem>(); // evento público [web:9]
  // Valor del control (lo que viaja al FormControl)
  public selectedValue = model<DropdownItem | null>(null); // interno, writable [web:93]
  // Exposición opcional como computed si quieres read-only hacia template
  public value = computed(() => this.selectedValue()); // cacheado [web:73]

  // Datos
  items = model<DropdownItem[]>([]);

  public onSearchChange(value: string) {
    this.search.set(value);

    if (this.searchType() === 'outputFilter') {
      this.searchOutput.emit(value); // padre recibe el texto
    }
  }

  public filteredItems = computed(() => {
    const term = this.search().trim().toLowerCase();
    const all = this.items();

    // Si el tipo es outputFilter, no filtra localmente,
    // solo devuelve lo que ya llegó por input
    if (this.searchType() === 'outputFilter') {
      return all;
    }

    if (!term) return all;
    return all.filter(
      (c) =>
        c.label.toString().toLowerCase().includes(term) ||
        c.secondaryLabel?.toString().toLowerCase().includes(term)
    );
  });
  // Callbacks provistos por Forms API
  private onChange: (value: DropdownItem | null) => void = () => { }; // notifica cambios al FormControl [web:93]
  private onTouched: () => void = () => { }; // marca touched [web:93]

  // CVA: escribe valor desde el FormControl al control
  writeValue(value: DropdownItem | null): void {
    this.selectedValue.set(value);
    // si llega un valor externo, podrías cerrar y limpiar búsqueda si aplica
    // this.open.set(false); this.search.set('');
  }

  // CVA: registra callback de cambio
  registerOnChange(fn: (value: DropdownItem | null) => void): void {
    this.onChange = fn;
  }

  // CVA: registra callback de touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // CVA: disabled desde el formulario
  setDisabledState(isDisabled: boolean): void {
    this.disabledSig.set(isDisabled);
  }

  ngAfterViewInit() {
    if (this.open()) {
      setTimeout(() => this.adjustDropdownPosition(), 0);
    }
  }
  // Interacción UI
  toggleOpen() {
    if (this.disabled() || this.disabledSig() || this.inputLoading()) return;
    this.open.set(!this.open());
    if (this.open()) {
      // Esperar al siguiente ciclo de render para asegurar que el dropdown exista
      setTimeout(() => this.adjustDropdownPosition(), 0);
    }
  }

  public select(item: DropdownItem) {
    if (this.disabledSig()) return;
    this.selectedValue.set(item); // actualiza estado interno [web:93]
    this.onChange(item); // notifica al FormControl [web:93]
    this.onTouched(); // marca touched [web:93]
    this.open.set(false); // UX: cierra [web:73]
    this.search.set(''); // UX: limpia [web:73]
    this.itemSelected.emit(item); // Output para lógica imperativa del padre [web:112]
  }

  // Opcional: limpiar selección
  public clear() {
    if (this.disabledSig()) return;
    this.selectedValue.set(null);
    this.onChange(null);
    this.onTouched();
  }

  // Método público para limpiar la selección desde el componente padre
  public clearSelection(): void {
    this.clear();
    this.search.set(''); // También limpia el campo de búsqueda
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = this.eRef.nativeElement.contains(target);
    const isModalOverlay = target.classList.contains('overlay');
    const isDropdownButton = target.closest('button')?.contains(target);

    if (this.open() && !clickedInside && !isModalOverlay && !isDropdownButton) {
      this.open.set(false);
      this.search.set('');
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustDropdownPosition();
  }

  adjustDropdownPosition() {
    const dropdown = this.eRef.nativeElement.querySelector(
      '.dropdown-panel'
    ) as HTMLElement;
    if (!dropdown) return;

    const rect = dropdown.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // espacio desde el top hasta el bottom de la ventana
    const spaceBelow = windowHeight - rect.top - 10; // margen de 10px

    // le damos un maxHeight dinámico
    dropdown.style.maxHeight = `${spaceBelow}px`;
    dropdown.style.overflowY = 'auto';
  }
  public onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = 50; // px de tolerancia
    const atBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - threshold;

    if (atBottom && !this.inputLoading()) {
      this.onScrollEnd();
    }
  }
  private onScrollEnd() {
    this.currentPage++;
    this.pageChange.emit(this.currentPage);
  }
  public setDefaultSelection() {
    this.selectedValue.set(this.defaultValue());
    this.onChange(this.defaultValue());
  }
}
