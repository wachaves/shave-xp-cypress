
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {


        it('deve logar com sucesso', () => {

            // dado que tenho um NOVO usuário cadastrado
            const user = data.success
            cy.createUser(user)
            // cy.log(JSON.stringify(user)) Foi utilizado para fazer um teste devido ao erro que estava tendo.

            // quanto submeto o form de login com esse usuário 
            loginPage.submit(user.email, user.password)
            // então devo ser logado com sucesso
            shaversPage.header.userShouldBeLoggedIn(user.name)

            // Outro jeito de chamar a fixture como javascript usando import acima//
            // const user = data

            // Pode fazer desta maneira para chamar a fixture, sem usar o import acima //
            // cy.fixture('users-login').then(function(data) {
            //     loginPage.submit(data.email, data.password)
            //     shaversPage.header.userShouldBeLoggedIn(data.name)
            // })
        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpass
            loginPage.submit(user.email, user.password)
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = data.email404
            loginPage.submit(user.email, user.password)
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)


        })

        it('campos obrigatórios', () => {
            loginPage.submit()
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

    context('senha muito curta', () => {
        data.sortpass.forEach((p) => {
            //it('não deve logar com senha ' + p, ()=> {
            it(`não deve logar com senha: ${p}`, () => {
                loginPage.submit('wac@teste.com.br', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            //it('não deve logar com o email ' + e, ()=> {
            it(`não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, 'wac123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})



// Boa noite. Estou tentando entender o que esta acontecendo mas estou quebrando a cabeça tem mais de uma hora.


// https://prnt.sc/DS0WNJDPLAsb
// https://prnt.sc/aEuO4AByLQPQ


// Sabem o que pode estar acontecendo e resolver isso?


// O erro esta mostrando que esta na linha - node_modules\pg-protocol\dist\parser.js:287:98


// Meu código


// https://prnt.sc/EjS47M12HM1Y
// https://prnt.sc/cCsBneU47Ovj