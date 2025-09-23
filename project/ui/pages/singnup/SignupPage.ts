import { Page } from "@playwright/test";
import { AccountInfo } from "@entities/accountInfo";
import { SignupLocators } from "./SignupLocators";
import { FormsHelper } from "@helpers-ui/FormsHelper";
import { FieldConfig } from "@interfaces-ui/FieldConfig";

export class SignupPage extends SignupLocators {
  constructor(page: Page) {
    super(page, '/signup');
  }

  public async fillAccountInfoAndSubmit(accountInfo: AccountInfo, markForDeletion = true) {
    const fieldConfigs = this.getFieldConfigs(accountInfo);
    await FormsHelper.fillTheForm(fieldConfigs);
    await this.createAccountButton.click();

    if (markForDeletion) {
      global.registeredUsersForCleanup.push(accountInfo);
    }
  }
  
  private getFieldConfigs(accountInfo: AccountInfo) {
    const fieldConfigs: Record<keyof AccountInfo, FieldConfig> = {
      title: { 
        locator: this.titleRadio(accountInfo.title?.toString() || ''), 
        action: 'check',
        value: accountInfo.title?.toString()
      },
      name: {
        locator: this.nameInput,
        action: 'fill',
        value: accountInfo.name
      },
      email: { 
        locator: this.emailInput, 
        action: 'fill',
        value: accountInfo.email
      },
      password: { 
        locator: this.passwordInput, 
        action: 'fill',
        value: accountInfo.password
      },
      birth_date: { 
        locator: this.daysSelect,
        action: 'selectOption',
        value: accountInfo.birth_date?.toString()
      },
      birth_month: { 
        locator: this.monthsSelect, 
        action: 'selectOption',
        value: accountInfo.birth_month?.toString()
      },
      birth_year: { 
        locator: this.yearsSelect, 
        action: 'selectOption',
        value: accountInfo.birth_year?.toString()
      },
      newsletter: { 
        locator: this.newsletterCheckbox, 
        action: 'check',
        value: accountInfo.newsletter ? 'true' : undefined,
      },
      specialOffers: { 
        locator: this.specialOffersCheckbox, 
        action: 'check',
        value: accountInfo.specialOffers ? 'true' : undefined,
      },
      firstname: { 
        locator: this.firstNameInput, 
        action: 'fill',
        value: accountInfo.firstname
      },
      lastname: { 
        locator: this.lastNameInput, 
        action: 'fill',
        value: accountInfo.lastname
      },
      company: { 
        locator: this.companyInput, 
        action: 'fill',
        value: accountInfo.company
      },
      address1: { 
        locator: this.addressInput, 
        action: 'fill',
        value: accountInfo.address1
      },
      address2: { 
        locator: this.address2Input, 
        action: 'fill',
        value: accountInfo.address2
      },
      country: { 
        locator: this.countrySelect, 
        action: 'selectOption',
        value: accountInfo.country
      },
      state: { 
        locator: this.stateInput, 
        action: 'fill',
        value: accountInfo.state
      },
      city: { 
        locator: this.cityInput, 
        action: 'fill',
        value: accountInfo.city
      },
      zipcode: { 
        locator: this.zipcodeInput, 
        action: 'fill',
        value: accountInfo.zipcode
      },
      mobile_number: { 
        locator: this.mobileNumberInput, 
        action: 'fill',
        value: accountInfo.mobile_number
      }
    };
    return fieldConfigs;
  }
}

