import { expect } from '@playwright/test';
import { test } from './account-actions.fixture';
import { randomUUID } from 'crypto';

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
        const responseBody = await response.json();
        expect(responseBody.responseCode, responseBody).toBe(201);
        expect(responseBody.message, responseBody).toBe('User created!');
        
      });

      await test.step('Get user via API', async () => {
        const response = await accountAPI.get(userData.initialUser.email);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode, responseBody).toBe(200);
        expect(responseBody.user.name).toBe(userData.initialUser.name);
        expect(responseBody.user.email).toBe(userData.initialUser.email);
        expect(responseBody.user.title).toBe(userData.initialUser.title);
        expect(responseBody.user.birth_day).toBe(userData.initialUser.birth_date);
        expect(responseBody.user.birth_month).toBe(userData.initialUser.birth_month);
        expect(responseBody.user.birth_year).toBe(userData.initialUser.birth_year);
        expect(responseBody.user.first_name).toBe(userData.initialUser.firstname);
        expect(responseBody.user.last_name).toBe(userData.initialUser.lastname);
        expect(responseBody.user.company).toBe(userData.initialUser.company);
        expect(responseBody.user.address1).toBe(userData.initialUser.address1);
        expect(responseBody.user.address2).toBe(userData.initialUser.address2);
        expect(responseBody.user.country).toBe(userData.initialUser.country);
        expect(responseBody.user.state).toBe(userData.initialUser.state);
        expect(responseBody.user.city).toBe(userData.initialUser.city);
        expect(responseBody.user.zipcode).toBe(userData.initialUser.zipcode);
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
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.user.name).toBe(userData.updatedUser.name);
        expect(responseBody.user.email).toBe(userData.updatedUser.email);
        expect(responseBody.user.title).toBe(userData.updatedUser.title);
        expect(responseBody.user.birth_day).toBe(userData.updatedUser.birth_date);
        expect(responseBody.user.birth_month).toBe(userData.updatedUser.birth_month);
        expect(responseBody.user.birth_year).toBe(userData.updatedUser.birth_year);
        expect(responseBody.user.first_name).toBe(userData.updatedUser.firstname);
        expect(responseBody.user.last_name).toBe(userData.updatedUser.lastname);
        expect(responseBody.user.company).toBe(userData.updatedUser.company);
        expect(responseBody.user.address1).toBe(userData.updatedUser.address1);
        expect(responseBody.user.address2).toBe(userData.updatedUser.address2);
        expect(responseBody.user.country).toBe(userData.updatedUser.country);
        expect(responseBody.user.state).toBe(userData.updatedUser.state);
        expect(responseBody.user.city).toBe(userData.updatedUser.city);
        expect(responseBody.user.zipcode).toBe(userData.updatedUser.zipcode);
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