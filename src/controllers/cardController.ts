/* eslint-disable import/prefer-default-export */
import { Request, Response } from "express";
import { AxiosError } from "axios";
import { getScryfallCards } from "../services/ScryfallAPIService";
import { findMagicCard } from "../services/dbService";
import { convertCard } from "../utils/converters";
import { ErrorResponse, ScryfallCardsQueryResponse } from "../models/scryfallModels";
import logger from "../services/loggingService";

export const getCardList = async (req: Request, res: Response) => {
    const { query, page } = req.query;
    const pageNumber = parseInt(page as string, 10);
    logger.info("[getCardList]", query);

    // Check if query parameter is valid
    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ error: 'Query parameter is missing or empty' });
    }
    let scryfallRes
    try {
        // Get card data from Scryfall API
        scryfallRes = await getScryfallCards(query,pageNumber);

    } catch (error) {
        if( error instanceof AxiosError ) {
           return res.status(404).json({ error: error.response?.data});
        }
          return  res.status(500).json({ error: 'Internal server error'});
        
    }
    const cardList = scryfallRes.data;

    // Map over card list and fetch related Magic cards
    const magicCardPromises = cardList.map(async scryCard => {
        try {
            const magicCard = await findMagicCard(scryCard.id);
            return convertCard(scryCard, magicCard);
        } catch (error) {
            // Log error fetching Magic card
            logger.error(`Error fetching Magic card for Scryfall ID: ${scryCard.id}`, error);
            return convertCard(scryCard); // Continue with Scryfall card if Magic card not found
        }
    });


    // Wait for all promises to resolve and send response
    const response = await Promise.all(magicCardPromises);
   return res.json(response);
};
