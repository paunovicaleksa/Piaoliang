/* will be updated as the necessary scheme changes */
export class Client{
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  type: string;
  other:{
    name: string;
    lastName: string;
    profilePicture: string;
  };
  validFrom: Date;
  validFor: number;
  status: string
}