import  {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {getUserDetails} from "../redux/actions";
import {useForm} from "react-hook-form";
import {State} from "../types";

export const Profile =()=>{
    const dispatch = useDispatch();

    type FormData = {
        isAdmin:boolean,
        email:string
    }
    let loggedInUser = useSelector((state:State)=>state.user);
    console.log('initial', loggedInUser)
    const user = {
        isAdmin:false,
        email:"abc"
    }

    const {  handleSubmit } = useForm<FormData>(
        {
            defaultValues:{
                email:user?.email ? user.email : 'no-email',
            }
        }
    );

    const onSubmit = (data:any) =>{
        console.log('submitted',data)
    };
    useEffect(()=>{
        dispatch(getUserDetails(user.email));
    },[dispatch, user.email]);

    loggedInUser = useSelector((state:State)=>state.user);
    console.log('upated', loggedInUser);

    return(
        <>
        <h1>profile page</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
            </form>
        </>
    )
}