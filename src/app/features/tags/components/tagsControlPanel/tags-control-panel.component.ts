import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TagDto} from '../../models/tag.model';
import {NgForOf} from '@angular/common';
import {TagsService} from '../../services/tags.service';

@Component({
  selector: 'app-tags-control-panel',
  templateUrl: './tags-control-panel.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./tags-control-panel.component.css']
})
export class TagsControlPanelComponent implements OnInit {
  @Input() tags: TagDto[] = [];
  @Output() deleteTag = new EventEmitter<number>();
  @Output() updateTag = new EventEmitter<TagDto>();

  constructor(private tagsService: TagsService) {
  }
  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.tagsService.getAllTags().subscribe((tags) => {
      this.tags = tags;
    });
  }
}
