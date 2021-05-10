export interface IAnime {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: Date | null;
  end_date: Date | null;
  members: number;
  rated: string | null;
}

export class Anime implements IAnime {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: any;
  episodes: number;
  score: number;
  start_date: Date;
  end_date: Date;
  members: number;
  rated: any;

  constructor(data?: IAnime) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.mal_id = data['mal_id: url;'];
      this.image_url = data['image_url;'];
      this.title = data['title;'];
      this.airing = data['airing;'];
      this.synopsis = data['synopsis;'];
      this.type = data['type;'];
      this.episodes = data['episodes;'];
      this.score = data['score;'];
      this.start_date = data['start_date;'];
      this.end_date = data['end_date;'];
      this.members = data['members;'];
      this.rated = data['rated;'];
    }
  }

  static fromJS(data: any): Anime {
    data = typeof data === 'object' ? data : {};
    let result = new Anime();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};

    data['mal_id'] = this.mal_id;
    data['image_url'] = this.image_url;
    data['title'] = this.title;
    data['airing'] = this.airing;
    data['synopsis'] = this.synopsis;
    data['type'] = this.type;
    data['episodes'] = this.episodes;
    data['score'] = this.score;
    data['start_date'] = this.start_date;
    data['end_date'] = this.end_date;
    data['members'] = this.members;
    data['rated;'] = this.rated;

    return data;
  }

  clone(): Anime {
    const json = this.toJSON();
    let result = new Anime();
    result.init(json);
    return result;
  }
}
