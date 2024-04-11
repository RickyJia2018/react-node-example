/* eslint-disable import/prefer-default-export */
import PrismaSingleton from '../lib/prisma';
import { MagicCard } from '../models';

const prism = PrismaSingleton.getInstance();
const findMagicCard = async (scryfallId: string): Promise<MagicCard | null> => {
    try {
        const result = await prism.$queryRaw<MagicCard[]>`
            SELECT * FROM magiccards
            WHERE scryfallId = ${scryfallId}
        `;
        return result[0] || null;
    } catch (error) {
        //TODO: log error
        console.error("Error finding magic card:", error);
        return null;
    }
}
export { findMagicCard }