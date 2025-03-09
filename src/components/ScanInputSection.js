import './ScanInputSection.css';

function ScanInputSection(){
    return(
        <div id='scan-input-section'>
            <input type='text' placeholder='Wprowadź kod przedmiotu' className='input-scan'/>
            <input type='text' placeholder='Wprowadź numer sali' className='input-scan'/>
            <button className='black-button'>Zaznacz jako zeskanowany</button>
        </div>
    );
}

export default ScanInputSection;