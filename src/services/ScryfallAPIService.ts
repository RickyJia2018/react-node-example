/* eslint-disable import/prefer-default-export */
import axios, {AxiosResponse} from 'axios'
import { ScryfallCardsQueryResponse } from '../models/scryfallModels'

const SCRYFALL_URL = process.env.SCRYFALL_API

const getScryfallCards = (query: string, page: number): Promise<ScryfallCardsQueryResponse> =>
    axios
    .get(`${SCRYFALL_URL}/cards/search?q=${query}&page=${page}`)
    .then((response: AxiosResponse<ScryfallCardsQueryResponse>) => response.data)
    .catch((err) => {
        throw err;
    });


export { getScryfallCards }