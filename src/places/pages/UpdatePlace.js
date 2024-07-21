// import React , {useEffect , useState , useContext} from 'react'
// import { useParams , useHistory } from 'react-router-dom'

// import Input from '../../shared/components/FormElements/Input'
// import Button from '../../shared/components/FormElements/Button'
// import Card from '../../shared/components/UIElements/card'
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
// import ErrorModal from '../../shared/components/UIElements/ErrorModal'
// import { VALIDATOR_REQUIRE , VALIDATOR_MINLENGTH } from '../../shared/util/validator'

// import { useForm } from '../../shared/hooks/form-hook'
// import { useHttpClient } from '../../shared/hooks/http-hook'
// import { AuthContext } from '../../shared/context/auth-context';
// import './PlaceForm.css';


// const UpdatePlace = () => {
//   const auth = useContext(AuthContext);
//   const {sendRequest , loading , error , clearError} = useHttpClient();
//   const [loadedPlace, setLoadedPlace] = useState();
//   const placeId = useParams().placeId;
//   const history = useHistory();



//   const [formState , inputHandler , setFormData] = useForm({
//     title:{
//         value: '',
//         isValid: false
//     },
//     description:{
//         value: '',
//         isValid: false
//     }
//   } , false);

//  useEffect(()=>{
//     const fetchPlace = async() =>{
//         try {
//             const responseData = await sendRequest
//             (`http://localhost:5001/api/places/${placeId}`); 
//             console.log('Fetched place:', responseData); 
//             setLoadedPlace(responseData.place);
//             setFormData({
//                 title:{
//                     value: responseData.place.title,
//                     isValid: true
//                 },
//                 description:{
//                     value: responseData.place.description,
//                     isValid: true
//                 }
//               } , true);
//         } catch (err) {
//             console.error('Error fetching place:', err);
//         }       
//     };
//     fetchPlace();
//  } , [sendRequest , placeId , setFormData]);


//   const placeUpdateSubmitHandler = async event =>{
//     event.preventDefault();
//     console.log('Submitting form with values:', formState.inputs);
//     try {
//         await sendRequest(`http://localhost:5001/api/places/${placeId}` , 
//             'PATCH' ,
//             JSON.stringify({
//                 title: formState.inputs.title.value,
//                 description: formState.inputs.description.value,
//             }) , {
//                 'Content-Type': 'application/json',
//             }
//          ); 
//          history.push('/' + auth.userId + '/places');
//     } catch (error) {
//         console.error('Error updating place:', error);
//     }
    
//   }

//   if(loading){
//     return(
//         <div className='center'>
//             <LoadingSpinner />
//         </div>
//     )
//   }

//   if(!loadedPlace  && !error){
//     return(
//         <div className='center'>
//             <Card>
//             <h2>Could not find place!</h2>
//             </Card>           
//         </div>
//     )
//   }

  

//   return (
//     // formState.inputs.title.value && 
//     <React.Fragment>
//     <ErrorModal error={error} onClear={clearError}/>
//     {!loading && loadedPlace && (<form className='place-form' onSubmit={placeUpdateSubmitHandler}>
//         <Input 
//         id='title'
//         element='input'
//         type='text'
//         label='Title'
//         validators={[VALIDATOR_REQUIRE()]}
//         errorText ='Please enter a valid Title.'
//         onInput={inputHandler}
//         initialValue={loadedPlace.title}
//         initialValid={true}
//         />
//         <Input 
//         id='description'
//         element='textarea'
//         label='Description'
//         validators={[VALIDATOR_MINLENGTH(6)]}
//         errorText ='Please enter a valid Description(atleast 6 characters).'
//         onInput={inputHandler}
//         intialValue={loadedPlace.description}
//         intialValid={true}
//         />

//         <Button type='submit' disabled={!formState.isValid} >
//             UPDATE PLACE
//         </Button>
//     </form>)}
//     </React.Fragment>
//   )
// }

// export default UpdatePlace
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validator';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, loading, error, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5001/api/places/${placeId}`);
        console.log('Fetched place:', responseData);
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.error('Error fetching place:', err);
      }
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('Submitting form with values:', formState.inputs);
    try {
      await sendRequest(
        `http://localhost:5001/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/places');
    } catch (error) {
      console.error('Error updating place:', error);
    }
  };

  if (loading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!loading && loadedPlace && (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid Title.'
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid Description (at least 5 characters).'
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
