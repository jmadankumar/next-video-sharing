import SearchIcon from '@material-ui/icons/Search';

const SearchBar = () => {
  return (
    <div className="flex flex-row items-center">
      <input
        className="bg-white outline-none border border-gray-300 focus:border-green-500 py-1 px-4 text-black rounded-l-sm"
        placeholder="Search"
      />
      <button className="bg-gray-100 outline-none hover:bg-gray-300 py-1 px-4 text-gray-500 border border-l-0 border-gray-300 focus:border-green-300 rounded-r-sm">
        <SearchIcon />
      </button>
    </div>
  );
};
export default SearchBar;
