import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth); // ✅ Export this
export { auth };
