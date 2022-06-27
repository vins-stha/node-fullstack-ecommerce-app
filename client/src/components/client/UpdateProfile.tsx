import React, {useCallback, useEffect, useState} from 'react';
import {User} from "../types";
import {HandleAdminRequests} from "../services/HandleAdminRequests";

import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  Controller } from "react-hook-form";
import { TextField, Button} from "@material-ui/core";
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar'
import {useNavigate} from "react-router-dom";

interface ProfileFields {
    personalDetail: {
        fname: string,
        lname: string,
        address?: string,
        phone?: number,
        profilePicURL?: string
    }
}
const schema = yup.object({
    personalDetail : yup.object({
        fname: yup.string().min(3).required("Please enter your first name"),
        lname: yup.string().min(7).required(),
        address: yup.string().min(3),
        phone: yup.number().min(10).positive()
    }),

}).required();

export const UpdateProfile = () => {
    const [userDetails, setUserDetails] = useState<User>();
    const userId = localStorage.getItem("_id");
    const [edit] = useState(false);
    const navigate = useNavigate();

    const {control, reset, handleSubmit, formState: {errors}} = useForm<ProfileFields>({
        mode:"onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            personalDetail: {
                fname: userDetails?.personalDetail?.fname ??  '',
                lname: userDetails?.personalDetail?.lname ??  '',
                address: userDetails?.personalDetail?.address ??  '',
                phone: userDetails?.personalDetail?.phone ??  0,
                profilePicURL: userDetails?.personalDetail?.profilePicURL ??  '',
            }
        }
    });
    const fetchProfile = useCallback(async () => {
        try {
            const response = await HandleAdminRequests({
                method: "GET",
                type: "users",
                pk: userId,
            });
            console.log('response,', response)
            setUserDetails(response[0]);
            reset(response[0]);

        } catch (e) {
            console.log('something went wrong!')
        }

    },[userId, reset])
    ;

    useEffect(() => {
        fetchProfile();

    }, [fetchProfile]);

    const handleFormSubmit: SubmitHandler<any> = async (data:ProfileFields) => {

        let result = await HandleAdminRequests({
            type: "users",
            body: data,
            pk: userId,
            method: "PUT",
            access_token: localStorage.getItem('jwt_access_token')
        });

        if (result?.code === 200 || result?.status === 200) {
            alert('Data updated');
            navigate(-1);
        } else
            alert(result.message);
    };
    return (

        <>
            <div className="content-wrapper column text-left p-1">
                <h1 className={"heading"}>Update Details</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Paper
                            elevation={10}
                            sx={{
                                width:"95%",
                                height:"100%",
                                padding: "1rem",
                                margin:"0 auto",
                                marginBottom:"5rem"
                            }}
                    >
                        <Avatar
                            alt="Profile-pic"
                            src={`${userDetails?.personalDetail?.profilePicURL }`}
                            style={{
                                width: "30%",
                                margin: "1rem auto",
                                height:"30%",
                            }}
                        />
                        <Button style={{
                            "display": "block",
                            "width":"100%",
                            "margin":"0 auto",

                        }}>
                            <input type="file" className={"block"} style={{
                                "display": "block", "width":"100%",
                                "margin":"0 auto ",
                                "padding": "0 7rem",
                            }}/>
                        </Button>
                        <Controller
                            name={"personalDetail.profilePicURL"}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    id={"profilepicurl"}
                                    label={"URL for profile pic"}
                                    {...field}
                                    style={{
                                        width:"85%",
                                        padding:"0.2rem auto",
                                        margin:"0.5rem 0 0.5rem 0",
                                    }}
                                    disabled={edit}
                                    error={Boolean(errors?.personalDetail?.profilePicURL)}
                                    helperText={errors?.personalDetail?.profilePicURL?.message}
                                />
                            )}
                        />
                        <Controller
                            name={"personalDetail.fname"}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    id={"fname"}
                                    label={"First name"}
                                    {...field}
                                    style={{
                                        width:"45%",
                                        paddingTop:"0.2rem",

                                    }}
                                    disabled={edit}
                                    error={Boolean(errors?.personalDetail?.fname)}
                                    helperText={errors?.personalDetail?.fname?.message}
                                />
                            )}
                        />
                        <Controller
                            name={"personalDetail.lname"}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    id={"lname"}
                                    label={"Last name"}
                                    style={{
                                        width:"40%",
                                        paddingTop:"0.2rem",
                                        marginLeft:"0.5rem"
                                    }}
                                    {...field}
                                    disabled={edit}
                                    error={Boolean(errors?.personalDetail?.lname)}
                                    helperText={errors?.personalDetail?.lname?.message}
                                />
                            )}
                        />
                        <Controller
                            name={"personalDetail.address"}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    id={"address"}
                                    label={"Address"}
                                    style={{
                                        width:"85%",
                                        paddingTop:"0.2rem",
                                        margin:"0.5rem 0 0 0",
                                    }}
                                    {...field}
                                    disabled={edit}
                                    error={Boolean(errors?.personalDetail?.address)}
                                    helperText={errors?.personalDetail?.address?.message}
                                />
                            )}
                        />
                        <Controller
                            name={"personalDetail.phone"}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    id={"phone"}
                                    label={"Phone number"}
                                    style={{
                                        width:"85%",
                                        padding:"0.2rem 0 0 0",
                                        margin:"0.5rem 0 0 0",
                                    }}
                                    {...field}
                                    disabled={edit}
                                    error={Boolean(errors?.personalDetail?.phone)}
                                    helperText={errors?.personalDetail?.phone?.message}
                                />
                            )}
                        />

                    </Paper>

                    <Button variant="contained"
                            onClick={handleSubmit(handleFormSubmit)}
                            style={{
                                color:"blue",
                                backgroundColor:"green"
                            }}>
                        Update
                    </Button>
                </form>

           </div>

        </>
    )

};