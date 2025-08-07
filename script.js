// Task 1
document.getElementById("fetchBtn").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(res => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then(data => {
      document.getElementById("output").innerHTML = `
        <h3>Fetch Result</h3>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Body:</strong> ${data.body}</p>`;
    })
    .catch(err => {
      document.getElementById("output").innerText = "Fetch error: " + err.message;
    });
});

// Task 2: GET with XMLHttpRequest
document.getElementById("xhrBtn").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("output").innerHTML = `
        <h3>XHR Result</h3>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Body:</strong> ${data.body}</p>`;
    } else {
      document.getElementById("output").innerText = "XHR error: " + xhr.status;
    }
  };
  xhr.onerror = function () {
    document.getElementById("output").innerText = "XHR network error";
  };
  xhr.send();
});

//Part 3 POST request
document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ title, body })
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to POST");
      return res.json();
    })
    .then(data => {
      document.getElementById("output").innerHTML = `
        <h3>POST Success</h3>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Body:</strong> ${data.body}</p>`;
    })
    .catch(err => {
      document.getElementById("output").innerText = "POST error: " + err.message;
    });
});

// Part 4: PUT request
document.getElementById("putForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("putId").value;
  const title = document.getElementById("putTitle").value;
  const body = document.getElementById("putBody").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("output").innerHTML = `
        <h3>PUT Success</h3>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Body:</strong> ${data.body}</p>`;
    } else {
      document.getElementById("output").innerText = "PUT error: " + xhr.status;
    }
  };

  xhr.onerror = function () {
    document.getElementById("output").innerText = "PUT network error";
  };

  const updatedData = JSON.stringify({ title, body });
  xhr.send(updatedData);
});