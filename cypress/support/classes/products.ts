import Elements from '../elements'
import Interfaces from '@interfaces'

export default class Products {
    /**
     * Clicking on a button that produce an action
     * @param {string} prop item to add to cart
     */
    clickButton(prop: string): void {
        cy.getDataTest(prop).click();
    }

    /**
     * Open cart
     */
    openCart(): void {
        cy
            .get(Elements.shoppingCart)
            .click();
    }

    /**
     * Verify correct number of items in a cart
     * @param {string} items 
     */
    assertCartItemNumber(items: string): void {
        cy
            .get(Elements.shoppingCart)
            .invoke('text')
            .should('contain', items);
    }

    /**
     * Open item's detail page
     * @param {Interfaces.Items} item shopping item
     */
    openDetailPage(item: Interfaces.Items): void {
        cy.contains(item).click();
    }

    /**
     * Filling checkout form
     * @param {string} name name
     * @param {string} lastName last name
     */
    fillCheckoutForm(name: string, lastName: string): void {
        cy.getDataTest('firstName').type(name);
        cy.getDataTest('lastName').type(lastName);

        const random = () => Cypress._.random(0, 1e5);
        const postal = random();
        cy.getDataTest('postalCode').type(`${postal}`);
    }

    /**
     * Assert comlete checkout message
     * @param {string} message message
     */
    assertCompleteCheckoutMessage(message: string): void {
        cy.get(Elements.successMessage).should('have.text', message);
    }

    /**
     * Select most expensive item with maximum price and click on it.
     */
    selectMostExpensiveItem(): void {
        cy.get(Elements.itemPrice).then(($price) => {

            const arrayOfPrices = Cypress._.map($price, 'outerText').map(str => str.slice(1)).map(str => Number(str));

            const maxPrice: number = Cypress._.max(arrayOfPrices);
            Cypress.env('maxPrice', maxPrice);

            cy
                .contains(maxPrice)
                .next()
                .within(() => {
                    cy.contains('Add to cart').click();
                })
        })
    }

    /**
     * Select less expensive item with minimum price and click on it.
     */
    selectLessExpensiveItem() {
        let priceArray: number[] = [];

        cy.get(Elements.itemPrice).each(price => {
            const prices = Number(price.text().substring(1));
            priceArray.push(prices);

            priceArray.sort(function (a, b) { return a - b });
            console.log(priceArray);

        }).then(() => {
            cy.contains(`${priceArray[0]}`).next().click();
            Cypress.env('minPrice', priceArray[0]);
        })
    }

    /**
     * Assert checkout items
     */
    assertCheckoutItems(): void {
        cy
            .url()
            .should('contain', 'checkout-step-two.html')
            .then(() => {
                cy.get(Elements.itemPrice)
                    .should('contain', Cypress.env('maxPrice'))
                    .and('contain', Cypress.env('minPrice'));
            })
    }
}