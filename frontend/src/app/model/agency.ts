import { Rating } from "./rating";

export class Agency{
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  type: string;
  other:{
    name: string;
    address: string;
    agencyNumber: number;
    description: string;
    profilePicture: string;
    ratings: Array<Rating>;
    vacancies: number;
  };
  validFrom: Date;
  validFor: number;
  status: string;
}