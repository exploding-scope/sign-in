document.getElementById('clockForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  localStorage.setItem('userName', name);
  document.getElementById('message').textContent = `Hello, ${name}! You have clocked in/out.`;
});

window.addEventListener('load', function() {
  const savedName = localStorage.getItem('userName');
  if (savedName) {
    document.getElementById('name').value = savedName;
  }
});
