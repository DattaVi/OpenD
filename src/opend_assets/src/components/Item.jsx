import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { Actor,HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/dtoken_backend";
import {Principal} from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";

function Item(props) {
  
  const [n,sn]=React.useState("");
  const [o,so]=React.useState("");
  const [i,si]=React.useState("");
  const[button,setButton]=React.useState();
  const [priceInput,setPriceInput]=React.useState();
  const[loaderHidden,setLoaderHidden]=React.useState(true);
  const [blur,setBlur]=React.useState();
  const[sellStatus,setSellStatus]=React.useState("");
  const [priceLabel,setPriceLabel]=React.useState();
  const [shouldDisplay,setShouldDisplay]=React.useState(true);


  const rid=props.id;

  const localhost="http://localhost:8085/";
  const agent=new HttpAgent({host:localhost});
  agent.fetchRootKey();
  let NFTActor;

async function loadNFT(){
    NFTActor=await Actor.createActor(idlFactory,{
    agent,
    canisterId:rid,
   })
   const name= await NFTActor.itn();
   sn(name);
   const owner=await NFTActor.nf();
   
   so(owner.toText());

   const info=await NFTActor.im();
   const imc=new Uint8Array(info);
   const image= URL.createObjectURL(
    new Blob([imc.buffer],{ type: "image/png" })
   );
   si(image);
   console.log(props.role);
   if(props.rlle == "collection"){
   const nftIsListed =await opend.isListed(props.id);
   if(nftIsListed){
    so("OpenD");
    setBlur({filter:"blur(4px"});
    setSellStatus("Listed");
   }else{
    setButton(<Button handleClick={handleSell} text={"Sell"}/>);
   }
  }else if(props.rlle == "discover"){
    const originalOwner = await opend.getOriginalOwner(props.id);
    if(originalOwner.toText()!=CURRENT_USER_ID.toText()){
      setButton(<Button handleClick={handleBuy} text={"Buy"}/>)
    }

    const price=await opend.getListedNFTPrice(props.id);
    setPriceLabel(<PriceLabel sellPrice={price.toString()}/>);
    
  }
   
}

useEffect(()=>{
 loadNFT();
},[]);

let price;
function handleSell(){
  console.log("Sell Clicked");
  setPriceInput(<input
    placeholder="Price in DANG"
    type="number"
    className="price-input"
    value={price}
    onChange={(e)=>(price=e.target.value)}
  />);
  setButton(<Button handleClick={sellItem} text={"Confirm"}/>);
  
}

async function sellItem(){
  setBlur({filter:"blur(4px)"});
  setLoaderHidden(false);
  console.log("set price=" + price);
  const listingResult=await opend.listItem(props.id,Number(price));
  console.log("listing"+listingResult);
  if(listingResult=="Success"){
  const openDId= await opend.getOpenDCanisterID();
  const transferResult=await NFTActor.transferOwnership(openDId);
  console.log("transfer:"+ transferResult);
  if(transferResult=="Success"){
    setLoaderHidden(true);
    setButton();
    setPriceInput();
    so("openD");
    setSellStatus("Listed");
  }
  }
}
async function handleBuy(){
  console.log("buy triggered"); 
  setLoaderHidden(false);
  const tokenActor= await Actor.createActor(tokenIdlFactory,{
    agent,
    canisterId: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
  });

  const sellerId = await opend.getOriginalOwner(props.id);
  const itemPrice = await opend.getListedNFTPrice(props.id);

  const result= await tokenActor.transfer(sellerId,itemPrice);
  console.log(result);
  if(result=="Success"){
   const transferResult= await opend.completePurchase(props.id,sellerId,CURRENT_USER_ID);
   console.log("purchase "+transferResult);
   setLoaderHidden(true);
   setShouldDisplay(false);
  }
}


  return (
    <div style={{display: shouldDisplay ? "inline":"none"}} className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={i}
          style={blur}
        />
        <div className="lds-ellipsis" hidden={loaderHidden}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
        <div className="disCardContent-root">
          {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {n}<span className="purple-text">{sellStatus}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            {o}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
