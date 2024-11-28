export default class Settings {
  public api: string = '';
  public apiVersion: string = '';

  public apiURL(): string {
    return this.api + this.apiVersion;
  }
}
