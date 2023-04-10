export default interface Movie {
  id          : number;
  title       : string;
  description : string;
  image       : string;
  release_date: string;
  actors      : {
    id        : number;
    first_name: string;
    last_name : string;
  }[];
  reviews     : Array<any>;
}
