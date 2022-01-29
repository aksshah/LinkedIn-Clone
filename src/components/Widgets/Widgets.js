import React from 'react'
import './Widgets.css';
import Infoicon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

    const newsArticle = (heading,subtitle) => {
        return(
            <div className="widgets__article">
                <div className="widgets__articleLeft">
                    <FiberManualRecordIcon/>
                </div>
                <div className="widgets__articleRight">
                    <h4>{heading}</h4>
                    <p>{subtitle}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <Infoicon/>
            </div>
            {newsArticle("Corona virus updates","Top news - 8086 readers")}
            {newsArticle("Tesla hits new highs","Cars & Auto - 342 readers")}
            {newsArticle("Bitcoin breaks $60k","Crypto - 996 readers")}
        </div>
    )
}

export default Widgets
