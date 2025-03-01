import VersionCard from './VersionCard.js'
import './VersionList.css'
function VersionList(){
    return(
        <div className='version-list'>
            <VersionCard />
            <VersionCard />
        </div>
    );
}

export default VersionList;