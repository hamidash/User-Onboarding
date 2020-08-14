import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    fullName: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Must be a valid email")
        .required("Must include email address"),
    password: yup.string().required("Enter password"),
    terms: yup.boolean().oneOf([true],"Please agree to terms of use"),
})

function SignupForm(props) {

    const[formState, setFormState] = useState({
        fullName:"",
        email:"",
        password:"",
        terms: true
    })

    const[buttonDisabled, settButtonDisabled] = useState(true);

    const[errors, setErros] = useState({
        fullName:"",
        email:"",
        password:"",
        terms: ""
    })

    const [post, setPost] = useState([]);

    const newUser = {
        fullName: post.fullName,
        email: post.email,
        id: post.id
    }


    function formSubmit(e){
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", post);

                props.setUsers([...props.users, newUser])

                setFormState({
                    fullName:"",
                    email:"",
                    password:"",
                    terms: ""
                })
            })
            .catch(err => console.log(err.response));
        const newUser = {
            ...props.users,

        }
    }

    function inputChange(e){
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    }

    useEffect(()=>{
        formSchema.isValid(formState).then(valid=>{
            console.log("is it valid?", valid)
            settButtonDisabled(!valid)
        })
    },[formState]);

    function validateChange(e) {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
        .then(valid=>{
            setErros({
                ...errors,
                [e.target.name]: ""
            });
        })
        .catch(err => {
            setErros({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        })
    }


    return(
        <form onSubmit = {formSubmit}>
            <label htmlFor="name">
                <p>Full Name</p>
                <input id="name" type="text" name="fullName" value={formState.name} onChange={inputChange}/><br/>
                {errors.fullName.length>0 ? (<p className="error">{errors.fullName}</p>):null}
            </label>
            <label htmlFor="email">
                <p>Email</p>
                <input id="email" type="email" name="email" value={formState.email} onChange={inputChange}/> <br/>
                {errors.email.length>0 ? (<p className="error">{errors.email}</p>):null}
            </label>
            <label htmlFor="password">
                <p>Password</p>
                <input id="password" type="password" name="password" value={formState.password} onChange={inputChange}/> <br/>
                {errors.password.length>0 ? (<p className="error">{errors.password}</p>):null}
            </label> 
            <label>
                <input type="checkbox" id="terms" name="terms" value={formState.terms} onChange={inputChange}/>
                <p>Terms and Conditions</p>
                {errors.terms.length>0 ? (<p className="error">{errors.terms}</p>):null}
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )

}

export default SignupForm;