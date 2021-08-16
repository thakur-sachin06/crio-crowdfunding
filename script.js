const closeIcon = document.getElementById('close-icon');
const backProject = document.getElementById('back-project');
const continueBtns = Array.from(
  document.querySelectorAll('#continue-btn')
);
const thanksBtn = document.getElementById('thanks-btn');
const selectRewardBtns = Array.from(
  document.querySelectorAll('#select-reward')
);
const checkmarks = Array.from(
  document.querySelectorAll('.card-input-element')
);

const pledgeModal = document.getElementById('pledge-modal');
const thanksModal = document.getElementById('thanks-modal');

const pledgesLeft = Array.from(
  document.querySelectorAll('#pledges-left')
);

const modalPledgesLeft = Array.from(
  document.querySelectorAll('#modal-pledges-left')
);

const mainContainer = document.getElementById(
  'main-container'
);
const header = document.getElementById('header');
const container = document.getElementById('container');

const pledgeAmount = document.getElementById(
  'total-pledge-amount'
);
const maxPledgeAmt = document.getElementById(
  'max-pledge-amount'
);
const totalBackers =
  document.getElementById('total-backers');
const pledgeAmountInput = Array.from(
  document.querySelectorAll('.modal-amount-input')
);

const progressBar = document.querySelector(
  '.progress-bar-inner'
);

function fadeContainers() {
  mainContainer.style.background = 'rgba(0,0,0,0.5)';
  header.style.filter = 'brightness(0.4)';
  container.style.filter = 'brightness(0.4)';
}

function resetContainersFade() {
  mainContainer.style.background = '';
  header.style.filter = '';
  container.style.filter = '';
}

function closeModal() {
  if (pledgeModal) {
    pledgeModal.style.display = 'none';
    resetContainersFade();
  }
}

function openModal() {
  fadeContainers();
  pledgeModal.style.display = 'block';
}

function updatePledgeContainer(index) {
  const prevAmt = Number(
    pledgeAmount.innerHTML.split('$')[1].replace(',', '')
  );
  const val = Number(pledgeAmountInput[index].value);
  const defaultInputVal =
    pledgeAmountInput[index].defaultValue;
  if (val < defaultInputVal) {
    alert(`Min pledge value is $ ${defaultInputVal}`);
    return false;
  }
  pledgeAmountInput[index].value = defaultInputVal;
  const newPledgeAmt = val + prevAmt;
  const maxPledgeAmount = Number(
    maxPledgeAmt.innerHTML.split('$')[1].replace(',', '')
  );
  if (newPledgeAmt > maxPledgeAmount) {
    pledgeAmount.innerHTML = `$${maxPledgeAmount}`;
  } else {
    pledgeAmount.innerHTML = `$${newPledgeAmt}`;
  }
  const pledgePercentage = Math.floor(
    (newPledgeAmt / maxPledgeAmount) * 100
  );
  progressBar.style.width =
    pledgePercentage > 100
      ? '100%'
      : `${pledgePercentage}%`;
  return true;
}

function showThanksModal(index) {
  if (index === 0) {
    pledgeModal.style.display = 'none';
    thanksModal.style.display = 'block';
    return;
  }
  const value = pledgesLeft[index].innerHTML;
  pledgesLeft[index].innerHTML = value - 1;
  const val = modalPledgesLeft[index].innerHTML;
  modalPledgesLeft[index].innerHTML = val - 1;
  const isValuesUpdated = updatePledgeContainer(index);
  fadeContainers();
  if (isValuesUpdated) {
    pledgeModal.style.display = 'none';
    thanksModal.style.display = 'block';
  } else {
    return;
  }
}

function hideThanksModal() {
  thanksModal.style.display = 'none';
  resetContainersFade();
}

closeIcon.addEventListener('click', closeModal);
backProject.addEventListener('click', openModal);

continueBtns.map((elt, index) => {
  elt.addEventListener('click', () =>
    showThanksModal(index)
  );
});

thanksBtn.addEventListener('click', hideThanksModal);

selectRewardBtns.map((btn, index) => {
  btn.addEventListener('click', () => {
    togglePledgeSection(index + 1);
    fadeContainers();
    pledgeModal.style.display = 'block';
    checkmarks[index + 1].checked = true;
  });
});

function setProgressBar() {
  const currentPledgeAmt = Number(
    pledgeAmount.innerHTML.split('$')[1].replace(',', '')
  );
  const maxPledgeAmount = Number(
    maxPledgeAmt.innerHTML.split('$')[1].replace(',', '')
  );
  const pledgePercentage = Math.floor(
    (currentPledgeAmt / maxPledgeAmount) * 100
  );
  progressBar.style.width = `${pledgePercentage}%`;
}

setProgressBar();

const radios = Array.from(
  document.querySelectorAll('.card-input-element')
);

const pledgeSection = Array.from(
  document.querySelectorAll('.enter-pledge-container')
);

function togglePledgeSection(index) {
  pledgeSection.map((elt, pledgeIndex) => {
    if (index === pledgeIndex) {
      elt.style.display = 'block';
    } else {
      elt.style.display = 'none';
    }
  });
}

radios.map((radio, index) =>
  radio.addEventListener('click', () =>
    togglePledgeSection(index)
  )
);
