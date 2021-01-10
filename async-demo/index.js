// Async Versions
console.log("Before");

// getUser(1, (user) => {
//   getRepositories(user.githubUsername, (repos) => {
//     console.log("Repositories", repos);
//     getCommits(repo, (commits) => {});
//     // Callback Hell

//   });
// });

// getUser(1, getRepositories);
// console.log("After");

// function getRepositories(user) {
//   getRepositories(user.githubUsername, getCommits);
// }

// function getCommits(repos) {
//   getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//   console.log(commits);
// }

// Sync Version
// console.log('Before')
// const user = getUser(1);
// const repos = getRepositories(user.githubUsername);
// const commits = getCommits(repos[0]);

// Replace Callback with Promises to avoid callback hell
getUser(1)
  .then((user) => getRepositories(user.githubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("Commits", commits))
  .catch((err) => console.log("Error: ", err.message));

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading from a database....");
      resolve({ id: id, githubUsername: "jerrycode06" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Extracting Repositories for ${username}....`);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Extracting Commits for " + repo + "....");
      resolve(["commits"]);
    }, 2000);
  });
}
