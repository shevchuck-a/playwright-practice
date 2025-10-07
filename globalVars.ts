import { AccountInfo } from '@entities/AccountInfo';

declare global {
  var registeredUsersForCleanup: Array<AccountInfo>;
}