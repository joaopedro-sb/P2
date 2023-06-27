/// <reference types="cypress" />

describe('Testes do catálogo de produtos', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
    })

    //1. O aluno deve verificar se todos os produtos exibidos no catálogo estão corretamente listados.
    it('Teste de listagem de produtos', () => {
        cy.get('.inventory_list').should('be.visible')
        cy.get('.inventory_item').should('have.length', 6)
        cy.wait(1000)
    })

    //2. Verificar se as informações dos produtos (nome, preço, imagem etc.) estão corretas e correspondem aos produtos exibidos na interface.
    it('Teste de informações dos produtos', () => {
        cy.wait(500)
        cy.get('.inventory_item').first().find('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
        cy.get('.inventory_item').first().find('.inventory_item_desc').should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
        cy.get('.inventory_item').first().find('.inventory_item_price').should('have.text', '$29.99')
        cy.get('.inventory_item').first().find('.inventory_item_img').should('be.visible')
        
        cy.wait(500)
        cy.get('.inventory_item').eq(1).find('.inventory_item_name').should('have.text', 'Sauce Labs Bike Light')
        cy.get('.inventory_item').eq(1).find('.inventory_item_desc').should('have.text', 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.')
        cy.get('.inventory_item').eq(1).find('.inventory_item_price').should('have.text', '$9.99')
        cy.get('.inventory_item').eq(1).find('.inventory_item_img').should('be.visible')
        
        cy.wait(500)
        cy.scrollTo('center')
        cy.get('.inventory_item').eq(2).find('.inventory_item_name').should('have.text', 'Sauce Labs Bolt T-Shirt')
        cy.get('.inventory_item').eq(2).find('.inventory_item_desc').should('have.text', 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.')
        cy.get('.inventory_item').eq(2).find('.inventory_item_price').should('have.text', '$15.99')
        cy.get('.inventory_item').eq(2).find('.inventory_item_img').should('be.visible')

        cy.wait(500)
        cy.get('.inventory_item').eq(3).find('.inventory_item_name').should('have.text', 'Sauce Labs Fleece Jacket')
        cy.get('.inventory_item').eq(3).find('.inventory_item_desc').should('have.text', 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.')
        cy.get('.inventory_item').eq(3).find('.inventory_item_price').should('have.text', '$49.99')
        cy.get('.inventory_item').eq(3).find('.inventory_item_img').should('be.visible')
        
        cy.wait(500)
        cy.scrollTo('bottom')
        cy.get('.inventory_item').eq(4).find('.inventory_item_name').should('have.text', 'Sauce Labs Onesie')
        cy.get('.inventory_item').eq(4).find('.inventory_item_desc').should('have.text', 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.')
        cy.get('.inventory_item').eq(4).find('.inventory_item_price').should('have.text', '$7.99')
        cy.get('.inventory_item').eq(4).find('.inventory_item_img').should('be.visible')
        
        cy.wait(500)
        cy.get('.inventory_item').eq(5).find('.inventory_item_name').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
        cy.get('.inventory_item').eq(5).find('.inventory_item_desc').should('have.text', 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.')
        cy.get('.inventory_item').eq(5).find('.inventory_item_price').should('have.text', '$15.99')
        cy.get('.inventory_item').eq(5).find('.inventory_item_img').should('be.visible')
    })

    //3. Testar a funcionalidade de busca de produtos, verificando se os resultados são consistentes e corretos.
    it('Teste de filtro de produtos', () => {
        cy.get('.inventory_list').should('be.visible')
        cy.get('.inventory_item').should('have.length', 6)
        cy.wait(1000)

        cy.get('[data-test="product_sort_container"]').select('za')
        cy.get('.inventory_list').should('be.visible')
        cy.get('.inventory_item').should('have.length', 6)
        cy.get('.inventory_item').first().find('.inventory_item_name').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
        cy.get('.inventory_item').eq(5).find('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
        cy.wait(1000)

        cy.get('[data-test="product_sort_container"]').select('lohi')
        cy.get('.inventory_list').should('be.visible')
        cy.get('.inventory_item').should('have.length', 6)
        cy.get('.inventory_item').first().find('.inventory_item_price').should('have.text', '$7.99')
        cy.get('.inventory_item').eq(5).find('.inventory_item_price').should('have.text', '$49.99')
        cy.wait(1000)

        cy.get('[data-test="product_sort_container"]').select('hilo')
        cy.get('.inventory_list').should('be.visible')
        cy.get('.inventory_item').should('have.length', 6)
        cy.get('.inventory_item').first().find('.inventory_item_price').should('have.text', '$49.99')
        cy.get('.inventory_item').eq(5).find('.inventory_item_price').should('have.text', '$7.99')
        cy.wait(1000)
    })
})