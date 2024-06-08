

fetch("http://localhost:5000/users/b1430ff3-6499-44e8-a6d8-314a986aa7ad/comments/c95f7965-ad89-4c8a-93f2-0ceb111cbd8f", {
            method: "PUT",
            body: JSON.stringify({
              title: "comment #2",
              body: "good comment ",
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
}).then(res => res.json())
.then(json => console.log(json));

// fetch("http://localhost:5000/users/b1430ff3-6499-44e8-a6d8-314a986aa7ad/comments")
// .then(res => res.json()).then(json => console.log(json))
