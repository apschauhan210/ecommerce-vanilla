const getAllCategories = async () => {
    const categories = await getCategories();
    return categories;
}

// for navbar
const loadNavbarCategories = async () => {
    const categories = await getAllCategories();
    const categoryDropdown = document.getElementById("category-droptdown");
    categories.forEach(category => {
        var li = document.createElement('li');
        li.innerHTML = `<a href="category.html?category=${category}">${category[0].toUpperCase() + category.slice(1)}</a>`
        categoryDropdown.appendChild(li);
    });
}

loadNavbarCategories();