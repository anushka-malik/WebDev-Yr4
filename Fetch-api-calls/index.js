let div= document.getElementById("para");

let btn= document.getElementById("but");
btn.addEventListener("click",apiData);

async function apiData()
{
    let heading = document.createElement("h1");
    heading.innerText="Loading data..."
    div.appendChild(heading);

    const response= await fetch("https://dummyjson.com/users");
    const data = await response.json();

    div.removeChild(heading);
    
    const users=data.users;

    let list = document.createElement("ul");
    users.map((item)=>{
        let el= document.createElement("li");
        el.innerText=item.firstName;
        list.appendChild(el);
    })

    div.appendChild(list);
}


