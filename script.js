const accessKey = "mXIpgy2sCYYnSSwr_8Va3xjNhbIHMZUPTgiCVmSEZes"
const formElement = document.querySelector("form")
const inputElement = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData =""; //  will store the search query entered by the user.
let page = 1; // will keep track of the current page of search results.
let resultsCount = 0; // will keep track of the total number of results displayed on the page.

async function searchImages(){
    inputData = inputElement.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    
    results.forEach((result) => {
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    resultsCount += results.length;
    // resultsCount += results.length;: This is a compound 
    //assignment expression. It takes the current value of resultsCount,
    // adds results.length to it, and then assigns the result back to
    // resultsCount. In other words, 
    //it increments resultsCount by the number of new results.
  
    if (resultsCount >= data.total) {
        showMore.style.display = "none";
    } else {
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    resultsCount = 0; // Reset results count
    searchResults.textContent = ""; // Clear previous results
    searchImages();
});

showMore.addEventListener("click", () => {
    page++; // Increment page to load more results
    searchImages();
});
