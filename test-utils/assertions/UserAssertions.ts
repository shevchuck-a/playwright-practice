import { expect } from '@playwright/test';
import { User } from '@api/types/User';
import { AccountInfo } from '@entities/AccountInfo';

export class UserAssertions {
  static expectUserMatchesAccountInfo(user: User, accountInfo: AccountInfo, context = ''): void {
    const prefix = context ? `${context}: ` : '';
    
    expect(user.name, `${prefix}name mismatch`).toBe(accountInfo.name);
    expect(user.email, `${prefix}email mismatch`).toBe(accountInfo.email);
    expect(user.title, `${prefix}title mismatch`).toBe(accountInfo.title);
    expect(user.birth_day, `${prefix}birth_day mismatch`).toBe(accountInfo.birth_date);
    expect(user.birth_month, `${prefix}birth_month mismatch`).toBe(accountInfo.birth_month);
    expect(user.birth_year, `${prefix}birth_year mismatch`).toBe(accountInfo.birth_year);
    expect(user.first_name, `${prefix}first_name mismatch`).toBe(accountInfo.firstname);
    expect(user.last_name, `${prefix}last_name mismatch`).toBe(accountInfo.lastname);
    expect(user.company, `${prefix}company mismatch`).toBe(accountInfo.company);
    expect(user.address1, `${prefix}address1 mismatch`).toBe(accountInfo.address1);
    expect(user.address2, `${prefix}address2 mismatch`).toBe(accountInfo.address2);
    expect(user.country, `${prefix}country mismatch`).toBe(accountInfo.country);
    expect(user.state, `${prefix}state mismatch`).toBe(accountInfo.state);
    expect(user.city, `${prefix}city mismatch`).toBe(accountInfo.city);
    expect(user.zipcode, `${prefix}zipcode mismatch`).toBe(accountInfo.zipcode);
  }
}