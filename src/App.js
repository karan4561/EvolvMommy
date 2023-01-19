import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Search from './components/Search'
import Domain from './components/Domain'

// ABIs
import ETHDaddy from './abis/ETHDaddy.json'

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [ethDaddy, setETHDaddy] = useState(null)
  const [domains, setDomains] = useState([])

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    let contractAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";
    const ethDaddy = new ethers.Contract(contractAddress, ETHDaddy, provider)
    setETHDaddy(ethDaddy)

    const maxSupply = await ethDaddy.maxSupply()
    console.log(maxSupply.toString());
    const domains = []

    for (var i = 1; i <= maxSupply; i++) {
      const domain = await ethDaddy.getDomain(i);
      domains.push(domain)
    }

    setDomains(domains)
    console.log(domains);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <Search />

      <div className='cards__section'>
        <h2 className='cards__title'>Why you need a EVOLV domain name.</h2>
        <p className='cards__description'>
        Own your custom username and be able to get into a brand new experience for your ecosystem
        </p>

        <hr />

        <div className='cards'>
           {domains.map((domain, index) => (
            <Domain domain={domain} ethDaddy={ethDaddy} provider={provider} id={index + 1} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


// import { useEffect, useState } from 'react'
// import { ethers } from 'ethers'

// // Components
// import Navigation from './components/Navigation'
// import Search from './components/Search'
// import Domain from './components/Domain'

// // ABIs
// import ETHDaddy from './abis/ETHDaddy.json'
// import Upload from './abis/ETHDaddy copy.json'

// // Config
// import config from './config.json';
// //import "./index.css"

// function App() {
//   const [Account,setAccount] = useState(null);
//   const [Provider,setProvider] = useState(null);
//   const [Contract, setContract] = useState(null);
//   const [Domain, setDomain] = useState([]);

//   const loadBlockchain = async() =>{

//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     setProvider(provider);

//     const network = await provider.getNetwork();
//     //console.log(network);

//     const signer = provider.getSigner();
//     let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//     //console.log(Upload.abi);
    
//     const EvolvMommy = new ethers.Contract(
//           contractAddress,
//           ETHDaddy,
//           Provider
//     );
//     setContract(EvolvMommy);

//     const check = await EvolvMommy.maxSupply();
//     console.log(check.toString());

//     const domains = [];

//     for(var i=0;i<check;i++){
//       const domain = await EvolvMommy.getDomain(i);
//       domains.push(domain); 
//       console.log(domain);
//     }

//     setDomain(domains);
//     console.log(Domain);

//     window.ethereum.on('accountsChanged', async () => {
//       await provider.send("eth_requestAccounts", []);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);
//     })

//     window.ethereum.on('chainChanged', async () => {
//       await provider.send("eth_requestAccounts", []);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);
//     })
//   };

//   useEffect(()=>{
//     loadBlockchain();
//   },[]);

//   return (
//     <div>

//       <Navigation account={Account} setAccount={setAccount}></Navigation>
//       <div className='cards__section'>
//       <Search/>
//         <h2 className='cards__title'>Why do you need a Evolv Domain Name?</h2>
//         <p className='cards__description'>Own your custom username and be able to get into a brand new experience for your ecosystem</p>
//       </div>
//       <hr/>
//       <div className='card'>
//         {Domain.map((domain,index)=>(
//              <Domain domain={Domain} ethDaddy={Contract} provider={Provider} id={index + 1} key={index}></Domain>
//         ))}
//       </div> 

//     </div>
//   );
// }

// export default App;


