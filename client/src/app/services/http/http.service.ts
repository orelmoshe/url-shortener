import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class HttpService {
  
  private readonly serverURL: string = 'http://localhost:3000';

  public constructor(private httpClient: HttpClient) {}

  public getOriginalUrl(short_id:string) {
    return this.httpClient.post(`${this.serverURL}/short_id`,{short_id}).toPromise();
  }
   
  public getShortUrl(url:string) {
    return this.httpClient.post(`${this.serverURL}/new`,{ url }).toPromise();
  }
}
