// Task 1
document.getElementById("fetchBtn").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerHTML = `
        <h3>Fetch Result</h3>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Body:</strong> ${data.body}</p>
      `;
    })
    .catch(error => {
      document.getElementById("output").innerText = "Error: Could not fetch data.";
    });
});
