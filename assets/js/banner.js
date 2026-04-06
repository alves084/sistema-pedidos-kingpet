const images = [
    "https://images.unsplash.com/photo-1601758123927-196be6f89e33",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
];

let index = 0;
const bannerImg = document.getElementById("banner-img");

setInterval(() => {
    index = (index + 1) % images.length;
    bannerImg.src = images[index];
}, 4000);
