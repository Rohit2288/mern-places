import React , {useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook'

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const {loading , error , sendRequest , clearError} = useHttpClient();

    const userId = useParams().userId;

    useEffect( ()=>{
        const fetchPlaces = async()=>{
            try {
                const responseData = await sendRequest(`http://localhost:5001/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (err) {            
            }          
        }
        fetchPlaces();
    }, [sendRequest , userId]);

    const placeDeletedHandler = (deletedPlaceId) =>{
        setLoadedPlaces(prevPlaces => 
            prevPlaces.filter(place => place.id !== deletedPlaceId)
        ); 
    }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {loading && (
        <div className='center'>
            <LoadingSpinner />
        </div>
      )}
      {!loading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
    </React.Fragment>
  );
}

export default UserPlaces