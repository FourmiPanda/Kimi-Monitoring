/**
 * A user model
 */
export class FirebaseUserModel {
  /**
   * Reprsent the profile picture of the user
   */
  image: string;

  /**
   * The name of the user
   */
  name: string;

  /**
   * The provider of the user
   */
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
