import {Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter, Input} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ViewContainerRef } from '@angular/core';
import { TagDto } from '../../models/tag.model';
import {TemplatePortal} from '@angular/cdk/portal';
import {NgForOf} from '@angular/common';
import {catchError, throwError} from 'rxjs';
import {TagsService} from '../../services/tags.service';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';

@Component({
  selector: 'app-tag-list-in-add-task',
  templateUrl: './add-tag-list.component.html',
  styleUrls: ['./add-tag-list.component.css'],
  imports: [
    NgForOf
  ]
})
export class AddTagItemComponent implements OnInit {
  @Input() tags: TagDto[] = [];
  @Output() tagsChanged = new EventEmitter<TagDto[]>();

  availableTags: TagDto[] = [];

  hoveredTag: string | null = null;
  overlayRef: OverlayRef | null = null;

  @ViewChild('tagPopupTemplate') tagPopupTemplate!: TemplateRef<any>;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private tagsService: TagsService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.tagsService.getAllTags().pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка загрузки списка тегов');
        return throwError(() => error);
      })
    ).subscribe(tags => {
      this.availableTags = tags.map(tag => ({...tag}));
    });
  }

  openTagPopup(event: MouseEvent): void {
    if (this.overlayRef) {
      this.closeTagPopup();
      return;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(event.target as HTMLElement)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }
      ]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    const portal = new TemplatePortal(this.tagPopupTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closeTagPopup());
  }

  closeTagPopup(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  addTag(tag: TagDto): void {
    if (!this.tags.some(t => t.id === tag.id)) {
      this.tags = [...this.tags, tag];
      this.tagsChanged.emit(this.tags);
    }
    this.closeTagPopup();
  }
}
