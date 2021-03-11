function Logout(props) {
  window.localStorage.removeItem('jwt');
  props.authenticate(false);
  window.location.href = '/home';
  return;
}

export default Logout;