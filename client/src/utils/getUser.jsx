export default  function index() {
 return JSON.parse ( localStorage.getItem('user') ) || undefined
}