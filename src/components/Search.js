const Search = () => {
  return (
    <header>
      <h2 className="header__title">It all begins with a Digital Asset.</h2>
      <div className="header__search">
        <input
          type="text"
          className="header__input"
          placeholder="Find your domain"
        />
        <button
          type="button"
          className='header__button'
        >
          Buy It
        </button>
      </div>
      {/* <p className="header__subtitle">Seek and buy available Evolv domain names</p> */}
    </header>
  );
}

export default Search;