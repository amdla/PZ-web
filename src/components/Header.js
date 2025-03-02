import './Header.css'

function Header(){
    return (

        <header className="page-header">
            <div className='flex-row'>
                <p>Zalogowano jako xyz@pw.edu.pl</p>
                <button className= 'black-button' id='logout'>Wyloguj</button>
            </div>
        </header>
        
    );
}

export default Header;