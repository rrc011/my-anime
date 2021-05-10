import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(public loadingController: LoadingController) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(
      this.loadingController.create({
        message: 'Please wait...',
      })
    ).pipe(
      tap((loading) => {
        return loading.present();
      }),
      switchMap((loading) => {
        return next.handle(request).pipe(
          finalize(() => {
            loading.dismiss();
          })
        );
      })
    );
  }
}
