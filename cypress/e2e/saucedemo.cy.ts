import Auth from '../support/classes/auth';
import Products from 'support/classes/products';

const auth = new Auth();
const products = new Products();

describe('Saucedemo e2e scenarios', () => {
  beforeEach(() => {
    cy.fixture('users').as('users')
    auth.login('standard_user');
  })

  it('Order flow is completed successfully', function () {
    products.clickButton('add-to-cart-sauce-labs-backpack');
    products.assertCartItemNumber('1');

    products.openDetailPage('Fleece Jacket');
    products.clickButton('add-to-cart-sauce-labs-fleece-jacket');

    products.openCart();
    products.assertCartItemNumber('2');

    products.clickButton('remove-sauce-labs-backpack');
    products.assertCartItemNumber('1');

    products.clickButton('checkout');
    products.fillCheckoutForm(this.users.standard, this.users.lastName);
    products.clickButton('continue');

    products.clickButton('finish');
    products.assertCompleteCheckoutMessage('Thank you for your order!');
  });

  it('I can select most expensive and less expensive item, then see them on checkout page', function () {
    products.selectMostExpensiveItem();
    products.selectLessExpensiveItem();

    products.openCart();
    products.clickButton('checkout');
    products.fillCheckoutForm(this.users.standard, this.users.lastName);
    products.clickButton('continue');

    products.assertCheckoutItems();
  });
})