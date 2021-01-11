// const p = Promise.resolve({ id: 1 });
// p.then((result) => console.log(result));
// const p = Promise.reject(new Error("reason for rejection..."));
// p.catch((err) => console.log(err));

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Operation 1...");
    resolve(1);
    // reject(new Error("Because Something Failed.."));
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Operation 2...");
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
