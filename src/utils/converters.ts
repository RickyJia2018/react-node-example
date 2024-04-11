/* eslint-disable import/prefer-default-export */
import { ScryfallCard } from "../models/scryfallModels";
import { MagicCard, MagicCardResponse } from "../models";

export const convertCard = (scryCard: ScryfallCard, magicCard?: MagicCard|null): MagicCardResponse => ({
        scryfall_id: scryCard.id,
        name: scryCard.name,
        number: scryCard.collector_number,
        set_name: scryCard.set_name,
        rarity: scryCard.rarity,
        image_uris: scryCard.image_uris,
        parent_card: magicCard||undefined
    });

