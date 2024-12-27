const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// Nessa etapa do código estamos selecionando as teclas que possuem a classe charKey e para cada uma delas adicionando um evento de clique que adiciona esse valor ao input.
document.querySelectorAll('.charKey') .forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener('click', function () {
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

// Aqui estamos criando um evento de clique no botão clear que limpa o input.
document.getElementById('clear').addEventListener('click', function () {
    input.value = ''
    input.focus() //Coloca o cursor no input.
})

document.getElementById('equal').addEventListener('click', calculate)

// Nessa etapa do código estamos através do evento keydown e da função selecionando apenas as teclas que são permitidas ao usuário digitar.
input.addEventListener('keydown', function (ev) {
    ev.preventDefault() //Previne o evento padrão do navegador.
    if(allowedKeys.includes(ev.key)) { //Verifica se a tecla pressionada é permitida.
        input.value += ev.key //Adiciona o valor da tecla pressionada ao input.
        return
    }
    if(ev.key === 'Backspace') { //Verifica se a tecla pressionada é o backspace e se for remove o ultimo caractere do input.
        input.value = input.value.slice(0, -1) 
    }
    if(ev.key === 'Enter') { // Verifica se a tecla pressionada é o enter e realiza o calculo.
        calculate()
    }
})

// Função que realiza o calculo.
function calculate () {
    //A função sempre inicia com a mensagem de erro, caso o usuário faça algo que não deveria e encerra na linha 44. 
    // Mas caso esteja tudo certo com o calculo ele segue normalmente a execução e calcula o valor.
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')
    const result = eval(input.value)
    resultInput.value = result
    resultInput.classList.remove('error') 
}

// Função que copia o resultado para a area de transferência e possui um evento de clique que altera o texto do botão e permite voltar ao seu estado original após copiar o conteúdo.
document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
    const button = ev.currentTarget
    if (button.innerText === 'Copy') {
      button.innerText = 'Copied!🎉'
      button.classList.add('success')
      navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

// Função que altera o tema para 'modo escuro' ou 'modo claro'.
document.getElementById('themeSwitcher').addEventListener('click', function () {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--primary-color', '#e94107')
        root.style.setProperty('--specialkey-color', '#2c2c2c')
        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--primary-color', '#fdc708')
        root.style.setProperty('--specialkey-color', '#CCCCCC')
        main.dataset.theme = 'dark'
    }
})



