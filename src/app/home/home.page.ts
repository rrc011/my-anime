import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Anime } from 'src/core/models/anime.model';
import { AnimeService } from 'src/core/services/anime.service';
import { NewAnimeComponent } from '../new-anime/new-anime.component';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lst: Anime[] = [];

  constructor(
    private data: DataService,
    public modalController: ModalController,
    private _animeService: AnimeService
  ) {
    this.getAllAnime();
  }

  refresh(ev) {
    this._animeService.getAllAnime().then((anime) => {
      this.lst = anime;
      ev.detail.complete();
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: NewAnimeComponent,
    });
    return await modal.present();
  }

  getAllAnime() {
    this._animeService.getAllAnime().then((anime) => {
      this.lst = anime;
    });
  }

  delete(anime: Anime) {
    this._animeService.deleteAnime(anime);
    this.getAllAnime();
  }
}
