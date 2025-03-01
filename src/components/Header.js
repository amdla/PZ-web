import './Header.css'

function Header(){
    return (
        <div className='flex-row'>
            <p>Zalogowano jako xyz@pw.edu.pl</p>
            <button className= 'black-button' id='logout'>Wyloguj</button>
        </div>
    );
}

export default Header;