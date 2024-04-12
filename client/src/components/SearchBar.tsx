

// const SearchBar = () => {
//     const [value, setValue] = useState();

//     const debouncedRequest = useDebounce(() => {
//         // send request to the backend
//         // access to latest state here
//         console.log(value);
//     });

//     const onChange = (e) => {
//         const value = e.target.value;
//         setValue(value);

//         debouncedRequest();
//     };

//     return <input onChange={onChange} value={value} />;
// }

// export default SearchBar