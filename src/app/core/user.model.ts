export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;

  /**
   * Create a user model
   */
  constructor() {
    this.image = '';
    this.name = '';
    this.provider = '';
  }
}
