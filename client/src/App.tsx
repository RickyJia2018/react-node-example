import './App.css'
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useDebounce from './hooks/useDebounce';
import { CardModel, ResponseModel } from './types';
import  Card  from './components/Card';
import { log } from 'winston';
import { get } from 'lodash';
import { all } from 'axios';
const App = () => {
  const API_URL = 'http://localhost:3001' //TODO: move to  .env
  const cardPerPage = 10;
  const [cardIndex, setCardIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCards, setTotalCards] = useState(0);
  const [searchVal, setsearchVal] = useState('');
  const [resData, setResData] = useState<ResponseModel>();
  const [cardList, setCardList] = useState<Array<CardModel>>();
  const [notFoundMsg, setNotFoundMsg] = useState('');
  const debouncedSearch = useDebounce(searchVal, 1000);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() =>{
    if(inView){
      loadCards();
    }

  },[inView,resData]);

  const fetchData = () =>{
    try{
      fetch(`${API_URL}/cards/search?query=${searchVal}&page=${pageNumber}`)
      .then(async (response) => { 
        const res = await response.json();  
        if (!response.ok) {
          setNotFoundMsg(res.error.details);
          throw new Error(res.error.details);
   
        } 
        setResData(res);
        setHasMore(res.hasMore);

      })
    }catch(err){
      throw err
    }

  }
  useEffect(()=>{

    if(debouncedSearch){
      setCardList(undefined);
      setPageNumber(1);
      setNotFoundMsg('');
      fetchData();
    } 

  },[debouncedSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setsearchVal(value)
  };


  const loadCards = () => {
    
    const totalCards = resData?.total_cards || 0;
    const allCards = resData?.data;
    let newCardList = cardList;

    if (allCards){

      if( cardIndex + cardPerPage < allCards.length){
          const cards = allCards.slice(cardIndex, cardIndex + cardPerPage);
          newCardList = newCardList?.concat(cards)||cards;
          setCardList(newCardList);
          setCardIndex(cardIndex+cardPerPage);
          setHasMore(true);
        }else{
          // append reset cards if any
          const cards = allCards.slice(cardIndex, totalCards);
          newCardList = newCardList?.concat(cards)||cards;
          setCardList(newCardList);
          setCardIndex(cardIndex+cardPerPage);

          if(resData.has_more){  // has more cards, call api
            setPageNumber(pageNumber+1);
            fetchData();
          }else{
            setHasMore(false);
          }
        }
      }

    }

  return (
     <div  className="flex flex-col items-center justify-center">
        <input 
          className="z-[999] fixed top-0 h-[4.5rem] w-full rounded-none border border-white border-opacity-40
          bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] text-center
            sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
          name="search"
          type='text'
          value={searchVal}
          onChange={handleChange}
          maxLength={1000}
          placeholder='Search for keywords...'
        />
        
        {
          cardList?
          <div className='flex flex-wrap justify-center'>
            {cardList.map((card, index)=> <Card key={index} data={card}/>)}

          </div>:
          <h2>{notFoundMsg}</h2>
        }
        {
          searchVal&&hasMore&&
          <div className='flex justify-center w-screen mt-20' ref={ref}>
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-black" xmlns='http://www.w3.org/2000/svg' fill='none' viewBox="0 0 24 24">
              <circle className='opacity-25' cx="12" cy="12" r="10" stroke='currentColor' strokeWidth={4}></circle>
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>

          </div>
        }
     

    </div>
       
   


  );
};


export default App
