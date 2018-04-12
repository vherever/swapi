export class Person {
  constructor(
    public name: string,
    public films: any,
    public starships: any,
    public birth_year: string,
  ) {
    this.name = name;
    this.films = films;
    this.starships = starships;
    this.birth_year = birth_year;
  }
}
