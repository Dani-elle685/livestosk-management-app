import { UserCountry } from "../dto/user.countries";

export const fetchUserCountries = async (userId: string): Promise<UserCountry[]> => {
  return [
  { name: "Kenya", flag: "https://tse4.mm.bing.net/th/id/OIP.mgB6QvOYk8xEeM74viJWEwHaEo?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3", percentage: 85 },
  { name: "Rwanda", flag: "https://th.bing.com/th/id/R.1bfae8fecd1cb612e3a10c846fe4e3cf?rik=m2p7048n3z3%2bpg&pid=ImgRaw&r=0", percentage: 67 },
  { name: "Europe", flag: "https://th.bing.com/th/id/R.4ec9ea98d80d69acb1ec6f11e1e0c9b8?rik=vpHSTaFkV7QAZg&pid=ImgRaw&r=0", percentage: 35 },
  { name: "USA", flag: "https://th.bing.com/th/id/R.9c297356612d39cd3580a9bc0acbe2a9?rik=SYeUvXRaFXMgcA&riu=http%3a%2f%2fclipart-library.com%2fimages%2fBTarByygc.jpg&ehk=lVZNMUDkizcaNnyOO2QBYUlvCTfY0Dz8lTawgPk8%2b3k%3d&risl=&pid=ImgRaw&r=0🇺🇸", percentage: 25 }
];
}