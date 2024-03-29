import { Link } from "react-router-dom";

const SideBar_AccountSettings = () => {
    const style = {
        position: 'sticky',
        width: '300px',
        border: '1px solid blue',
        margin: '10px',
        padding: '10px',
        float: 'left'
    }
    return (
        <div style={style}>
            <Link to="/history">History</Link><br></br><br></br>
            <Link to="/match">Match</Link><br></br><br></br>
        </div>
    )
}

export default SideBar_AccountSettings;