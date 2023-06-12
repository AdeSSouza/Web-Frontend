import axios from 'axios';

//Base da URL https://api.themoviedb.org/3/
//URL DA API /movie/now_playing?api_key=4d5426e36ec507cf4b037ec5b55f0af0&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;