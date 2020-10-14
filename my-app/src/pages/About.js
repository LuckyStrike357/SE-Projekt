import React, { useState, useEffect } from 'react';

const AboutPage = ({match}) => {
    const id = match.params.id;
    //const [petInfo,setPetInfo] = useState({pets:[]});
    let listItems = [];
    useEffect(()=>{
        const fetchData = async () => {
            const result = await fetch (`/testdb`);
            const body = await result.json();
            console.log(result);
            console.log(body);
            //setPetInfo(body);
            listItems = body.map((info)=> <li>Name {info.name}</li>);
        }
        fetchData();
    },[id]); 
    //console.log(petInfo);
    //const listItems = petInfo.map((info)=> <li>Name {info.Name}</li>);
    //<ul>{listItems}</ul>
    return(
        <>
        <h1>Pets test url param {id}</h1>
        <ul>{listItems}</ul>
        </>
    );
       
};
    
/*useEffect(()=>{
    const fetchData = async () => {
        const result = await fetch ('http://localhost:8000/testdb');
        console.log(result);
    }
    fetchData();
},[name]);*/




/*
const ArticlePage = ({match})=> {
    fetch('/api/articles/...',{
        method: 'POST',
        body:
    })
}*/

export default AboutPage;