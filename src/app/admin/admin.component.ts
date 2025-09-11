import {Component} from '@angular/core';
import {AccessRoleService} from "../_services/auth/access-role.service";
import {AccessPageEnum} from "../_services/auth/access-page-enum";
import {AuthService} from "../_services/auth/auth.service";
import {environment} from "../../environments/environment";
import {CustomCommonModule} from "../_imports/CustomCommon.module";
import {SettingsComponent} from "./settings/settings.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [CustomCommonModule, SettingsComponent],
})
export class AdminComponent {
  protected readonly environment = environment;
  protected loggedUserName: string = '';
  protected settingsVisible: boolean = false;

  constructor(
    private accessService: AccessRoleService,
    private authService: AuthService
  ) {
    this.authService.loggedUser().subscribe({
      next: user => {
        if (user !== null) {
          this.loggedUserName = user.firstName;
        } else {
          this.loggedUserName = '';
        }
      },
      error: (err) => {
        this.loggedUserName = '';
        console.error(err);
      }
    });

    this.accessService.isAuthorizedToSeePage(AccessPageEnum.SETTINGS)
      .then((isAuthorized: boolean): void => {
        if (isAuthorized) {
          this.settingsVisible = true;
        }
      });
  }
}
