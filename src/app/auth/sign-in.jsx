
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
// import { useRouter } from "next/navigation";

const SignIn = ({ setUserStatus, setMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  // const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setMessage({text: "Signing In...", type: "create"});
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(email, password);
    
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      setMessage({text: "Welcome Back!", type: "create"});
      // router.push("/");
      setLoading(false)
    } catch (e) {
      console.error(e);
      setMessage({text: "Check Details", type: "error"});
      setLoading(false)
    }
  };

  return (
    <div className="bg-sky-950 px-4 md:px-10 pt-6 pb-16 rounded-lg shadow-xl w-80 md:w-96">
      <h1 className="text-white text-2xl mb-5">Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <button
        onClick={handleSignIn}
        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
      >
      { loading ? "Signing In..." : "Sign In"}  
      </button>
      <p className="text-sm pt-4">
        Dont have an account? Create account
        <a
          onClick={() => setUserStatus(true)}
          className="text-indigo-500 hover:text-indigo-400 cursor-pointer"
        >
          {" "}
          here
        </a>
      </p>
    </div>
  );
};

export default SignIn;
