import './App.css'
import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';
import { CardModel } from './types';
import  Card  from './components/Card';
import { log } from 'winston';
import { get } from 'lodash';
const App = () => {
  const API_URL = 'http://localhost:3001' //TODO: move to  .env

  const [pageNumber, setPageNumber] = useState(1)
  const [searchVal, setsearchVal] = useState('');
  const [cardList, setcardList] = useState<Array<CardModel>>();

  const debouncedSearch = useDebounce(searchVal, 1000);


  useEffect(()=>{
    const fetchData = async() =>{
      const data = await fetch(
        `${API_URL}/cards/search?query=${searchVal}&page=${pageNumber}`
        ).then((res)=>res.json())
        console.log(data);
        
      setcardList(data);

    }
    if(debouncedSearch) fetchData();
  },[debouncedSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setsearchVal(value)
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
          
        <div className='flex flex-wrap justify-center'>
          {cardList?.map((card, index)=> <Card key={index} data={card}/>)}
        </div>
    </div>
       
   


  );
};


export default App
