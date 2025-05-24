const useForm = document.querySelector("#form-users");

let users = [];
let editing = false;
let userId = null;
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  users = data;
  renderUser(users);
});

useForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = useForm["nombre"].value;
  const email = useForm["email"].value;
  const password = useForm["password"].value;

  if (!editing) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    console.log(users, "a")
    const data = await response.json();
    users.push(data);
    renderUser(users);
    console.log(users)

  } else {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const updateUser = await response.json();
    users = users.map((user) =>
      user.id === updateUser.id ? updateUser : user
    );
    console.log(users);
    renderUser(users);

    editing = false;
    userId = null;
  }
  useForm.reset();
});


function renderUser(userss) {
    const userList = document.querySelector("#userList");
    userList.innerHTML = "";
    userss.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
            <header>
                <h3><b>Usuario: </b>${user.username}</h3>
            </header>
            <p><b>Email:</b> ${user.email}</p>
            <div>
                <button class="btn-update">Editar</button>
                <button class="btn-delete">Eliminar</button>
            </div>
        `;

        const btnDelete = userItem.querySelector(".btn-delete");

        btnDelete.addEventListener("click", async (e) => {
        const response = await fetch(`/api/users/${user.id}`, {
            method: "DELETE",
        });
        
        const data = await response.json();

        users = users.filter((user) => user.id !== data.id);
        console.log(users, "1")
        renderUser(users);
        console.log(users, "2")

        });

        userList.appendChild(userItem);
        const btnEdit = userItem.querySelector(".btn-update");

        btnEdit.addEventListener("click", async (e) => {
        const response = await fetch(`/api/users/${user.id}`);
        const data = await response.json();

        useForm["nombre"].value = data.username;
        useForm["email"].value = data.email;

        editing = true;
        userId = user.id;
        });  });
}
