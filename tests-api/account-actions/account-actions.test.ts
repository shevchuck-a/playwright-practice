import { expect } from '@playwright/test';
import { test } from './account-actions.fixture';
import { randomUUID } from 'crypto';
import { ApiResponseBody } from '@api/types/ApiResponseBody';
import { User } from '@api/types/User';
import { UserAssertions } from '@test-utils/assertions/UserAssertions';

test.describe('API tests for account actions', () => {
  const newUserData = [
    {
      initialUser: {
        title: 'Mr',
        name: `testuser-${randomUUID()}`,
        email: `${randomUUID()}@example.com`,
        password: 'Password123!',
        birth_date: '1',
        birth_month: 'January',
        birth_year: '2000',
        firstname: 'John',
        lastname: 'Doe',
        company: 'ExampleCorp',
        address1: '123 Main St',
        address2: 'Apt 4B',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobile_number: '+12345678901'
      },
      updatedUser: {
        title: 'Mrs',
        name: `testuser-${randomUUID()}`,
        email: '', // Will be set to initial user's email during the test
        password: 'Password123!',
        birth_date: '2',
        birth_month: 'February',
        birth_year: '2001',
        firstname: 'John_upd',
        lastname: 'Doe_upd',
        company: 'ExampleCorp_upd',
        address1: '123 Main St_upd',
        address2: 'Apt 4B_upd',
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
        zipcode: 'M4B1B3',
        mobile_number: '+1234567890'
      }
    }
  ];

  for (const userData of newUserData) {
    test('CRUD user account', async ({ accountAPI }) => {
      await test.step('Create user via API', async () => {
        const response = await accountAPI.create(userData.initialUser);
        expect(response.status()).toBe(200);
        const responseBody = await response.json() as ApiResponseBody<{message: string}>;
        expect(responseBody.responseCode, responseBody).toBe(201);
        expect(responseBody.message, responseBody).toBe('User created!');
        
      });

      await test.step('Get user via API', async () => {
        const response = await accountAPI.get(userData.initialUser.email);
        expect(response.status()).toBe(200);
        const responseBody = await response.json() as ApiResponseBody<{user: User}>;
        expect(responseBody.responseCode).toBe(200);
        UserAssertions.expectUserMatchesAccountInfo(responseBody.user, userData.initialUser);
      });

      await test.step('Update user via API', async () => {
        userData.updatedUser.email = userData.initialUser.email;
        const response = await accountAPI.update(userData.updatedUser);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User updated!');
      });

      await test.step('Get updated user via API', async () => {
        const response = await accountAPI.get(userData.updatedUser.email);
        expect(response.status()).toBe(200);
        const responseBody = await response.json() as ApiResponseBody<{user: User}>;
        expect(responseBody.responseCode).toBe(200);
        UserAssertions.expectUserMatchesAccountInfo(responseBody.user, userData.updatedUser);
      });

      await test.step('Delete user via API', async () => {
        const response = await accountAPI.delete(userData.updatedUser.email, userData.updatedUser.password);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('Account deleted!');
      });

      await test.step('Get deleted user via API', async () => {
        const response = await accountAPI.get(userData.updatedUser.email);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('Account not found with this email, try another email!')
      });
    });
  };
});