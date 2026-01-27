import '../styles/SkeletonCard.css'

function SkeletonCard() {
    return (
        <div data-testid="skeleton" className='skeleton-card-body'>
            <div className='img-wrapper'></div>

            <div className='skeleton-info'>
                <div id='car-name'></div>
                <div id='car-details'></div>
                <div id='car-price'></div>
                <div id='car-emi'></div>
                <button className='skeleton-card-button'></button>
            </div>
        </div>
    )
}

export default SkeletonCard;