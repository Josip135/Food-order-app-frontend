export type User = {
  _id: string;
  email: string;
  ime: string;
  adresa: string;
  grad: string;
  drzava: string;
};

export type Jelo = {
  _id: string;
  ime: string;
  cijena: number;
}

export type Restoran = {
  _id: string;
  user: string;
  imeRestorana: string;
  grad: string;
  drzava: string;
  cijenaDostave: number;
  procijenjenoVrijemeDostave: number;
  vrsteJela: string[];
  jelovnik: Jelo[];
  urlSlike: string;
  zadnjiUpdate: string;
};

export type StatusNarudzbe = "postavljena" | "placena" | "uIzradi" | "uTokuDostave" | "dostavljena";

export type Narudzba = {
  _id: string;
  restoran: Restoran;
  user: User;
  cartItems: {
    jeloId: string;
    ime: string;
    kolicina: string;
  }[];
  detaljiDostave: {
    ime: string;
    adresa: string;
    grad: string;
    email: string;
  };
  ukupanZbroj: number;
  status: StatusNarudzbe;
  createdAt: string;
  restoranId: string;
}

export type RestoranRezultatPretrazivanja = {
  data: Restoran[],

  pagination: {
    total: number,
    stranica: number,
    stranice: number
  }
}