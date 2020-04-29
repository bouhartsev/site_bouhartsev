let burger = document.getElementById('hamburger');
burger.addEventListener("click", toggleBurger);

let cross = document.getElementById('cross');
cross.addEventListener("click", toggleBurger);

function toggleBurger(evt){
    let side = document.getElementById('side-nav');
    if (side.classList.contains("side-nav-toggle")){
        side.classList.remove("side-nav-toggle")
    } else {
        side.classList.add("side-nav-toggle");
    }

}
