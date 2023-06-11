let page = 1;

const btnPrev = document.querySelector("#btnPrev");
const spanPage = document.querySelector("#page");
const btnNext = document.querySelector("#btnNext"); 

btnNext.addEventListener("click", ()=>{
    if(page < 1000){
        page+=1;
        LoadMovies(page);
    }
});

btnPrev.addEventListener('click',()=>{
    if(page > 1){
        page-=1;
        LoadMovies(page);
    }
});


const LoadMovies = async (page) => {
    spanPage.innerHTML = page;
    const token = "5565c577e71c8555073ab49ddac03a14";
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${token}&page=${page}`; // url api con token

    try {

        const resp = await fetch(url);

        if (resp.status == 200) {

            const data = await resp.json();

            let movies = "";

            data.results.forEach((movie) => {
                movies += `

                <div class="card-movie">
                    <div class="movie-img">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                    </div>
                    <div class="movie-container-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <span class="movie-popularity"><i class="ri-eye-2-line"></i> ${movie.popularity}</span>
                        <span class="movie-release_date">${movie.release_date}</span>
                    </div>
                </div>`;
            });
            document.querySelector("#contenedor").innerHTML = movies;

        } else if (resp.status == 401) {
            console.log("Key Incorrecta")
        } else {
            console.log("Error loading data")
        }


    } catch (error) {
        console.log(error);
    }
}

LoadMovies(1);