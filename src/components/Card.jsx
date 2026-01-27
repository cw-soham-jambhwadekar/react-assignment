import '../styles/Card.css'
import Carousel from './Carousel';

function Card({data}) {
    return (
        <div data-testid="card" className='card-body'>

            <Carousel images={data.stockImages?.length > 0 ? data.stockImages : ["https://imgd.aeplcdn.com/0x0/cw/static/icons/svg/no-image.svg"]} />

            <div className='card-info'>
                <h1>{data.carName}</h1>
                <h2>{data.km} kms | {data.fuel} | {data.cityName} | {data.makeYear}</h2>

                <h1 id='price'>Rs. {data.price}</h1>
                <h2>{data.emiText}</h2>

                <button className='card-button'>Get Seller Details</button>
            </div>
        </div>
    )
}

export default Card;