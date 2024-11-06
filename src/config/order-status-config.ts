import { StatusNarudzbe } from "../types"

type NarudzbaStatusInfo = {
  label: string;
  value: StatusNarudzbe;
  progressValue: number;
}

export const NARUDZBA_STATUS: NarudzbaStatusInfo[] = [
  { label: "Narudžba je postavljena", value: "postavljena", progressValue: 0 },
  { label: "Čeka se potvrda restorana", value: "placena", progressValue: 25 },
  { label: "Narudžba je u izradi", value: "uIzradi", progressValue: 50 },
  { label: "Narudžba je na putu", value: "uTokuDostave", progressValue: 75 },
  { label: "Narudžba je dostavljena", value: "dostavljena", progressValue: 100 }
]

//"postavljena", "placena", "uTijeku", "uTokuDostave", "dostavljena"