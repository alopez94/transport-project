import { useState } from "react";
import "./Signup.module.css";
//hooks
import { useSignup } from "../../hooks/useSignup";
import {NavLink} from "react-router-dom"


export default function Login() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, isPending, error} = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, lastName, phone, company, email, password);
  };

  return (
    <div>
      
    </div>
  );
}
