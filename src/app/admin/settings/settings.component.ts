import {Component} from '@angular/core';
import {AccessRoleService} from "../../_services/auth/access-role.service";
import {CustomCommonModule} from "../../_imports/CustomCommon.module";
import {UsersComponent} from "./users/users.component";
import {ManageDictionaryComponent} from "./manage-dictionary/manage-dictionary.component";
import {AccessRole} from "../../_models/user/access-role";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [CustomCommonModule, UsersComponent, ManageDictionaryComponent],
})
export class SettingsComponent {
  protected isAuthorized: boolean = false;

  constructor(
    private accessService: AccessRoleService
  ) {
    this.accessService.isAuthorized(AccessRole.ADMIN_PAGE_ACCESS)
      .then((isAuthorized: boolean): void => {
        if (isAuthorized) {
          this.isAuthorized = true;
        }
      });
  }

}
