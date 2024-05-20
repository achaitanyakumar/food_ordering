import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setFoodItems(data.foodItems || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData()
      }, [])

    // Filter food items based on search query
    const filteredFoodItems = foodItems.filter(item => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Optionally, you can perform a search request to the server here
    }

    return (
        <div>
            <Header />
            <div className="container-fluid"  >
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..."style={{ maxHeight: "600px" }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/300x300/?shakes" className="d-block w-100" alt="..." style={{ maxHeight: "600px" }}/>
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/300x300/?pizza" className="d-block w-100" alt="..."style={{ maxHeight: "600px" }} />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                        <div className="container">
                <div className="row">
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-outline-success text-white bg-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
                <div className='row row-cols-1 row-cols-md-3 g-4 justify-content-center'>
                    {filteredFoodItems.map((item, index) => (
                        <div key={index} className='col'>
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
};

export default Home;







