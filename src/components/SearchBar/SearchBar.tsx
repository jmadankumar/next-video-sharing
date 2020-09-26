import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.query || '');

  const handleSearch = () => {
    if (query) {
      router.push(`/search?query=${query}`);
    }
  };

  const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>)=>{
    if(event.key === 'Enter'){
      handleSearch();
    }
  }

  return (
    <div className="flex flex-row items-center">
      <input
        className="bg-white outline-none border border-gray-300 focus:border-green-500 py-1 px-4 text-black rounded-l-sm"
        placeholder="Search"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-gray-100 outline-none hover:bg-gray-300 py-1 px-4 text-gray-500 border border-l-0 border-gray-300 focus:border-green-300 rounded-r-sm"
        onClick={handleSearch}
      >
        <SearchIcon />
      </button>
    </div>
  );
};
export default SearchBar;
