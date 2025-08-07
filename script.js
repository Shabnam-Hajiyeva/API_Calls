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

// Task 3 and 4: POST or PUT
document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const postId = document.getElementById("postId").value;

  const data = {
    title: title,
    body: body
  };

  if (postId === "") {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        document.getElementById("message").innerHTML = `
          <h3>Post Created</h3>
          <p>ID: ${response.id}</p>
          <p>Title: ${response.title}</p>
          <p>Body: ${response.body}</p>
        `;
      })
      .catch(() => {
        document.getElementById("message").innerText = "Error: Failed to send post.";
      });
  } else {
    // PUT Request
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${postId}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        document.getElementById("message").innerHTML = `
          <h3>Post Updated</h3>
          <p>ID: ${response.id}</p>
          <p>Title: ${response.title}</p>
          <p>Body: ${response.body}</p>
        `;
      } else {
        document.getElementById("message").innerText = "Error: Could not update post.";
      }
    };
    xhr.onerror = function () {
      document.getElementById("message").innerText = "Error: Network problem.";
    };
    xhr.send(JSON.stringify(data));
  }
});