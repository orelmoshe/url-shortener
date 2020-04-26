import { Component , ViewEncapsulation } from "@angular/core";
import { HttpService } from "../../services/http/http.service";
import { AlertDialogComponent } from "../widgets/alert-dialog/alert-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-shortener-url",
  templateUrl: "./shortener-url.component.html",
  styleUrls: ["./shortener-url.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class shortenerUrlComponent {
  public original_url: string = "";
  public shortener_url: string = "";
  public original_url_res: string = "";
  public shortener_url_res: string = "";
  public serverURL: string = 'http://localhost:3000';
  
  public constructor(
    private httpService: HttpService,
    private dialog: MatDialog
  ) {}

  public async getShortenerUrl(): Promise<any> {
    try {
      if (this.original_url === "") {
        this.shortener_url_res = null;
        this.openAlertDialog("field empty, try again.");
        return;
      }
      const shortUrl = await this.httpService.getShortUrl(this.original_url);
      this.shortener_url_res = `${shortUrl}`;
    } catch (ex) {
      this.openAlertDialog(ex.error.massage);
    }
  }

  public async getOriginalUrl(): Promise<any> {
    try {
      if (this.shortener_url === "") {
        this.original_url_res = null;
        this.openAlertDialog("field empty, try again.");
        return;
      }
      const originalUrl = await this.httpService.getOriginalUrl(this.shortener_url);
      this.original_url_res = `${originalUrl}`;
    } catch (ex) {
      this.openAlertDialog(ex.error.massage);
    }
  }

  private openAlertDialog(error): void {
    this.dialog.open(AlertDialogComponent, {
      data: { message: error, buttonText: { cancel: "Done" } }
    });
  }
}
