import './Store.css';
import Product from '../Product/Product';
import React, {useState, useEffect} from 'react'
import NewHeader from '../NewHeader/NewHeader';
import {db} from '../../firebase';
import Hero from '../Hero/Hero';
import Banner from '../Banner/Banner';
import {Link} from 'react-router-dom';


function Store() {
    
    const [Hats, setHats]= useState([]);
    const [Jackets, setJackets]= useState([]);
    const [Sneakers, setSneakers]= useState([]);
    const [Men, setMen]= useState([]);
    const [Woman, setWoman]= useState([]);

    useEffect(() => {
        
        // async function getProducts(){
        //     const res= await fetch("https://fakestoreapi.com/products/category/men's clothing");
        //     const resData= await res.json();
        //     setMen(resData);

        //     const resAgain= await fetch("https://fakestoreapi.com/products/category/women's clothing");
        //     const resDataAgain= await resAgain.json();
        //     setWoman(resDataAgain);
        // }

        // getProducts();

        db.collection("Jackets")
        .onSnapshot(snapshot =>(
           setJackets(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data()
           })))
        ))

        db.collection("Hats")
        .onSnapshot(snapshot =>(
           setHats(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data()
           })))
        ))

        db.collection("Sneakers")
        .onSnapshot(snapshot =>(
           setSneakers(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data()
           })))
        ))

        db.collection("Men")
        .onSnapshot(snapshot =>(
           setMen(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data()
           })))
        ))

        db.collection("Woman")
        .onSnapshot(snapshot =>(
           setWoman(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data()
           })))
        ))
        
    }, [])

    if(Men.length> 0 && Woman.length> 0){return (
        <>
        
        <div className="store">
            
            <div className="store__title "><h3>HATS</h3></div>
            <div className="store__row">
                {
                    Hats?.map(hat => (
                        <Product title={hat.data.title} 
                        price={hat.data.price}
                        image={`${hat.data.imageURL}`}
                        rating={hat.data.rating}
                        id= {hat.data.id-1}
                        />
                    ))
                }

                {
                    Hats.length===0 && 
                    
                    
                    
                        <div >
                        <Hero >
                            <Banner title="Loading"
                                subtitle="Please wait for a while!"
                            >
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                            </Banner>
                        </Hero>
                        </div>
                
                }
            </div>

            <div className="store__title "><h3>SNEAKERS</h3></div>
            <div className="store__row">
                {
                    Sneakers?.map(hat => (
                        <Product title={hat.data.title} 
                        price={hat.data.price}
                        image={`${hat.data.imageURL}`}
                        rating={hat.data.rating}
                        id= {hat.data.id-1}
                        />
                    ))
                }

                {
                    Hats.length===0 && 
                    
                    
                    
                        
                        <Hero >
                            <Banner title="Loading"
                                subtitle="Please wait for a while!"
                            >
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                            </Banner>
                        </Hero>
                       
                
                }
            </div>
            
            <div className="store__title "><h3>JACKETS</h3></div>
            <div className="store__row">
                {
                    Jackets?.map(hat => (
                        <Product title={hat.data.title} 
                        price={hat.data.price}
                        image={`${hat.data.imageURL}`}
                        rating={hat.data.rating}
                        id= {hat.data.id-1}
                        />
                    ))
                }

                {
                    Hats.length===0 && 
                    
                    
                    
                        <div >
                        <Hero >
                            <Banner title="Loading"
                                subtitle="Please wait for a while!"
                            >
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                            </Banner>
                        </Hero>
                        </div>
                
                }
            </div>

            <div className="store__title "><h3>WOMAN</h3></div>
            <div className="store__row">
                {
                        Woman?.map(hat => (
                        <Product title={hat.data.title} 
                        price={hat.data.price}
                        image={`${hat.data.imageURL}`}
                        rating={hat.data.rating}
                        id= {hat.data.id-1}
                        />
                    ))
                }

                {
                    Hats.length===0 && 
                    
                    
                    
                        <div >
                        <Hero >
                            <Banner title="Loading"
                                subtitle="Please wait for a while!"
                            >
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                            </Banner>
                        </Hero>
                        </div>
                
                }
            </div>

            <div className="store__title "><h3>MEN</h3></div>
            <div className="store__row">
                {
                    Men?.map(hat => (
                        <Product title={hat.data.title} 
                        price={hat.data.price}
                        image={`${hat.data.imageURL}`}
                        rating={hat.data.rating}
                        id= {hat.data.id-1}
                        />
                    ))
                }


                    {
                    Hats.length===0 && 
                    
                    
                    
                        <div >
                        <Hero >
                            <Banner title="Loading"
                                subtitle="Please wait for a while!"
                            >
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                            </Banner>
                        </Hero>
                        </div>
                
                }
            </div>

        </div>

        </>
    )
            }else{
                return( 
                    <Hero >
                            <Banner title="Loading"
                                subtitle="Please wait for a while!"
                            >
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                            </Banner>
                        </Hero>
                )
            }
}

export default Store
