let dictionary = JSON.parse(localStorage.getItem("dictionary") as string) || [];

let inputWord = document.getElementById("input-word") as HTMLInputElement;
let btnSearch = document.getElementById("btn-search") as HTMLButtonElement;
let showMeaning = document.querySelector(
  ".show-meaning"
) as HTMLParagraphElement;
let edit = document.getElementById("edit") as HTMLButtonElement;
let deleteBtn = document.getElementById("delete") as HTMLButtonElement;
let addAnswer = document.getElementById("add-answer") as HTMLButtonElement;
let meaningWord = document.querySelector(".meaning-word") as HTMLDivElement;

let index: number;
let check = false;
let checkEdit = false;
let checkDelete = false;
let checkAdd = false;

btnSearch.addEventListener("click", () => {
  let input = inputWord.value;
  for (let i = 0; i < dictionary.length; i++) {
    meaningWord.style.display = "flex";
    if (input === dictionary[i].word) {
      showMeaning.innerHTML = dictionary[i].meaning;
      index = i;
      check = true;

      break;
    } else {
      check = false;
    }
  }
  if (check === false) {
    edit.style.display = "none";
    deleteBtn.style.display = "none";
    addAnswer.style.display = "block";
    showMeaning.innerHTML = "Không có kết quả";
  } else {
    edit.style.display = "block";
    deleteBtn.style.display = "block";
    addAnswer.style.display = "none";
  }
});

edit.addEventListener("click", () => {
  // sửa và lưu vào localStorage
  let input = prompt("Nhập nghĩa của từ");
  if (checkEdit === false) {
    if (input !== null) {
      dictionary[index].meaning = input;
      showMeaning.innerHTML = input;
      checkEdit = true;
    }
  }

  localStorage.setItem("dictionary", JSON.stringify(dictionary));
});

deleteBtn.addEventListener("click", () => {
  if (checkDelete === false) { // xóa và lưu vào localStorage 
    if (check === true) {
      dictionary.splice(index, 1);
      showMeaning.innerHTML = "Deleted";
      checkDelete = true;
    }
  }
  localStorage.setItem("dictionary", JSON.stringify(dictionary));
});

addAnswer.addEventListener("click", () => {
  let input = prompt("Nhập nghĩa của từ");
  if (checkAdd === false) {
    if (input !== null) {
      dictionary.push({
        meaning: input,
        word: inputWord.value,
      });
      showMeaning.innerHTML = input;
      checkAdd = true;
    }
  }
  localStorage.setItem("dictionary", JSON.stringify(dictionary));
});
