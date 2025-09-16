import {Injectable, OnDestroy} from '@angular/core';
import {AuthService} from "./auth.service";
import {AccessRole} from "../../_models/user/access-role";
import {catchError, Observable, of, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccessRoleService implements OnDestroy {

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public isAuthorized(requestedRole: AccessRole): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.loggedUser().subscribe({
        next: (customUser) => {
          if (customUser !== null) {
            resolve(customUser.roles.includes(requestedRole));
          } else {
            reject("User is null");
          }
        },
        error: (err) => reject(err)
      });
    });
  }

  public isAuthorized$(requestedRole: AccessRole): Observable<boolean> {
    return this.authService.loggedUser().pipe(
      map(customUser => !!customUser && customUser.roles.includes(requestedRole)),
      catchError(() => of(false))
    );
  }

}
