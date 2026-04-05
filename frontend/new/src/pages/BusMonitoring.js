import BusCard from "../components/BusCard";
import { buses } from "../data/mockData";

function BusMonitoring(){

    return(
        <div style={{padding:20}}>

            <h1>Bus Monitoring</h1>
            <p>Live status of all buses in the network</p>

            <div className="cards-container">
                {buses.map(bus => (
                    <BusCard key={bus.id} bus={bus}/>
                ))}
            </div>
        </div>
    )
}

export default BusMonitoring;