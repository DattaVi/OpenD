import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT(name: Text,owner: Principal,content:[Nat8]) =this {

let itemname=name;
var nfto=owner;
let imgb=content;

public query func itn():async Text{
    return itemname;
};

public query func nf():async Principal{
    return nfto;
};

public query func im():async [Nat8]{
    return imgb;
};

public query func getCanisterId():async Principal{
    return Principal.fromActor(this);
};

public shared(msg) func transferOwnership(newOwner:Principal):async Text{
    if(msg.caller==nfto){
        nfto:=newOwner;
        return "Success";
    }
    else{
        return "error: not initiated by NFT Owner."
    }
};


};