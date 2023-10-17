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

// for cards
const loadCardCategories = async () => {
    const categories = await getAllCategories();
    const categoryCards = document.getElementById('category-cards');
    await categories.forEach(async category => {
        const firstProd = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`)
                                .then(res => res.json())
                                .then(prod => prod[0]);
        var div = document.createElement('div');
        div.classList.add('col-lg-6', 'border');
        div.innerHTML = `
                                <div class="right-first-image bg-secondary">
                                    <div class="thumb">
                                        <div class="inner-content">
                                            <h4 class="bg-dark bg-gradient rounded-circle">${category[0].toUpperCase() + category.slice(1)}</h4>
                                            <!-- <span>Best Clothes For Women</span> -->
                                        </div>
                                        <div class="hover-content rounded">
                                            <div class="inner">
                                                <h4>${category[0].toUpperCase() + category.slice(1)}</h4>
                                                <!-- <p>Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p> -->
                                                <div class="main-border-button">
                                                    <a href="category.html?category=${category}">Discover More</a>
                                                </div>
                                            </div>
                                        </div>
                                        <img height="230px" width="200px" syle="object-fit: contain" src=${firstProd.image}>
                                    </div>
                                </div>
                        `
        categoryCards.appendChild(div);
    })
}

loadNavbarCategories();
loadCardCategories();

// for category section
// const loadCategorySections = async () => {
//     const categories = await getAllCategories();
//     const categoryWiseComponents = document.getElementById('category-components');
//     categories.forEach(async category => {
//         // const section = document.createElement('section');
//         // section.id = 'men';
//         // section.classList.add('section');
//         // const headingDiv = document.createElement('div');
//         // headingDiv.classList.add('container');
//         // headingDiv.innerHTML = `
//         //                         <div class="row">
//         //                             <div class="col-lg-6">
//         //                                 <div class="section-heading">
//         //                                     <h2>${category[0].toUpperCase() + category.slice(1)} Collection</h2>
//         //                                 </div>
//         //                             </div>
//         //                         </div>
//         //                         `
//         // section.appendChild(headingDiv);
//         // const products = await getProductsCategoryWise(category);
//         // const containerOuterDiv = document.createElement('div');
//         // containerOuterDiv.classList.add('owl-men-item', 'owl-carousel');
//         // await products.forEach(product => {
//         //     const itemDiv = document.createElement('div');
//         //     itemDiv.classList.add('item');
//         //     itemDiv.innerHTML = `
//         //                             <div class="thumb">
//         //                                 <div class="hover-content">
//         //                                     <ul>
//         //                                         <li><a href="single-product.html"><i class="fa fa-eye"></i></a></li>
//         //                                         <li><a href="single-product.html"><i class="fa fa-star"></i></a></li>
//         //                                         <li><a href="single-product.html"><i class="fa fa-shopping-cart"></i></a></li>
//         //                                     </ul>
//         //                                 </div>
//         //                                 <img src=${product.image} alt="">
//         //                             </div>
//         //                             <div class="down-content">
//         //                                 <h4>${product.title.slice(0, 50)}</h4>
//         //                                 <span>$${product.price}</span>
//         //                             </div>
//         //                         `
//         //     containerOuterDiv.appendChild(itemDiv);
//         // });
//         // const productsDiv = document.createElement('div');
//         // productsDiv.classList.add('container');
//         // const row = document.createElement('div');
//         // row.classList.add('row');
//         // const colLg = document.createElement('div');
//         // colLg.classList.add('col-lg-12');
//         // const carousel = document.createElement('div');
//         // carousel.classList.add('men-item-carousel');
//         // carousel.appendChild(containerOuterDiv);
//         // colLg.appendChild(carousel);
//         // row.appendChild(colLg);
//         // productsDiv.appendChild(row);
        
//         // // productsDiv.innerHTML = `
//         // //                             <div class="row">
//         // //                                 <div class="col-lg-12">
//         // //                                     <div class="men-item-carousel">
//         // //                                         ${containerOuterDiv}
//         // //                                     </div>
//         // //                                 </div>
//         // //                             </div>
//         // //                         `
//         // section.appendChild(productsDiv);

//         const section = document.createElement('section');
//         section.classList.add('section');
//         section.id = 'women';
//         // const headDiv = document.createElement('div');
//         // headDiv.classList.add('container');
//         // headDiv.innerHTML = `
//         //                         <div class="row">
//         //                             <div class="col-lg-6">
//         //                                 <div class="section-heading">
//         //                                     <h2>${category[0].toUpperCase() + category.slice(1)}</h2>
//         //                                 </div>
//         //                             </div>
//         //                         </div>
//         //                     `
//         // section.appendChild(headDiv);
//         // const productsContainer = document.createElement('div');
//         // productsContainer.classList.add('container');
        
//         // element.id = 'men'
//         section.innerHTML = `
//         <div class="container">
//         <div class="row">
//             <div class="col-lg-6">
//                 <div class="section-heading">
//                     <h2>Women's Latest</h2>
//                     <span>Details to details is what makes Hexashop different from the other themes.</span>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div class="container">
//         <div class="row">
//             <div class="col-lg-12">
//                 <div class="women-item-carousel">
//                     <div class="owl-women-item owl-carousel">
//                         <div class="item">
//                             <div class="thumb">
//                                 <div class="hover-content">
//                                     <ul>
//                                         <li><a href="single-product.html"><i class="fa fa-eye"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-star"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-shopping-cart"></i></a></li>
//                                     </ul>
//                                 </div>
//                                 <img src="assets/images/women-01.jpg" alt="">
//                             </div>
//                             <div class="down-content">
//                                 <h4>New Green Jacket</h4>
//                                 <span>$75.00</span>
//                                 <ul class="stars">
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="item">
//                             <div class="thumb">
//                                 <div class="hover-content">
//                                     <ul>
//                                         <li><a href="single-product.html"><i class="fa fa-eye"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-star"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-shopping-cart"></i></a></li>
//                                     </ul>
//                                 </div>
//                                 <img src="assets/images/women-02.jpg" alt="">
//                             </div>
//                             <div class="down-content">
//                                 <h4>Classic Dress</h4>
//                                 <span>$45.00</span>
//                                 <ul class="stars">
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="item">
//                             <div class="thumb">
//                                 <div class="hover-content">
//                                     <ul>
//                                         <li><a href="single-product.html"><i class="fa fa-eye"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-star"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-shopping-cart"></i></a></li>
//                                     </ul>
//                                 </div>
//                                 <img src="assets/images/women-03.jpg" alt="">
//                             </div>
//                             <div class="down-content">
//                                 <h4>Spring Collection</h4>
//                                 <span>$130.00</span>
//                                 <ul class="stars">
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="item">
//                             <div class="thumb">
//                                 <div class="hover-content">
//                                     <ul>
//                                         <li><a href="single-product.html"><i class="fa fa-eye"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-star"></i></a></li>
//                                         <li><a href="single-product.html"><i class="fa fa-shopping-cart"></i></a></li>
//                                     </ul>
//                                 </div>
//                                 <img src="assets/images/women-01.jpg" alt="">
//                             </div>
//                             <div class="down-content">
//                                 <h4>Classic Spring</h4>
//                                 <span>$120.00</span>
//                                 <ul class="stars">
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                     <li><i class="fa fa-star"></i></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//         `
//         document.getElementById('men').insertAdjacentElement('beforebegin', section);
//     });
// }

// loadCategorySections();