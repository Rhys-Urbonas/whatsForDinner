fetch('../views/header.html')
  .then(response => response.text())
  .then(data => {
      document.getElementById('headerContainer').innerHTML = data;
  });
