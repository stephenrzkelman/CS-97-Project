export default token => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${token}`
  }
});
