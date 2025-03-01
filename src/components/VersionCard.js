import './VersionCard.css'

function VersionCard(){
    return(
        <div className='version-card-div'>
            <span id='version'>Wersja 17.01</span>
            <button id='generate-xsl' className='black-button'>Wygeneruj plik Excel</button>
        </div>
    );
}

export default VersionCard;