import { AuthError } from "next-auth";

export class ServerError extends AuthError {
  public title: string = "";
  public status: number;
  public detail: string;
  public instance: string;
  public traceId: string;


  constructor(title: string, status: number, detail: string, instance: string, traceId: string){
    super(detail);

    this.title = title
    this.status = status
    this.detail =detail
    this.instance = instance
    this.traceId = traceId
    
    this.type = "OAuthSignInError"
  }


  public ToJson(): ServerError{
    return JSON.parse(JSON.stringify(this))
  }
}
