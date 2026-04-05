function Recommendation({ stops }) {

    const high = stops.find(stop => stop.crowd > 30);

    return (
        <div>
            <h2>AI Recommendation</h2>
            {high ? (
                <p>Send additional bus to {high.name}</p>
            ) : (
                <p>No extra buses required</p>
            )}
        </div>
    );
}

export default Recommendation;