import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'ngx-localstorage';
import { Anime } from '../models/anime.model';
import { storage } from '../constants/storage.const';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(
    private http: HttpClient,
    private _storageService: LocalStorageService
  ) {}

  search(query: string) {
    const params = new HttpParams()
      .set('q', query)
      .set('page', '1')
      .set('type', 'tv');

    return this.http
      .get('https://api.jikan.moe/v3/search/anime', { params })
      .pipe(map((data: any) => data.results));
  }

  save(anime: Anime[]) {
    this._storageService.set(storage.ANIME, anime);
  }

  getAllAnime(): Promise<Anime[]> {
    return this._storageService
      .asPromisable()
      .get(storage.ANIME)
      .then((r) => {
        return r ? r : [];
      });
  }

  deleteAnime(anime: Anime) {
    this.getAllAnime().then((r) => {
      let lst = r;
      let a = lst.find((e) => e.mal_id == anime.mal_id);
      let index = lst.indexOf(a);
      lst.splice(index, 1);
      this.save(lst);
    });
  }
}
