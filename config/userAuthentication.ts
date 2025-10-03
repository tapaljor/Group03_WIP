import { onAuthStateChanged, onIdTokenChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { FirebaseAuth } from "./firebaseConfig";

export function userAuthentication() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onIdTokenChanged(FirebaseAuth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsub; // cleanup
    }, []); // ← empty deps is correct

    const refresh = useCallback(async () => {
        if (FirebaseAuth.currentUser) {
            await FirebaseAuth.currentUser.reload();
            await FirebaseAuth.currentUser.getIdToken(true);
            // force React to see the updated object
            setUser(FirebaseAuth.currentUser);
        }
    }, []);

    return { user, loading, refresh };
}