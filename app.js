let paper = document.querySelector("#paper");
let colorpiker = document.querySelector("#colorpiker");

colorpiker.addEventListener("change", (e) => {
  console.log(e.target.value);
});

paper.addEventListener("mousemove", (e) => {
  if (e.buttons === 1) {
    let y = Math.floor(e.clientY / 5);
    let x = Math.floor(e.clientX / 5);
    pixels[y][x].color = colorpiker.value;
    pixels[y][x].needsUpdate = true;
    renderImage(pixels, true);
  }
});

const createImage = () => {
  let image = [];

  for (let y = 0; y < 100; y++) {
    let row = [];

    for (let x = 0; x < 100; x++) {
      row.push({
        color: "#4B060600",
        needsUpdate: true,
      });
    }
    image.push(row);
  }
  return image;
};

const renderImage = (image, update = false) => {
  let wrapper = undefined;
  if (!update) {
    paper.innerHTML = "";
    wrapper = document.createElement("div");
  }

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      if (image[y][x].needsUpdate) {
        if (update) {
          let div = document.getElementById(`p-${y}-${x}`);
          div.style.backgroundColor = image[y][x].color;
        } else {
          let div = document.createElement("div");
          div.id = `p-${y}-${x}`;
          div.classList.add("point");
          //   HW1 : Methods of .classList : list.add; list.remove; list.toggle, list.replace...
          //   HW2 : „classList” - putem adauga sau elimina o clasa fara a afecta celelalte clase pe care le-ar putea avea elementul. Dar daca atribuim „className”, va sterge toate clasele existente in timp ce adaugam una noua sau daca atribuim un sir gol, le va sterge pe toate.
          //         Atribuirea „className” poate fi o comoditate pentru cazurile in care suntem siguri ca nu vor fi folosite alte clase pe element, dar cel mai frecvent se folosesc metodele „classList”.
          div.style.backgroundColor = image[y][x].color;
          wrapper.appendChild(div);
          image[y][x].needsUpdate = false;
          paper.appendChild(div);
        }
      }
    }
  }
  if (!update) paper.appendChild(wrapper);
};
let pixels = createImage();

// pixels[99][99].color = "red";
renderImage(pixels);
