import { API_HOST } from "../../utils/constants";


export async function login(user, password) {

    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user, password: password })
        };
        const url = 'https://reqres.in/api/login';
        const response = await fetch(url, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if(isJson)
                return await data.token;
                else 
                return "s";
            }
            );
            return await response;
    }
    catch (error) {
        throw error;
    }
}

export async function getMovies() {

    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `${API_HOST}movie/popular?api_key=f0fac2fae47e5b734d045ec76a8bb8bb`;
        const response = await fetch(url, requestOptions);
            return await response.json();
    }
    catch (error) {
        throw error;
    }
}

export async function getMovieApi(id) {

    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `${API_HOST}movie/`+id+`?api_key=f0fac2fae47e5b734d045ec76a8bb8bb`;
        const response = await fetch(url, requestOptions);
            return await response.json();
    }
    catch (error) {
        throw error;
    }
}
export async function getMovieSimilarApi(id) {

    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `${API_HOST}movie/`+id+`/similar?api_key=f0fac2fae47e5b734d045ec76a8bb8bb`;
        const response = await fetch(url, requestOptions);
            return await response.json();
    }
    catch (error) {
        throw error;
    }
}

export async function searchApi(query) {

    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `${API_HOST}search/movie?api_key=f0fac2fae47e5b734d045ec76a8bb8bb&language=en-US&query=`+query+`&page=1&include_adult=true`;
        const response = await fetch(url, requestOptions);
            return await response.json();
    }
    catch (error) {
        throw error;
    }
}

