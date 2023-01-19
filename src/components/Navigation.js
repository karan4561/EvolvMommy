import { ethers } from 'ethers';
import logo from '../assets/logo.svg';
import evolv from '../assets/evolv.svg';

const Navigation = ({ account, setAccount }) => {

  const connectHandler = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  }

    return (
      <nav>
        <div className='nav__brand'>
          <img src={evolv} alt="evolv" />
          <h1>Evolv Mommy</h1>
  
          <ul className='nav__links'>
            <li><a href="/">Domain Names</a></li>
            <li><a href="/">Brand Onboard</a></li>
            <li><a href="/">Level Up</a></li>
            <li><a href="/">Pricing</a></li>
          </ul>
        </div>
  
        { account ? (
        <button
          type="button"
          className='nav__connect'
        >
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className='nav__connect'
          onClick={connectHandler}
        >
          Connect
        </button>
      )}
      </nav>
    );
}

export default Navigation;
 

// <li><a href="/">Domain Names</a></li>
// <li><a href="/">Brand Onboard</a></li>
// <li><a href="/">Level Up</a></li>
// <li><a href="/">Pricing</a></li>