import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Anime } from 'src/core/models/anime.model';

@Component({
  selector: 'app-card-anime',
  templateUrl: './card-anime.component.html',
  styleUrls: ['./card-anime.component.css'],
})
export class CardAnimeComponent implements OnInit {
  @Input()
  anime: Anime;
  @Input()
  buttomName: string;
  @Input()
  buttomStyle: string = 'primary';
  @Input()
  showButtom: boolean = true;
  @Output()
  onAdd = new EventEmitter<Anime>();

  constructor() {}

  ngOnInit() {}

  handler() {
    this.onAdd.emit(this.anime);
  }
}
