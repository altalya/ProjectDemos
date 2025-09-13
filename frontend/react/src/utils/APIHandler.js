import cookies from 'js-cookie';

function apiCall(url, method, data,isAuthRequired = true) {
  return fetch(`http://localhost:5001${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(isAuthRequired && { 'Authorization': `Bearer ${cookies.get('token')}` })
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if(method.toUpperCase() !== 'GET') {
        alert("Execution Successful");
      }
      return response.json();
    })  
    .catch(error => {
      alert("Execution Failed");
      console.error('Error fetching data:', error);
      throw error;
    });
}
export { apiCall };