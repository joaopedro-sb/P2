/// <reference types="cypress" />

describe('Testes de login e navegação', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')

        // 1. Login no sistema
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        
        //2. Verificar se o usuário é redirecionado corretamente para a página inicial após o login.
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })
    
    //3. Verificar se o menu de navegação está funcionando corretamente, permitindo a transição entre diferentes páginas.
    it('Teste do Menu de Navegação', () => {
        cy.get('.bm-burger-button').click()
        cy.wait(500)

        cy.get('#inventory_sidebar_link').should('be.visible')
        cy.get('#about_sidebar_link').should('be.visible')
        cy.get('#logout_sidebar_link').should('be.visible')
        cy.get('#reset_sidebar_link').should('be.visible')
        cy.get('.bm-cross-button').click()
        
        cy.wait(500)
        cy.get('#item_4_title_link > .inventory_item_name').click()
        cy.wait(500)
        cy.get('.bm-burger-button').click()
        cy.wait(500)
        cy.get('#inventory_sidebar_link').click()

        cy.wait(1000)
        cy.get('.bm-burger-button').click()
        cy.get('#about_sidebar_link').click()
        cy.url().should('eq', 'https://saucelabs.com/')
        cy.go('back')

        cy.wait(500)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.wait(500)
        cy.get('.bm-burger-button').click()
        cy.get('#reset_sidebar_link').click()

        cy.wait(1000)
        cy.scrollTo('top')
        cy.contains('.shopping_cart_badge').should('not.exist')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')

        cy.wait(1000)
        cy.get('.bm-burger-button').click()
        cy.get('#logout_sidebar_link').click()
    })
    
    //4. Verificar se os elementos de navegação (links, botões etc.) estão corretamente posicionados e funcionais em todas as páginas.
    it('Teste de Elementos de Navegação', () => {
        cy.get(':nth-child(2) > :nth-child(1) > #inventory_container').should('be.visible')
        cy.get('.inventory_item').first().find('.btn_primary').should('be.visible')
        cy.get('#item_4_img_link > .inventory_item_img').should('be.visible')
        cy.get('#item_4_title_link > .inventory_item_name').should('be.visible')
        cy.get(':nth-child(1) > .inventory_item_description > .inventory_item_label > .inventory_item_desc').should('be.visible')
        cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').should('be.visible')

        cy.wait(1000)
        cy.scrollTo('bottom')
        cy.get('.footer').should('be.visible')

        cy.wait(1000)
        cy.scrollTo('top')
        cy.get('#item_0_title_link > .inventory_item_name').click()
        cy.wait(500)
        cy.get('[data-test="back-to-products"]').click()

        cy.wait(1000)
        cy.get('#item_0_img_link').click()
        cy.wait(500)
        cy.get('[data-test="back-to-products"]').click()
    })
})