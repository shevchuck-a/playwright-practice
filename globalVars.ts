import { AccountInfo } from '@entities/accountInfo';

declare global {
  var registeredUsersForCleanup: Array<AccountInfo>;
}