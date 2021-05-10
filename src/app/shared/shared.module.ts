import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAnimeComponent } from './card-anime/card-anime.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [CardAnimeComponent],
  exports: [CardAnimeComponent],
})
export class SharedModule {}
