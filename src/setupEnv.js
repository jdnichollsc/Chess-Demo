window.process = {
  env: {
    NODE_ENV: 'development',
    REACT_APP_CHAINID: process.env.REACT_APP_CHAINID || '0xaa36a7',
    REACT_APP_BACKEND_ENDPOINT: process.env.REACT_APP_BACKEND_ENDPOINT || 'http://localhost:7000/',
    REACT_APP_REWARD_CONTRACT_ADDRESS: process.env.REACT_APP_REWARD_CONTRACT_ADDRESS
  }
}
