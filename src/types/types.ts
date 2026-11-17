"use client"
// export interface Shakes{
//     id:number;
//     title:string;
//     method: string;
//     rating:number;
// }
// export type NewShake = Omit<Shakes, "id">;

export interface NewShake {
  title: string;
  method: string;
  rating: number;
  //image_url?: string;
}

export interface Shakes extends NewShake {
  id: number;
  created_at: string;
}
