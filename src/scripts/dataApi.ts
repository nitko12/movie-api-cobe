const APIkey: String = "fb871137332d87f42359150b11d2453e";

export class Getter {
  count: number = 1;
  getPopular() {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&page=${this.count}`
    )
      .then((res: any) => {
        this.count += 1;
        return res.json();
      })
      .catch((err: Object) => {
        console.log(err);
      });
  }
  getId(id: string) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIkey}`)
      .then((res: any) => {
        return res.json();
      })
      .catch((err: Object) => {
        console.log(err);
      });
  }
  getGenres() {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`
    )
      .then((res: any) => {
        return res.json();
      })
      .catch((err: Object) => {
        console.log(err);
      });
  }
  getGenreId(genreId: String) {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=${genreId}&language=en-US`
    )
      .then((res: any) => {
        return res.json();
      })
      .catch((err: Object) => {
        console.log(err);
      });
  }
}
