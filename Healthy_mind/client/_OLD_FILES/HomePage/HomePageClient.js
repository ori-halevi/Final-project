// code yuck
const submitNameButton = document.getElementById("submitNameButton");

submitNameButton.addEventListener("click", () => {
  runLookup();
});

async function runLookup() {
  let result = await readFile();
  return result;
}

async function readFile() {
  let name = await document.getElementById("nameInput").value;
  try {
    // send request to server
    const getInfoResult = await fetch(
      `https://jsonplaceholder.typicode.com/users/?username=${name}`
    );
    if (!getInfoResult.ok) {
      throw new Error(
        "This Info doesn't exsist in our website, check your URL."
      );
    }
    // return it JSON
    const asJSON = await getInfoResult.json();
    if (asJSON.length !== 0) {
      return asJSON;
    } else {
      throw new Error("There is not such a person in our website!");
    }
    // catch errors
  } catch (error) {
    console.error("Error reading file:", error);
    setTimeout(() => {
      document.getElementById("nameInput").value = "";
    }, 5500);
  }
}
