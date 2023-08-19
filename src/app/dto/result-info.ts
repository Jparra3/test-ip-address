
export class ResultInfo {

  public ip: string | undefined;
  public location: string | undefined;
  public timezone: string | undefined;
  public isp: string | undefined;


  constructor(_parameters: any) {
    this.ip = (_parameters?.ip != null ? _parameters.ip : undefined);
    this.location = (_parameters?.location != null ? _parameters.location : undefined);
    this.timezone = (_parameters?.timezone != null ? _parameters.timezone : undefined);
    this.isp = (_parameters?.isp != null ? _parameters.isp : undefined);
  }
}
