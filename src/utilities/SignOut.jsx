import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function SignOut() {
  signOut(auth)
    .then(() => {
      console.log("sign out successful");
    })
    .catch((error) => console.log(error));
}
  
export default SignOut;