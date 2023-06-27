/// <reference types="cypress" />

describe('Testes do carrinho', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
    })

    //1. Testar a funcionalidade de adicionar produtos ao carrinho.
    it('Teste de adição de produtos ao carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')

        cy.get('.shopping_cart_badge').should('have.text', '1')
    })

    //2. Verificar se os produtos são corretamente adicionados e refletidos no resumo do carrinho.
    //3. Testar o limite máximo de produtos que podem ser adicionados ao carrinho e verificar se o sistema está tratando corretamente essa condição.
    it('Teste de resumo do carrinho e quantidade máxima', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()

        cy.get('.shopping_cart_badge').should('have.text', '6')
        cy.get('.shopping_cart_link').click()

        cy.get('#item_4_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Backpack')
        cy.get(':nth-child(3) > .cart_item_label > .item_pricebar > .inventory_item_price').should('have.text', '$29.99')
        cy.get('#item_0_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Bike Light')
        cy.get(':nth-child(4) > .cart_item_label > .item_pricebar > .inventory_item_price').should('have.text', '$9.99')
        cy.get('#item_1_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Bolt T-Shirt')
        cy.get(':nth-child(5) > .cart_item_label > .item_pricebar > .inventory_item_price').should('have.text', '$15.99')
        cy.get('#item_5_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Fleece Jacket')
        cy.get(':nth-child(6) > .cart_item_label > .item_pricebar > .inventory_item_price').should('have.text', '$49.99')
        cy.get('#item_2_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Onesie')
        cy.get(':nth-child(7) > .cart_item_label > .item_pricebar > .inventory_item_price').should('have.text', '$7.99')
        cy.get('#item_3_title_link > .inventory_item_name').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
        cy.get(':nth-child(8) > .cart_item_label > .item_pricebar > .inventory_item_price').should('have.text', '$15.99')
    })
    
})