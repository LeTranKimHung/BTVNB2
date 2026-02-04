/**
 * Chức năng: Quản lý bài viết (CRUD) với cơ chế xóa mềm và ID tự tăng
 * Tương tác với: db.json qua json-server
 */

const API_URL = 'http://localhost:3000/posts';

/**
 * Lấy danh sách bài viết và hiển thị
 * Yêu cầu: Sử dụng gạch ngang cho các post đã xóa mềm (isDeleted: true)
 */
async function getData() {
    try {
        let res = await fetch(API_URL);
        let posts = await res.json();
        let body = document.getElementById('table_body');
        body.innerHTML = '';

        for (const post of posts) {
            // Kiểm tra trạng thái xóa mềm
            const isDeleted = post.isDeleted === true;
            const rowClass = isDeleted ? 'class="deleted-row"' : '';
            
            body.innerHTML += `
                <tr ${rowClass}>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.views}</td>
                    <td>
                        ${!isDeleted 
                            ? `<input type='button' value='Sửa' onclick='editPost("${post.id}", "${post.title}", ${post.views})'>
                               <input type='button' value='Xóa' onclick='DeleteSoft("${post.id}")'>` 
                            : '<em></em>'}
                    </td>
                </tr>`;
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}

/**
 * Lưu dữ liệu bài viết
 * Yêu cầu: 
 * - Nếu tạo mới (ID trống): ID = maxId + 1
 * - Nếu sửa (có ID): Sử dụng PATCH để giữ nguyên trạng thái isDeleted
 */
async function Save() {
    let id = document.getElementById('txt_id').value;
    let title = document.getElementById('txt_title').value;
    let views = document.getElementById('txt_views').value;

    if (!title || !views) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (!id) {
        // --- LOGIC TẠO MỚI (ID TỰ TĂNG) ---
        let resAll = await fetch(API_URL);
        let posts = await resAll.json();
        
        // Tính maxId + 1
        let maxId = posts.length > 0 ? Math.max(...posts.map(p => parseInt(p.id))) : 0;
        let newId = (maxId + 1).toString();

        let res = await fetch(API_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: newId,
                title: title,
                views: views,
                isDeleted: false // Mặc định khi tạo mới
            })
        });
        if (res.ok) console.log("Thêm mới thành công");
    } else {
        // --- LOGIC CẬP NHẬT ---
        let res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, views })
        });
        if (res.ok) console.log("Cập nhật thành công");
    }
    
    clearForm();
    getData();
}

/**
 * Chuyển xóa cứng thành xóa mềm
 * Thêm isDeleted: true vào đối tượng thay vì xóa bản ghi
 */
async function DeleteSoft(id) {
    if (confirm("Bạn có chắc muốn xóa bài viết này không?")) {
        let res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDeleted: true })
        });
        
        if (res.ok) {
            console.log("Đã chuyển sang trạng thái xóa mềm");
            getData();
        }
    }
}

/**
 * Đổ dữ liệu vào form để chuẩn bị sửa
 */
function editPost(id, title, views) {
    document.getElementById('txt_id').value = id;
    document.getElementById('txt_title').value = title;
    document.getElementById('txt_views').value = views;
}

/**
 * Làm mới các ô nhập liệu
 */
function clearForm() {
    document.getElementById('txt_id').value = '';
    document.getElementById('txt_title').value = '';
    document.getElementById('txt_views').value = '';
}

// Chạy lần đầu
getData();