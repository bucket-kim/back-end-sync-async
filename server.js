const fs = require("fs");
const superagent = require("superagent");
const bodyParser = require("body-parser");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Cannot find a file 😐");

      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Cannot write a file 😐");

      resolve("It is done!");
    });
  });
};

// clean method
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// ------------------------------------------------

// triangle classic method
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log("Random dog image saved to file");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// ------------------------------------------------
// asyng/await method

// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`Breed: ${data}`);

//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//     console.log(res.body.message);

//     await writeFilePro("dog-img.txt", res.body.message);
//     console.log("Random dog image saved to file");
//   } catch (err) {
//     console.log(err.message);
//     // promise to throw error message
//     throw err;
//   }
//   return "2: ready 🐶";
// };

// ------------------------------------------------
// waiting for multiple promises

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);
    const img = all.map((el) => el.body.message);

    await writeFilePro("dog-img.txt", img.join("\n"));
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err.message);
    // promise to throw error message
    throw err;
  }
  return "2: ready 🐶";
};

(async () => {
  try {
    console.log("1: will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting pictures");
  } catch (err) {
    console.log("ERROR");
  }
})();

// console.log("1: will get dog pics");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: Done getting pictures");
//   })
//   .catch((err) => {
//     console.log("ERROR");
//   });
