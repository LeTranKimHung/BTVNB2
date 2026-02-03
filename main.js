async function getData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let body = document.getElementById('table_body');
        body.innerHTML = '';
        for (const post of posts) {
            body.innerHTML += `<tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td><input type='submit' value='Delete' onclick='
                Delete(${post.id})'></td>
            </tr>`
        }
    } catch (error) {
        console.log(error);
    }
}
async function Save() {
    let id = document.getElementById('txt_id').value;
    let title = document.getElementById('txt_title').value;
    let views = document.getElementById('txt_views').value;
    let getItem = await fetch('http://localhost:3000/posts/' + id);
    if (getItem.ok) {
        //edit
        let res = await fetch('http://localhost:3000/posts/'+id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                views: views
            })
        })
        if (res.ok) {
            console.log("thanh cong");
        }
    } else {
        //create
        let res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                title: title,
                views: views
            })
        })
        if (res.ok) {
            console.log("thanh cong");
        }
    }
}
async function Delete(id) {
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'delete'
    })
    if (res.ok) {
        console.log("xoa thanh cong");
    }
}
getData();

