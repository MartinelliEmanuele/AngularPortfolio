import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators'
import Swal from "sweetalert2";

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        //Errore lato client
                        console.error(`Error: ${error.error.message}`);

                    }
                    else {
                        //Errore lato server
                        this.displayError(error);
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }

    displayError(error: HttpErrorResponse) {
        let message: string = "";
        switch (error.status) {
            case 400:
                message = error.error.message ? error.error.message : "";
                break;
            case 401:
                message = "Session expired. Please login.";
                break;
            case 404:
                message = "Resource not found."
                break;
            default:
                message = `Unexpected error: ${error.error?.message}`;
        }

        if (message !== "") {
            Swal.fire("Errore", `<div class="text-justify">${message}</div>`, "error").then();
        }
        return;
    }
}
