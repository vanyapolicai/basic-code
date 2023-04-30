function generateCode() {
  const walletsInput = document.getElementById("wallets-input");
  const namesInput = document.getElementById("names-input");
  const codeOutput = document.getElementById("code-output");

  const wallets = walletsInput.value.split("\n");
  const names = namesInput.value.split("\n");

  if (names.length === 1 && names[0] === "") {
    names.length = 0;
  }

  const code = `
const wallets = ${JSON.stringify(wallets)};

const names = ${JSON.stringify(names)};

const walletSelectors = [];
const nameSelectors = [];

for (let i = 3; i <= 98; i += 5) {
 walletSelectors.push(
   \`#scroll-box > div > form > div:nth-child(2) > div > div > div > div > div:nth-child(\${i}) > div.okui-form-item-control > div > div > div > div > input\`
 );
}

for (let i = 5; i <= 100; i += 5) {
 nameSelectors.push(
   \`#scroll-box > div > form > div:nth-child(2) > div > div > div > div > div:nth-child(\${i}) > div.okui-form-item-control > div > div > div > div > input\`
 );
}

const addButtonSelector =
  "#scroll-box > div > form > div:nth-child(2) > div > div > div > div > div.add-address-form-btn";

function fillInput(input, value) {
  input.setAttribute('value', value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

async function addWallets() {
  for (let i = 0; i < wallets.length; i++) {
    console.log(\`Добавление кошелька \${i + 1} из \${wallets.length}\`);

    const addressInput = document.querySelector(walletSelectors[i]);
    const nameInput = document.querySelector(nameSelectors[i]);

    fillInput(addressInput, wallets[i]);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (names.length > 0) {
      fillInput(nameInput, names[i]);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    if (i < wallets.length - 1) {
      const button = document.querySelector(addButtonSelector);
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  const checkbox1Selector = "#scroll-box > div > form > div:nth-child(4) > div > div > div > label";
  const checkbox2Selector = "#scroll-box > div > form > div:nth-child(5) > div > div > div > label";

  const checkbox1 = document.querySelector(checkbox1Selector);
  const checkbox2 = document.querySelector(checkbox2Selector);

  checkbox1.classList.add("okui-checkbox-wrapper-checked");
  checkbox2.classList.add("okui-checkbox-wrapper-checked");

  console.log('Завершено');
}

addWallets();`;

  return code.trim();
}

let isFirstUpdate = true;

function updateCode() {
  const code = generateCode();

  if (isFirstUpdate) {
    isFirstUpdate = false;
    const typingDelay = 2;
    let index = 0;

    codeOutput.textContent = "";

	function typeCode() {
	  if (index < code.length) {
		codeOutput.textContent += code[index];
		index++;

		// Обновить innerHTML с подсвеченным кодом
		codeOutput.innerHTML = Prism.highlight(codeOutput.textContent, Prism.languages.javascript, 'javascript');

		setTimeout(typeCode, typingDelay);
	  }
	}

    typeCode();
  } else {
    // Обновить innerHTML с подсвеченным кодом
    codeOutput.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
}


const walletsInput = document.getElementById("wallets-input");
const namesInput = document.getElementById("names-input");
const codeOutput = document.getElementById("code-output");

walletsInput.addEventListener("input", updateCode);
namesInput.addEventListener("input", updateCode);

Prism.highlightAll();
