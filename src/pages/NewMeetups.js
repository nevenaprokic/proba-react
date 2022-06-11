import NewMeetupForm from "../components/meetup/NewMeetupForm";
//import {useHistory} from 'react-router-dom';

function NewMeetupsPage(){
    //const history = useHistory();
    function addMeetupHandler(meetupData){
        // fetch('url', {
        //     method: 'POST',
        //     body: JSON.stringify(meetupData),
        //     headers:{
        //         'Content-Type': 'application/json'
        //     }
        // }).then(() => {
            //history.push(); or replace('/'); });//ovo nece raditi ovo je veza za back-om

    }


    return (<section>
        <h1>Add new meetup</h1>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>);
}
export default NewMeetupsPage;