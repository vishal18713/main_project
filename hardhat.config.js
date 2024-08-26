require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity:{
    compilers:[
      {version:"0.8.20",

      },
    ],
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};