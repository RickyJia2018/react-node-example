import { CardModel } from "../types";
import { useRef } from "react";

interface CardProps {
    data: CardModel;
}

function Card({ data }: CardProps) {

    const yRange = [-10, 10];
    const xRange = [-10, 10];
    const magicCardRef = useRef<HTMLDivElement>(null);
    const propertyRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    
    function getRotate(range: number[], value: number, max: number) {
        return (value / max) * (range[1] - range[0]) + range[0];
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const magicCard = magicCardRef.current;
        const { offsetX, offsetY } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = magicCard as HTMLElement;
        const ry = -getRotate(yRange, offsetX, offsetWidth);
        const rx = getRotate(xRange, offsetY, offsetHeight);
        
        (magicCard as HTMLElement).style.setProperty('--rx', `${rx}deg`);
        (magicCard as HTMLElement).style.setProperty('--ry', `${ry}deg`);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) =>{
        const magicCard = magicCardRef.current;
        const propertyCard = propertyRef.current;
        const parentCard = parentRef.current;
        // const nameCard = nameRef.current;
        // hideElement(nameCard as HTMLElement);
        hideElement(propertyCard as HTMLElement);
        hideElement(parentCard as HTMLElement);

        (magicCard as HTMLElement).style.setProperty('--rx', `0deg`);
        (magicCard as HTMLElement).style.setProperty('--ry', `0deg`);
    }
    const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) =>{
        const propertyCard = propertyRef.current;
        const parentCard = parentRef.current;
        showElement(propertyCard as HTMLElement);
        showElement(parentCard as HTMLElement);

        
    }
    const showElement = (e: HTMLElement) =>{
        e.classList.remove('opacity-0');
        e.classList.add('opacity-90');
    }
    const hideElement = (e: HTMLElement) =>{
        e.classList.remove('opacity-90');
        e.classList.add('opacity-0');
    }
    return (
        <>
            <div className="relative">
                <div className="magic-card m-5 hover:shadow-lg rounded-xl hover:shadow-cyan-300 " 
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseOver={handleMouseOver}
                    ref={(magicCardRef)}
                >   
                {
                    data.image_uris?
                    <img className="w-[20rem] rounded-xl " src={data.image_uris.border_crop} />
                    :
                    <div className="w-[320px] h-[453px]">NO IMAGE</div>
                }
                </div>
                <div className="text-white p-3 absolute min-w-[200px] left-1/2 bottom-0 -translate-x-1/2 translate-y-full
                    bg-gray-900 rounded-lg z-10 shadow-lg shadow-slate-50 opacity-0
                    transition ease-in-out duration-1000"
                ref={(propertyRef)}>
                    <h6 className="italic underline">Name</h6>
                    <span  className="text-sm">{data.name}</span>
                    <h6 className="italic underline">Set Name</h6>
                    <span className="text-sm">{data.set_name}</span>
                    <h6 className="italic underline">Collectior Number</h6>
                    <span  className="text-sm">{data.number}</span>
                    <h6 className="italic underline">Rarity</h6>
                    <span className="text-sm">{data.rarity}</span>
                </div>

                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full z-10 opacity-0 transition ease-in-out duration-1000"
                ref={(parentRef)}>
                    {
                    data.parent_card&&
                    <div className={`p-4 w-full h-fit bg-[${data.parent_card.color}] opacity-85 rounded-lg`}>
                        <h6 className="italic underline">Parent Card</h6>
                        <span className="text-sm">{data.parent_card.name}</span> 
                    </div>
                    }
                </div>

        

            </div>
        </>
    );
}

export default Card;
