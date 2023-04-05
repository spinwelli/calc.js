const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
        // adiciona um digito a tela da calculadora
    addDigit(digit) {
            // checar se a operação atual já tem um ponto, através de um return podeo 
            if (digit === "." && this.currentOperationText.innerText.includes (".")) {
                return;
            }

            this.currentOperation = digit;
            this.updateScreen()
    }

        // processar as operações da calculadora (+ - / *)
    processOperation(operation) {

        // checar se o valor atual está vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // mudar operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
        // acessar valores atuais e valores anteriores
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;
        
            switch(operation) {
                case "+":
                    operationValue = previous + current;
                this.updateScreen(operationValue,operation,current,previous);
                    break;

                    case "-":
                    operationValue = previous - current;
                this.updateScreen(operationValue,operation,current,previous);
                    break;

                    case "/":
                    operationValue = previous / current;
                this.updateScreen(operationValue,operation,current,previous);
                    break;

                    case "*":
                    operationValue = previous * current;
                this.updateScreen(operationValue,operation,current,previous);
                    break;

                    case "DEL":
                    this.processDelOperator();
                        break;

                        case "CE":
                    this.processClearCurrentOperator();
                        break;

                        case "C":
                    this.processClearAllOperator();
                        break;

                        case "=":
                    this.processEqualOperator();
                        break;
                default:
                    return;
            }
    }

        // insere os valores digitados na tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
         current = null,
         previous = null
         ){

            console.log (operationValue,operation,current,previous);

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checando se o valor for 0, se for adicionar o valor atual
            if (previous === 0) {
                operationValue = current;
            }

            // adicionar o valor atual para o anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    changeOperation(operation) {
        const mathOperations = ["+","/","*","-"]

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // deleta o último digito
    processDelOperator () {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // deleta a operação atual
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    // limpa todas as operações
    processClearAllOperator () {
        this.previousOperationText.innerText = "";
        this.currentOperationText.innerText = "";
    }

    // executa o resultado das operações
    processEqualOperator() {
        const operation = previousOperationText.innerText.split (" ")[1]
        
        this.processOperation(operation);
    }
}

        // faz uma cópia da classe Calculator, só que dentro de uma const
const calc = new Calculator (previousOperationText,currentOperationText);

    // para cada botão execute o evento com parâmetro de classe btn, a cada clique (evento) no btn execute a constante valor = evento com alvo para innerText, e assim obtemos os resultados. 
buttons.forEach((btn) => {
    btn.addEventListener("click",(e) => {

        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});

