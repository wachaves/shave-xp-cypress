
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('quando submeto o formulário', () => {


        it('deve logar com sucesso', () => {
            const user = {
                name: 'William',
                email: 'wac@gmail.com',
                password: 'wac123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', ()=> {
            const user = {
                name: 'William',
                email: 'wac@gmail.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        
        })

        it('não deve logar com email não cadastrado', ()=> {
            const user = {
                name: 'William',
                email: 'wac@404.com',
                password: 'wac123'
            }
            
            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            
            loginPage.noticeShouldBe(message)

        
        })

        it('campos obrigatórios', ()=> {
            loginPage.submit('', '')
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

            // cy.contains('.alert-error', 'E-mail é obrigatório')
            //     .should('be.visible')
            
            // cy.contains('.alert-error', 'Senha é obrigatória')
            //     .should('be.visible')
        

    })

    // Caso queira validar os dois campos mesmo que falhe o primeiro //
    // context('campos obrigatórios', ()=> {
        
    //     beforeEach(()=> {
    //         loginPage.submit()
    //     })

    //     it('deve validar email', ()=> {
    //         cy.get('.alert-error')
    //             .should('have.length', 2)
    //             .and(($small)=> {
    //                 expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
    //             })
    //     })
        
    //     it('deve validar email', ()=> {
    //         cy.get('.alert-error')
    //             .should('have.length', 2)
    //             .and(($small)=> {
    //                 expect($small.get(1).textContent).to.equal('Senha é obrigatória')
    //             })
    //     })

    context('senha muito curta', ()=> {
        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p)=> {
            //it('não deve logar com senha ' + p, ()=> {
            it(`não deve logar com senha: ${p}`, ()=> {
                loginPage.submit('wac@teste.com.br', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', ()=> {
        const emails = [
            'wac&gmail.com',
            'wac.com.br',
            '@gmail.com',
            '@',
            'wac@',
            '123345456',
            '@#$%%¨$¨$#@#',
            'qwer1234'
        ]

        emails.forEach((e)=> {
            //it('não deve logar com o email ' + e, ()=> {
            it(`não deve logar com o email: ${e}`, ()=> {
                loginPage.submit(e, 'wac123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})