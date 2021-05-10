import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { Anime } from 'src/core/models/anime.model';
import { AnimeService } from 'src/core/services/anime.service';

@Component({
  selector: 'app-new-anime',
  templateUrl: './new-anime.component.html',
  styleUrls: ['./new-anime.component.css'],
})
export class NewAnimeComponent implements OnInit {
  lst: Anime[] = [];
  savedAnime: Anime[] = [];
  anime: Anime = new Anime();

  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  constructor(
    public modalController: ModalController,
    private _animeService: AnimeService
  ) {}

  ngOnInit() {
    this._animeService.getAllAnime().then((anime) => {
      this.savedAnime = anime;
    });
  }

  async searchAnime(event) {
    const query = event.target.value.toLowerCase();
    if (query.length > 3) {
      setTimeout(
        () =>
          this._animeService.search(query).subscribe((anime: Anime[]) => {
            this.lst = anime;
            this.searchbar.setFocus();
          }),
        1000
      );
    }
  }

  save(anime: Anime) {
    let exist: boolean = this.savedAnime.some((e) => e.mal_id === anime.mal_id);
    if (exist) {
      this.dismissModal();
      return;
    }
    this.savedAnime.push(anime);
    this._animeService.save(this.savedAnime);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
