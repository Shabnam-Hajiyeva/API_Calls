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

// Task 2: GET with XMLHttpRequest
document.getElementById("xhrBtn").addEventListener("click", function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("output").innerHTML = `
        <h3>XHR Result</h3>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Body:</strong> ${data.body}</p>
      `;
    } else {
      document.getElementById("output").innerText = "Error: Failed to load data.";
    }
  };
  xhr.onerror = function () {
    document.getElementById("output").innerText = "Error: Network problem.";
  };
  xhr.send();
});