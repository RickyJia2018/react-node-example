import './App.css'
import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';
import { CardModel } from './types';
import  Card  from './components/Card';
import { log } from 'winston';
import { get } from 'lodash';
const App = () => {
  const API_URL = 'http://localhost:3001' //TODO: move to  .env
  const maxCard = 5;
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCards, setTotalCards] = useState(0);
  const [searchVal, setsearchVal] = useState('');
  const [cardList, setCardList] = useState<Array<CardModel>>();
  const [notFoundMsg, setNotFoundMsg] = useState('');
  const debouncedSearch = useDebounce(searchVal, 1000);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const fetchData = () =>{

      try{
        setIsLoading(true);

        fetch(`${API_URL}/cards/search?query=${searchVal}&page=${pageNumber}`)
        .then(async (response) => { 
          const res = await response.json();  

          if (!response.ok) {
            setIsLoading(false);

            setNotFoundMsg(res.error.details);
            throw new Error(res.error.details);
     
          } 
          setTotalCards(res.total_cards);
          setHasMore(res.has_more);
          processData(res.data);
          setCardList(res.data);
          setIsLoading(false);

        })
      }catch(err){
        throw err
      }

    }
    if(debouncedSearch){
      setCardList(undefined);
      setNotFoundMsg('');
      fetchData();
    } 

  },[debouncedSearch])
  const processData = (data: Array<CardModel>) =>{

  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setsearchVal(value)
  };

  const handleLoadMoreData: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log("BTN PRESSED");
};


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
          isLoading?
          <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-cyan-500 hover:bg-cyan-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns='http://www.w3.org/2000/svg' fill='none' viewBox="0 0 24 24">
              <circle className='opacity-25' cx="12" cy="12" r="10" stroke='currentColor' strokeWidth={4}></circle>
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
            Loading...
          </button>
          :
          cardList?
          <div className='flex flex-wrap justify-center'>
            {cardList.map((card, index)=> <Card key={index} data={card}/>)}
            <div className='w-screen'>
              <button className='relative left-1/2 -translate-x-1/2 m-10 text-slate-100 bg-cyan-600 w-[8rem] h-[3rem] bg-opacity-80  backdrop-blur-[0.5rem] border border-white rounded-full flex items-center justify-center hover:scale-[1.16] active:scale-105 transition-all'
                onClick={handleLoadMoreData}
              >Load More</button>

            </div>
          </div>:
          <h2>{notFoundMsg}</h2>
        }

    </div>
       
   


  );
};


export default App
