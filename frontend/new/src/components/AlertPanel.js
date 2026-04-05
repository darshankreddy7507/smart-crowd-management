function AlertPanel({ stops }) {

    const alerts = stops.filter(stop => stop.crowd > 30);

    return(
        <div>
            <h2>Alerts</h2>
            {alerts.map((a,index)=>(<p key={index}>{a.name} overcrowded</p>))}
        </div>
    );
}

export default AlertPanel;