import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Register(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
   
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () =>{
       if(!firstName.trim() || !lastName.trim()
        || !phone.trim() || !email.trim()
        || !password.trim()) return alert("All fields required");
        setLoading(true);
        try {
            const res = await API.post("/auth/signup", {
                firstName, lastName, email, phone,
                password
            });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
            
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
            
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="flex min-h-screen items-centre justify-centre bg-gray-100 dark:bg-zinc-900 px-4">
            <Card className="w-full max-w-md shadow-xl animate-fade">
                <CardHeader>
                    <CardTitle className="text-cantre text-2xl font-bold">Log In</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <Input 
                     type = "text"
                     placeholder = "First name"
                     value={firstName}
                     onChange={e => setFirstName(e.target.value)}
                    
                    />
                                        <Input 
                     type = "text"
                     placeholder = "Last name"
                     value={lastName}
                     onChange={e => setLastName(e.target.value)}
                    
                    />
                     <Input 
                     type = "number"
                     placeholder = "Age"
                     value={age}
                     onChange={e => setAge(e.target.value)}
                    
                    />
                    <Input 
                     type = "email"
                     placeholder = "Email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                    
                    />
                    <Input
                     type= "password"
                     placeholder = "Password"
                     value = {password}
                     onChange={e => setPassword(e.target.value)}
                     />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick = {handleRegister} disabled={loading} className="w-full">
                       {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                </CardFooter>
                <p className="text-sm text-centre text-zinc-600 dark:text-zinc-300 mt-4">
                    You have an account? {" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                    Login </Link>
                </p>
            </Card> 

        </div>
    );
    
}